import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { poVendor } from "../data/mockdata"; 

const materialOptions = [
  "Select Material",
  "Plywood",
  "Laminates",
  "Adhesives",
  "Hardware",
  "Glass",
];

// Helper to calculate totals
const calculateTotals = (items) => {
  const basicAmount = items.reduce(
    (acc, item) =>
      acc + ((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)),
    0
  );
  const gst = basicAmount * 0.18;
  const grandTotal = basicAmount + gst;
  return { basicAmount, gst, grandTotal };
};

// Generate new PO ID
const generateNewPOId = () => {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 900 + 100); // 3-digit random
  return `PO-N${year}-${random}`;
};

export default function Vendor() {
  const navigate = useNavigate();
  const { poId } = useParams(); // Get poId from URL: /povendor/:poId

  const [formData, setFormData] = useState({
    poId: "",
    date: "",
    vendorName: "",
    vendorAddress: "",
    vendorGST: "",
    deliveryNumber: "",
    dispatchDate: "",
    deliveryMethod: "",
    items: [
      {
        id: `item-${Date.now()}`,
        material: materialOptions[0],
        description: "",
        unit: "",
        quantity: "",
        rate: "",
        amount: "",
      },
    ],
    terms: "",
  });

  const [totals, setTotals] = useState({ basicAmount: 0, gst: 0, grandTotal: 0 });
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize form: either new PO or load existing
useEffect(() => {
  if (poId) {
    // View/Edit existing PO - Search in poVendor array by vendorPoId
    const existingPO = poVendor.find((po) => po.vendorPoId === poId);
    if (existingPO) {
      // Map items to include `id` for React keys
      const itemsWithId = existingPO.items.map((item, idx) => ({
        ...item,
        id: `item-${idx}`,
      }));

      setFormData({
        poId: existingPO.vendorPoId, // 👈 Use vendorPoId as the display ID
        date: existingPO.poDate || new Date().toISOString().split("T")[0], // Fallback if not set
        vendorName: existingPO.vendorName,
        vendorAddress: existingPO.vendorAddress,
        vendorGST: existingPO.vendorGST,
        deliveryNumber: existingPO.deliveryNumber || "",
        dispatchDate: existingPO.dispatchDate || "",
        deliveryMethod: existingPO.deliveryMethod || "",
        items: itemsWithId,
        terms: existingPO.terms || "",
      });
      setIsEditMode(true);
    } else {
      alert("Vendor PO not found!");
      navigate("/povendor"); // Redirect back to the list
    }
  } else {
    // Create new PO
    setFormData((prev) => ({
      ...prev,
      poId: generateNewPOId(),
      date: new Date().toISOString().split("T")[0],
    }));
    setIsEditMode(false);
  }
}, [poId, navigate]);

  // Recalculate totals
  useEffect(() => {
    setTotals(calculateTotals(formData.items));
  }, [formData.items]);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setFormData((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") {
            const q = parseFloat(updated.quantity) || 0;
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

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          material: materialOptions[0],
          description: "",
          unit: "",
          quantity: "",
          rate: "",
          amount: "",
        },
      ],
    }));
  };

  const handleRemoveItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final PO Data:", { ...formData, ...totals });
    alert(isEditMode ? "PO updated successfully!" : "PO saved successfully!");
    navigate("/purchase-orders");
  };

  const handleCancel = () => {
    navigate("/purchase-orders");
  };

  return (
    <Container fluid className="my-4">
      <Button
        className="mb-3"
        style={{ backgroundColor: "rgb(237,49,49)", border: "none" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </Button>

      <Form onSubmit={handleSubmit}>
        {/* Card 1: PO Details */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h4">
              {isEditMode ? "View Vendor PO" : "Create New Vendor PO"}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>PO Number</Form.Label>
                  <Form.Control type="text" value={formData.poId} readOnly />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleMainChange}
                    required
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Dispatch Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dispatchDate"
                    value={formData.dispatchDate}
                    onChange={handleMainChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryNumber"
                    value={formData.deliveryNumber}
                    onChange={handleMainChange}
                    placeholder="e.g. DN-2025-001"
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
                    readOnly
                  >
                    <option value="">Select Method</option>
                    <option value="Road">Road</option>
                    <option value="Rail">Rail</option>
                    <option value="Air">Air</option>
                    <option value="Courier">Courier</option>
                    <option value="Self Pickup">Self Pickup</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Vendor GST No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorGST"
                    value={formData.vendorGST}
                    onChange={handleMainChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleMainChange}
                    required
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>Vendor Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="vendorAddress"
                    value={formData.vendorAddress}
                    onChange={handleMainChange}
                    required
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Card 2: Item Table */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h4">PO Line Items</Card.Title>
          </Card.Header>
          <Card.Body>
            {formData.items.map((item) => (
              <Row key={item.id} className="align-items-center mb-3">
                <Col md="2">
                  <Form.Group>
                    <Form.Label>Material</Form.Label>
                    <Form.Control
                      as="select"
                      value={item.material}
                      onChange={(e) =>
                        handleItemChange(item.id, "material", e.target.value)
                      }
                    >
                      {materialOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="3">
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      readOnly
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label>Unit</Form.Label>
                    <Form.Control
                      type="text"
                      value={item.unit}
                      readOnly
                      onChange={(e) =>
                        handleItemChange(item.id, "unit", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="1">
                  <Form.Group>
                    <Form.Label>Qty</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      readOnly
                      onChange={(e) =>
                        handleItemChange(item.id, "quantity", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="2">
                  <Form.Group>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.rate}
                      readOnly
                      onChange={(e) =>
                        handleItemChange(item.id, "rate", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="2">
                  <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" value={item.amount} readOnly />
                  </Form.Group>
                </Col>
                {/* <Col md="1">
                  {formData.items.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-4"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaMinus />
                    </Button>
                  )}
                </Col> */}
              </Row>
            ))}

            {/* <div className="d-flex justify-content-start">
              <Button variant="primary" size="sm" onClick={handleAddItem}>
                <FaPlus /> Add Item
              </Button>
            </div> */}
          </Card.Body>
        </Card>

        {/* Card 3: Totals + Terms */}
        <Card className="mb-4">
          <Card.Header>
            {/* <Card.Title as="h4">Commercial Summary</Card.Title> */}
          </Card.Header>
          <Card.Body>
            <Row className="d-flex justify-content-end">
              {/* <Col md="8">
                <Form.Group>
                  <Form.Label>Terms & Conditions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="terms"
                    value={formData.terms}
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col> */}

              <Col md="4">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <strong>Basic Amount:</strong>
                      <span>₹{totals.basicAmount.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <strong>GST (18%):</strong>
                      <span>₹{totals.gst.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5>Total:</h5>
                      <h6>₹{totals.grandTotal.toLocaleString()}</h6>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* <div className="d-flex justify-content-end mt-4 gap-3">
              <Button
                type="submit"
                style={{ backgroundColor: "#ed3131", border: "none" }}
              >
                {isEditMode ? "Update PO" : "Save PO"}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                style={{ border: "none" }}
              >
                Cancel
              </Button>
            </div> */}
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}