// DispatchForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { shipments } from "../data/mockdata";

const shipmentTypeOptions = ["Select Type", "vendor-to-godown", "godown-to-site"];
const deliveryMethods = ["Select Method", "Road", "Rail", "Air", "Courier", "Self Pickup"];
const transportationModes = ["Select Mode", "LCV", "Truck", "Container", "Parcel", "Train"];
const qualityStatuses = ["pending", "pass", "fail"];

// Helper to calculate totals including both items and accessories
const calculateTotals = (items, accessories = []) => {
  const itemTotal = items.reduce(
    (acc, item) =>
      acc + ((parseFloat(item.orderedQuantity) || 0) * (parseFloat(item.rate) || 0)),
    0
  );
  const accTotal = accessories.reduce(
    (acc, accItem) =>
      acc + ((parseFloat(accItem.orderedQuantity) || 0) * (parseFloat(accItem.rate) || 0)),
    0
  );
  const basicAmount = itemTotal + accTotal;
  const gst = basicAmount * 0.18;
  const grandTotal = basicAmount + gst;
  return { basicAmount, gst, grandTotal, itemTotal, accTotal };
};

// Generate new Shipment ID
const generateNewShipmentId = () => {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 900 + 100);
  return `SHIP-${year}-${random}`;
};

