// src/pages/RequisitionForm.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RequisitionForm() {
  const [formData, setFormData] = useState({
    quotationId: "",
    customer: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      id: "",
    },
    requiredByDate: "",
    deliveryAddress: "",
    priority: "medium",
    specialInstructions: "",
    items: [
      { description: "", unit: "", quantity: 0, rate: 0 },
    ],
    additionalDetails: [],
  });

  // Handle general field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("customer.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        customer: { ...prev.customer, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle dynamic items
  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", unit: "", quantity: 0, rate: 0 }],
    }));
  };

  const removeItem = (index) => {
    const updated = [...formData.items];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequisition = {
      ...formData,
      requisitionId: `REQ-NLF-${Math.floor(Math.random() * 1000)}`, // simple id generator
      status: "pending",
      createdDate: new Date().toISOString().split("T")[0],
      totalAmount: formData.items.reduce(
        (sum, item) => sum + item.quantity * item.rate,
        0
      ),
      items: formData.items.map((i) => ({
        ...i,
        requiredQuantity: i.quantity,
        allocatedQuantity: 0,
        pendingQuantity: i.quantity,
      })),
    };

    console.log("New Requisition:", newRequisition);
    toast.success("Requisition created successfully!");
    // In real app -> send to backend or push to state/store
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title>Create Requisition</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Quotation ID */}
                <Form.Group className="mb-3">
                  <Form.Label>Quotation ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="quotationId"
                    value={formData.quotationId}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Customer Info */}
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Customer Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="customer.name"
                        value={formData.customer.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="customer.email"
                        value={formData.customer.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="customer.mobile"
                        value={formData.customer.mobile}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Customer ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="customer.id"
                        value={formData.customer.id}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Customer Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="customer.address"
                    value={formData.customer.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Required By Date */}
                <Form.Group className="mb-3">
                  <Form.Label>Required By Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="requiredByDate"
                    value={formData.requiredByDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Delivery Address */}
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Priority */}
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>

                {/* Special Instructions */}
                <Form.Group className="mb-3">
                  <Form.Label>Special Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Items Section */}
                <h5>Items</h5>
                {formData.items.map((item, index) => (
                  <Row key={index} className="mb-2">
                    <Col md={3}>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        required
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        type="text"
                        placeholder="Unit"
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(index, "unit", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        required
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(index, "rate", e.target.value)
                        }
                        required
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="danger"
                        onClick={() => removeItem(index)}
                      >
                        <FaMinus />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button variant="secondary" onClick={addItem} className="mb-3">
                  <FaPlus /> Add Item
                </Button>

                {/* Submit */}
                <div className="mt-4">
                  <Button type="submit" variant="primary">
                    Submit Requisition
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
