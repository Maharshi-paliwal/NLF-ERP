// AnnextureForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { annextures, workOrders, quotations } from "../data/mockdata";

const initialFormState = {
  workOrderId: "",
  quotationId: "",
  clientName: "",
  projectName: "",
  createdDate: new Date().toISOString().split('T')[0],
  preparedBy: "",
  approvedBy: "",
  approvalStatus: "draft",
  items: [
    {
      id: `item-${Date.now()}`,
      itemType: "Primary",
      category: "",
      material: "",
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      total: "",
      specifications: {},
      vendorPoReference: "",
      productionStatus: "pending",
      deliveryStatus: "pending",
    },
  ],
  accessories: [
    {
      id: `acc-${Date.now() + 1}`,
      accessoryType: "Hardware",
      category: "",
      name: "",
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      total: "",
      supplier: "",
      vendorPoReference: "",
      specifications: {},
    },
  ],
  notes: "",
  attachments: [],
};

export default function AnnextureForm() {
  const { workOrderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const isViewOnly = searchParams.get('view') === 'true';
  const isNew = !workOrderId;

  const [formData, setFormData] = useState(() => ({
    ...initialFormState,
    workOrderId: workOrderId || "",
  }));

  const [totals, setTotals] = useState({
    totalPrimaryItems: 0,
    totalAccessories: 0,
    totalLineItems: 0,
    itemsTotal: 0,
    accessoriesTotal: 0,
    gst: 0,
    grandTotalWithGST: 0,
  });

  // ✅ Load Work Order data when component mounts
  useEffect(() => {
    if (workOrderId) {
      const workOrder = workOrders.find((wo) => wo.workOrderId === workOrderId);
      
      if (workOrder) {
        // Pre-populate form with work order data
        setFormData((prev) => ({
          ...prev,
          workOrderId: workOrder.workOrderId,
          quotationId: workOrder.quotationId,
          clientName: workOrder.customerName,
          projectName: workOrder.projectName,
          createdDate: new Date().toISOString().split('T')[0],
          preparedBy: workOrder.salespersonName || "",
          // ✅ Pre-populate items from work order
          items: workOrder.items.map((item, idx) => ({
            id: `item-${idx}`,
            itemType: "Primary",
            category: "Furniture",
            material: item.material,
            description: item.description,
            unit: item.unit,
            quantity: item.quantity.toString(),
            rate: item.rate.toString(),
            total: item.total.toString(),
            specifications: item.specifications || {},
            vendorPoReference: "",
            productionStatus: item.productionStatus || "pending",
            deliveryStatus: item.deliveryStatus || "pending",
          })),
        }));
      } else {
        console.warn(`Work Order ${workOrderId} not found in mockdata`);
      }
    }
  }, [workOrderId]);

  // Calculate totals
  useEffect(() => {
    const itemsTotal = formData.items.reduce((sum, item) => {
      const total = parseFloat(item.total) || (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0);
      return sum + total;
    }, 0);

    const accessoriesTotal = formData.accessories.reduce((sum, acc) => {
      const total = parseFloat(acc.total) || (parseFloat(acc.quantity) || 0) * (parseFloat(acc.rate) || 0);
      return sum + total;
    }, 0);

    const subtotal = itemsTotal + accessoriesTotal;
    const gst = subtotal * 0.18;

    setTotals({
      totalPrimaryItems: formData.items.filter((i) => i.itemType === "Primary").length,
      totalAccessories: formData.accessories.length,
      totalLineItems: formData.items.length + formData.accessories.length,
      itemsTotal,
      accessoriesTotal,
      gst,
      grandTotalWithGST: subtotal + gst,
    });
  }, [formData.items, formData.accessories]);

  // === Handlers ===
  const handleMainFormChange = (e) => {
    if (isViewOnly) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (itemId, field, value) => {
    if (isViewOnly) return;
    setFormData((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === itemId) {
          const newItem = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") {
            const qty = parseFloat(newItem.quantity) || 0;
            const rate = parseFloat(newItem.rate) || 0;
            newItem.total = (qty * rate).toString();
          }
          return newItem;
        }
        return item;
      });
      return { ...prev, items: updatedItems };
    });
  };

  const handleAccessoryChange = (accessoryId, field, value) => {
    if (isViewOnly) return;
    setFormData((prev) => {
      const updatedAccessories = prev.accessories.map((acc) => {
        if (acc.id === accessoryId) {
          const newAcc = { ...acc, [field]: value };
          if (field === "quantity" || field === "rate") {
            const qty = parseFloat(newAcc.quantity) || 0;
            const rate = parseFloat(newAcc.rate) || 0;
            newAcc.total = (qty * rate).toString();
          }
          return newAcc;
        }
        return acc;
      });
      return { ...prev, accessories: updatedAccessories };
    });
  };

  const handleAddItem = () => {
    if (isViewOnly) return;
    const newItem = {
      id: `item-${Date.now()}`,
      itemType: "Primary",
      category: "",
      material: "",
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      total: "",
      specifications: {},
      vendorPoReference: "",
      productionStatus: "pending",
      deliveryStatus: "pending",
    };
    setFormData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleRemoveItem = (itemId) => {
    if (isViewOnly || formData.items.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const handleAddAccessory = () => {
    if (isViewOnly) return;
    const newAccessory = {
      id: `acc-${Date.now()}`,
      accessoryType: "Hardware",
      category: "",
      name: "",
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      total: "",
      supplier: "",
      vendorPoReference: "",
      specifications: {},
    };
    setFormData((prev) => ({
      ...prev,
      accessories: [...prev.accessories, newAccessory],
    }));
  };

  const handleRemoveAccessory = (accessoryId) => {
    if (isViewOnly || formData.accessories.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((acc) => acc.id !== accessoryId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ Validate required fields
    if (!formData.workOrderId || !formData.quotationId || !formData.clientName) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Annexture Data:", { ...formData, ...totals });
    alert(isNew ? "Annexture created successfully!" : "Annexture updated successfully!");
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container fluid className="my-4">
      <Link to="/povendor">
        <Button className="mb-3 btn btn-primary" style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}>
          <FaArrowLeft /> Back
        </Button>
      </Link>

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Header Card */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: "#2c3e50" }}>
                <Card.Title as="h4" style={{ color: "white", margin: 0 }}>
                  {isNew ? "Create Annexture" : "Edit Annexture"} {workOrderId && `- ${workOrderId}`}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Work Order ID <span style={{color: "red"}}>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="workOrderId"
                        value={formData.workOrderId}
                        onChange={handleMainFormChange}
                        readOnly={true}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Quotation ID <span style={{color: "red"}}>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="quotationId"
                        value={formData.quotationId}
                        onChange={handleMainFormChange}
                        readOnly={isViewOnly}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Client Name <span style={{color: "red"}}>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleMainFormChange}
                        readOnly={isViewOnly}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Project Name <span style={{color: "red"}}>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleMainFormChange}
                        readOnly={isViewOnly}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Form.Group className="mb-3">
                      <Form.Label>Created Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="createdDate"
                        value={formData.createdDate}
                        onChange={handleMainFormChange}
                        readOnly={isViewOnly}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group className="mb-3">
                      <Form.Label>Prepared By</Form.Label>
                      <Form.Control
                        type="text"
                        name="preparedBy"
                        value={formData.preparedBy}
                        onChange={handleMainFormChange}
                        readOnly={isViewOnly}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group className="mb-3">
                      <Form.Label>Approved By</Form.Label>
                      <Form.Control
                        type="text"
                        name="approvedBy"
                        value={formData.approvedBy}
                        onChange={handleMainFormChange}
                        readOnly={isViewOnly}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group className="mb-3">
                      <Form.Label>Approval Status</Form.Label>
                      <Form.Control
                        as="select"
                        name="approvalStatus"
                        value={formData.approvalStatus}
                        onChange={handleMainFormChange}
                        disabled={isViewOnly}
                      >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Primary Items Card */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: "#34495e" }}>
                <Card.Title as="h5" style={{ color: "white", margin: 0 }}>
                  Primary Items ({formData.items.length})
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div style={{ overflowX: "auto" }}>
                  <Table striped hover responsive size="sm">
                    <thead>
                      <tr style={{ backgroundColor: "#34495e", color: "white" }}>
                        <th>Sr.</th>
                        <th>Category</th>
                        <th>Material</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={item.category}
                              onChange={(e) => handleItemChange(item.id, "category", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={item.material}
                              onChange={(e) => handleItemChange(item.id, "material", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={item.description}
                              onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              size="sm"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={item.unit}
                              onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              size="sm"
                              value={item.rate}
                              onChange={(e) => handleItemChange(item.id, "rate", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              size="sm"
                              value={item.total}
                              readOnly
                            />
                          </td>
                          <td>
                            {!isViewOnly && formData.items.length > 1 && (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <FaMinus />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {!isViewOnly && (
                  <Button variant="primary" size="sm" onClick={handleAddItem} className="mt-2">
                    <FaPlus /> Add Primary Item
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Accessories Card */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: "#34495e" }}>
                <Card.Title as="h5" style={{ color: "white", margin: 0 }}>
                  Accessories ({formData.accessories.length})
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div style={{ overflowX: "auto" }}>
                  <Table striped hover responsive size="sm">
                    <thead>
                      <tr style={{ backgroundColor: "#95a5a6", color: "white" }}>
                        <th>Sr.</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Total</th>
                        <th>Supplier</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.accessories.map((acc, idx) => (
                        <tr key={acc.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <Form.Control
                              as="select"
                              size="sm"
                              value={acc.accessoryType}
                              onChange={(e) => handleAccessoryChange(acc.id, "accessoryType", e.target.value)}
                              disabled={isViewOnly}
                            >
                              <option>Hardware</option>
                              <option>Finishing</option>
                              <option>Cable Management</option>
                              <option>Installation</option>
                              <option>Packaging</option>
                              <option>Safety</option>
                              <option>Maintenance</option>
                            </Form.Control>
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={acc.category}
                              onChange={(e) => handleAccessoryChange(acc.id, "category", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={acc.name}
                              onChange={(e) => handleAccessoryChange(acc.id, "name", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              size="sm"
                              value={acc.quantity}
                              onChange={(e) => handleAccessoryChange(acc.id, "quantity", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={acc.unit}
                              onChange={(e) => handleAccessoryChange(acc.id, "unit", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              size="sm"
                              value={acc.rate}
                              onChange={(e) => handleAccessoryChange(acc.id, "rate", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              size="sm"
                              value={acc.total}
                              readOnly
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              value={acc.supplier}
                              onChange={(e) => handleAccessoryChange(acc.id, "supplier", e.target.value)}
                              readOnly={isViewOnly}
                            />
                          </td>
                          <td>
                            {!isViewOnly && formData.accessories.length > 1 && (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveAccessory(acc.id)}
                              >
                                <FaMinus />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {!isViewOnly && (
                  <Button variant="primary" size="sm" onClick={handleAddAccessory} className="mt-2">
                    <FaPlus /> Add Accessory
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Notes Card */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Notes</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="notes"
                    value={formData.notes}
                    onChange={handleMainFormChange}
                    readOnly={isViewOnly}
                    placeholder="Enter project notes..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Summary & Totals */}
          <Col md="12">
            <div className="d-flex justify-content-end">
              <Card style={{ width: "100%", maxWidth: "25rem" }}>
                <Card.Header style={{ backgroundColor: "#ecf0f1" }}>
                  <Card.Title as="h5" className="mb-0">Summary & Totals</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-2">
                    <Col>
                      <p><strong>Primary Items:</strong> {totals.totalPrimaryItems}</p>
                    </Col>
                    <Col>
                      <p><strong>Accessories:</strong> {totals.totalAccessories}</p>
                    </Col>
                  </Row>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Items Total:</strong>
                    <span>₹{totals.itemsTotal.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Accessories Total:</strong>
                    <span>₹{totals.accessoriesTotal.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Subtotal:</strong>
                    <span>₹{(totals.itemsTotal + totals.accessoriesTotal).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <strong>GST (18%):</strong>
                    <span>₹{totals.gst.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between" style={{ backgroundColor: "#d4edda", padding: "10px", borderRadius: "5px" }}>
                    <h5 style={{ margin: 0 }}>Grand Total:</h5>
                    <h5 style={{ margin: 0 }}>₹{totals.grandTotalWithGST.toLocaleString()}</h5>
                  </div>

                  <div className="d-flex justify-content-end mt-4 gap-2">
                    {!isViewOnly && (
                      <Button
                        className="btn"
                        type="submit"
                        style={{ backgroundColor: "#ed3131", border: "none" }}
                      >
                        {isNew ? "Create Annexture" : "Update Annexture"}
                      </Button>
                    )}
                    <Button
                      className="btn"
                      type="button"
                      onClick={handleCancel}
                      style={{ backgroundColor: "#adb5bd", border: "none" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}