export default function DispatchForm() {
  const { shipmentId } = useParams();
  const location = useLocation();
  const mode = location.state?.mode; // 'view' | 'edit' | undefined
const isViewMode = mode === 'view' || location.pathname.includes('/view/');


  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const [formData, setFormData] = useState({
    shipmentId: generateNewShipmentId(),
    shipmentType: shipmentTypeOptions[0],
    workOrderId: "",
    vendorPoId: "",
    projectName: "",
    clientName: "",

    // Source Details
    sourceType: "",
    sourceName: "",
    sourceAddress: "",
    sourceContactPerson: "",
    sourceContactMobile: "",

    // Destination Details
    destinationType: "",
    destinationName: "",
    destinationAddress: "",
    destContactPerson: "",
    destContactMobile: "",

    // Dates
    orderedDate: new Date().toISOString().split("T")[0],
    dispatchedDate: "",
    expectedDeliveryDate: "",

    // Transportation
    deliveryMethod: deliveryMethods[0],
    transportationMode: transportationModes[0],
    driverName: "",
    driverMobile: "",
    vehicleNumber: "",
    vehicleType: "",
    vehicleCapacity: "",

    // Items
    items: [
      {
        id: `item-${Date.now()}`,
        material: "Select Material",
        description: "",
        unit: "",
        orderedQuantity: "",
        rate: "",
        amount: "",
        qualityStatus: qualityStatuses[0],
      },
    ],

    // Accessories
    accessories: [],

    notes: "",
  });

  const [totals, setTotals] = useState({ basicAmount: 0, gst: 0, grandTotal: 0 });

  // Recalculate totals whenever items or accessories change
  useEffect(() => {
    setTotals(calculateTotals(formData.items, formData.accessories));
  }, [formData.items, formData.accessories]);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setFormData((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "orderedQuantity" || field === "rate") {
            const q = parseFloat(updated.orderedQuantity) || 0;
            const r = parseFloat(updated.rate) || 0;
            updated.amount = (q * r).toString();
          }
          return updated;
        }
        return item;
      });
      return { ...prev, items: updatedItems };
    });
  };

  const handleAccessoryChange = (id, field, value) => {
    setFormData((prev) => {
      const updatedAcc = prev.accessories.map((acc) => {
        if (acc.id === id) {
          const updated = { ...acc, [field]: value };
          if (field === "orderedQuantity" || field === "rate") {
            const q = parseFloat(updated.orderedQuantity) || 0;
            const r = parseFloat(updated.rate) || 0;
            updated.amount = (q * r).toString();
          }
          return updated;
        }
        return acc;
      });
      return { ...prev, accessories: updatedAcc };
    });
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          material: "Select Material",
          description: "",
          unit: "",
          orderedQuantity: "",
          rate: "",
          amount: "",
          qualityStatus: qualityStatuses[0],
        },
      ],
    }));
  };

  const handleRemoveItem = (id) => {
    if (formData.items.length > 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  const handleAddAccessory = () => {
    setFormData((prev) => ({
      ...prev,
      accessories: [
        ...prev.accessories,
        {
          id: `acc-${Date.now()}`,
          name: "",
          description: "",
          category: "Select Category",
          unit: "",
          orderedQuantity: "",
          rate: "",
          amount: "",
          qualityStatus: qualityStatuses[0],
        },
      ],
    }));
  };

  const handleRemoveAccessory = (id) => {
    if (formData.accessories.length > 1) {
      setFormData((prev) => ({
        ...prev,
        accessories: prev.accessories.filter((acc) => acc.id !== id),
      }));
    }
  };

  const validateForm = () => {
    if (!formData.workOrderId || !formData.vendorPoId) {
      setAlertMessage("Please enter Work Order ID and Vendor PO ID");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    if (!formData.sourceName || !formData.destinationName) {
      setAlertMessage("Please enter Source and Destination details");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    if (!formData.dispatchedDate) {
      setAlertMessage("Please enter Dispatched Date");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    if (formData.items.some((item) => !item.description || !item.unit)) {
      setAlertMessage("Please fill all item details");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    if (
      formData.accessories.some(
        (acc) => !acc.name || !acc.description || !acc.unit
      )
    ) {
      setAlertMessage("Please fill all accessory details");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 Block submission in view mode
    if (isViewMode) return;

    if (!validateForm()) {
      return;
    }

    const dispatchData = {
      ...formData,
      totalAmount: totals.basicAmount,
      gstAmount: totals.gst,
      grandTotal: totals.grandTotal,
      shipmentStatus: "dispatched",
      deliveryStatus: "pending",
      createdDate: new Date().toISOString().split("T")[0],
      createdTime: new Date().toISOString(),
    };

    console.log("New Dispatch Data:", dispatchData);

    setAlertMessage("Dispatch entry created successfully!");
    setAlertVariant("success");
    setShowAlert(true);

    setTimeout(() => {
      navigate("/dispatch");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/dispatch");
  };

  useEffect(() => {
    if (shipmentId) {
      const shipment = shipments.find((s) => s.shipmentId === shipmentId);
      if (shipment) {
        setFormData({
          shipmentId: shipment.shipmentId,
          shipmentType: shipment.shipmentType || "Select Type",
          workOrderId: shipment.workOrderId || "",
          vendorPoId: shipment.vendorPoId || "",
          projectName: shipment.projectName || "",
          clientName: shipment.clientName || "",

          // Source
          sourceType: shipment.sourceType || "",
          sourceName: shipment.sourceDetails?.name || "",
          sourceAddress: shipment.sourceDetails?.address || "",
          sourceContactPerson: shipment.sourceDetails?.contactPerson || "",
          sourceContactMobile: shipment.sourceDetails?.contactMobile || "",

          // Destination
          destinationType: shipment.destinationType || "",
          destinationName: shipment.destinationDetails?.name || "",
          destinationAddress: shipment.destinationDetails?.address || "",
          destContactPerson: shipment.destinationDetails?.inChargePersonName ||
            shipment.destinationDetails?.siteContactPerson || "",
          destContactMobile: shipment.destinationDetails?.inChargePersonMobile ||
            shipment.destinationDetails?.siteContactMobile || "",

          // Dates
          orderedDate: shipment.orderedDate || new Date().toISOString().split("T")[0],
          dispatchedDate: shipment.dispatchedDate || "",
          expectedDeliveryDate: shipment.expectedDeliveryDate || "",

          // Transportation
          deliveryMethod: shipment.deliveryMethod || "Select Method",
          transportationMode: shipment.transportationMode || "Select Mode",
          driverName: shipment.driverName || "",
          driverMobile: shipment.driverMobile || "",
          vehicleNumber: shipment.vehicleNumber || "",
          vehicleType: shipment.vehicleType || "",
          vehicleCapacity: shipment.vehicleCapacity || "",

          // Items
          items: (shipment.items || []).map((item) => ({
            id: `item-${Date.now()}-${Math.random()}`,
            material: item.material || "Select Material",
            description: item.description || "",
            unit: item.unit || "",
            orderedQuantity: item.orderedQuantity || "",
            rate: item.rate || "",
            amount: item.amount || "",
            qualityStatus: item.qualityChecklist
              ? Object.values(item.qualityChecklist).every((v) => v === "pass")
                ? "pass"
                : Object.values(item.qualityChecklist).some((v) => v === "fail")
                ? "fail"
                : "pending"
              : "pending",
          })),

          accessories: [], // Mock data doesn't include accessories
          notes: shipment.notes || "",
        });
      } else {
        setAlertMessage("Shipment not found");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    }
  }, [shipmentId]);

  

  return (
    <Container fluid className="my-4">
      <Button
        className="mb-3"
        style={{ backgroundColor: "rgb(237,49,49)", border: "none" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </Button>

      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
          dismissible
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Card 1: Shipment & Reference Details */}
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleMainChange}
                    placeholder="e.g., StartupHub Office Setup"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Ordered Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="orderedDate"
                    value={formData.orderedDate}
                    onChange={handleMainChange}
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleMainChange}
                    placeholder="e.g., Arjun Mehta"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Card 2: Source & Destination */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h4">Dispatch Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Col md="6">
                <h6 className="mb-3" style={{ fontWeight: "bold" }}>
                  From <span style={{ color: "red" }}>*</span>
                </h6>
                <Form.Group className="mb-3">
                  <Form.Label>Source Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="sourceName"
                    value={formData.sourceName}
                    onChange={handleMainChange}
                    placeholder="e.g., Premium Ply Industries"
                    required
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Source Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="sourceAddress"
                    value={formData.sourceAddress}
                    onChange={handleMainChange}
                    placeholder="Full address"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="sourceContactPerson"
                    value={formData.sourceContactPerson}
                    onChange={handleMainChange}
                    placeholder="e.g.Ramesh Kumar"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="sourceContactMobile"
                    value={formData.sourceContactMobile}
                    onChange={handleMainChange}
                    placeholder="+91 9876543210"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>

              <Col md="6">
                <h6 className="mb-3" style={{ fontWeight: "bold" }}>
                  To<span style={{ color: "red" }}>*</span>
                </h6>
                <Form.Group className="mb-3">
                  <Form.Label>Destination Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="destinationName"
                    value={formData.destinationName}
                    onChange={handleMainChange}
                    placeholder="e.g., NLF Solutions Warehouse"
                    required
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Destination Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="destinationAddress"
                    value={formData.destinationAddress}
                    onChange={handleMainChange}
                    placeholder="Full address"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="destContactPerson"
                    value={formData.destContactPerson}
                    onChange={handleMainChange}
                    placeholder="e.g., Suresh"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="destContactMobile"
                    value={formData.destContactMobile}
                    onChange={handleMainChange}
                    placeholder="+91 9876543350"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Card 3: Transportation Details */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h4">Transportation & Timeline</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Dispatch Date <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="dispatchedDate"
                    value={formData.dispatchedDate}
                    onChange={handleMainChange}
                    required
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Expected Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expectedDeliveryDate"
                    value={formData.expectedDeliveryDate}
                    onChange={handleMainChange}
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Method</Form.Label>
                  <Form.Control
                    as="select"
                    name="deliveryMethod"
                    value={formData.deliveryMethod}
                    onChange={handleMainChange}
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  >
                    {deliveryMethods.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Transportation Mode</Form.Label>
                  <Form.Control
                    as="select"
                    name="transportationMode"
                    value={formData.transportationMode}
                    onChange={handleMainChange}
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  >
                    {transportationModes.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Driver Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleMainChange}
                    placeholder="e.g., Rajesh Kumar"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Driver Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="driverMobile"
                    value={formData.driverMobile}
                    onChange={handleMainChange}
                    placeholder="+91 9876543298"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleMainChange}
                    placeholder="e.g., KA-01-AB-1234"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleMainChange}
                    placeholder="e.g., LCV, Truck"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Capacity</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleCapacity"
                    value={formData.vehicleCapacity}
                    onChange={handleMainChange}
                    placeholder="e.g., 2.5 Tons"
                    readOnly={isViewMode}
                    disabled={isViewMode}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Card 4: Items in Shipment */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h4">Items in Shipment</Card.Title>
          </Card.Header>
          <Card.Body>
            {formData.items.map((item, index) => (
              <Row key={item.id} className="align-items-center mb-3 p-3 border rounded">
                <Col md="1">
                  <Form.Label style={{ fontWeight: "bold" }}>#{index + 1}</Form.Label>
                </Col>
                <Col md="2">
                  <Form.Group>
                    <Form.Label className="small">Material</Form.Label>
                    <Form.Control
                      type="text"
                      value={item.material}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) =>
                        handleItemChange(item.id, "material", e.target.value)
                      }
                      placeholder="e.g., Plywood"
                    />
                  </Form.Group>
                </Col>
                <Col md="2">
                  <Form.Group>
                    <Form.Label className="small">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      value={item.description}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      placeholder="Item description"
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Unit</Form.Label>
                    <Form.Control
                      type="text"
                      value={item.unit}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) =>
                        handleItemChange(item.id, "unit", e.target.value)
                      }
                      placeholder="nos/kg/m"
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Qty</Form.Label>
                    <Form.Control
                      type="number"
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      value={item.orderedQuantity}
                      onChange={(e) =>
                        handleItemChange(item.id, "orderedQuantity", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Rate</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.rate}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) =>
                        handleItemChange(item.id, "rate", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Amount</Form.Label>
                    <Form.Control
                      type="text"
                      value={item.amount}
                      readOnly
                      className="bg-light"
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Quality</Form.Label>
                    <Form.Control
                      as="select"
                      value={item.qualityStatus}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) =>
                        handleItemChange(item.id, "qualityStatus", e.target.value)
                      }
                      size="sm"
                    >
                      {qualityStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="1">
                  {!isViewMode && formData.items.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-4"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaMinus />
                    </Button>
                  )}
                </Col>
              </Row>
            ))}

            {!isViewMode && (
              <div className="d-flex justify-content-start mt-3">
                <Button variant="primary" size="sm" onClick={handleAddItem}>
                  <FaPlus /> Add Item
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Card 5: Accessories in Shipment */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h4">Accessories in Shipment</Card.Title>
          </Card.Header>
          <Card.Body>
            {formData.accessories.map((acc, index) => (
              <Row key={acc.id} className="align-items-center mb-3 p-3 border rounded">
                <Col md="1">
                  <Form.Label style={{ fontWeight: "bold" }}>#{index + 1}</Form.Label>
                </Col>
                <Col md="2">
                  <Form.Group>
                    <Form.Label className="small">Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={acc.name}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) => handleAccessoryChange(acc.id, "name", e.target.value)}
                      placeholder="e.g., Chair Casters"
                    />
                  </Form.Group>
                </Col>
                <Col md="2">
                  <Form.Group>
                    <Form.Label className="small">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      value={acc.description}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) => handleAccessoryChange(acc.id, "description", e.target.value)}
                      placeholder="Accessory description"
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={acc.category}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) => handleAccessoryChange(acc.id, "category", e.target.value)}
                      placeholder="e.g., Hardware"
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Unit</Form.Label>
                    <Form.Control
                      type="text"
                      value={acc.unit}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) => handleAccessoryChange(acc.id, "unit", e.target.value)}
                      placeholder="nos/kg/sets"
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Qty</Form.Label>
                    <Form.Control
                      type="number"
                      value={acc.orderedQuantity}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) => handleAccessoryChange(acc.id, "orderedQuantity", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Rate</Form.Label>
                    <Form.Control
                      type="number"
                      value={acc.rate}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) => handleAccessoryChange(acc.id, "rate", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Amount</Form.Label>
                    <Form.Control
                      type="text"
                      value={acc.amount}
                      readOnly
                      className="bg-light"
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label className="small">Quality</Form.Label>
                    <Form.Control
                      as="select"
                      value={acc.qualityStatus}
                      readOnly={isViewMode}
                      disabled={isViewMode}
                      onChange={(e) => handleAccessoryChange(acc.id, "qualityStatus", e.target.value)}
                      size="sm"
                    >
                      {qualityStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="1">
                  {!isViewMode && formData.accessories.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-4"
                      onClick={() => handleRemoveAccessory(acc.id)}
                    >
                      <FaMinus />
                    </Button>
                  )}
                </Col>
              </Row>
            ))}

            {!isViewMode && (
              <div className="d-flex justify-content-start mt-3">
                <Button variant="primary" size="sm" onClick={handleAddAccessory}>
                  <FaPlus /> Add Accessory
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Card 6: Totals */}
        <Card className="mb-4">
          <Card.Body>
            <Row className="d-flex justify-content-end">
              <Col md="4">
                <Card className="bg-light">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <strong>Basic Amount:</strong>
                      <span>₹{totals.basicAmount.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <strong>GST (18%):</strong>
                      <span>₹{totals.gst.toLocaleString()}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h5>Grand Total:</h5>
                      <h5 style={{ color: "rgb(237,49,49)" }}>
                        ₹{totals.grandTotal.toLocaleString()}
                      </h5>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4 gap-3">
              {isViewMode ? (
                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  style={{ border: "none" }}
                >
                  Back
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#ed3131", border: "none" }}
                  >
                    Create Shipment
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                    style={{ border: "none" }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}