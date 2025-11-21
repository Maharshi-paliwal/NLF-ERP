

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { quotations as initialQuotations } from "../data/mockdata";

// Helper function to calculate totals
const calculateTotals = (items, additionalItems) => {
  const basicAmount = items.reduce(
    (acc, item) => acc + (item.quantity || 0) * (item.rate || 0),
    0
  );
  const additionalAmount = additionalItems.reduce(
    (acc, item) => acc + (item.quantity || 0) * (item.rate || 0),
    0
  );
  const subtotal = basicAmount + additionalAmount;
  const gst = subtotal * 0.18; // 18% GST as an example
  const grandTotal = subtotal + gst;

  return { basicAmount, gst, grandTotal };
};

// Custom ID generation logic (for Quotations - kept for context)
const generateNewQuotationId = (quotations) => {
  const lastQuotation = quotations[quotations.length - 1];
  const lastId = lastQuotation ? parseInt(lastQuotation.quotationId.substring(5)) : 0;
  const newId = (lastId + 1).toString().padStart(3, '0');
  const year = new Date().getFullYear().toString().substring(2);
  return `Q-N${year}-${newId}`;
};

// Custom ID generation for Order Confirmation
const generateNewOrderConfirmationId = (quotations) => {
  let lastId = 0;
  // Iterate through all quotations and their rounds to find the last order confirmation ID
  quotations.forEach(q => {
    if (q.orderConfirmation) {
      q.orderConfirmation.forEach(oc => {
        const currentId = parseInt(oc.orderConfirmationId.split('-').pop());
        if (currentId > lastId) {
          lastId = currentId;
        }
      });
    }
    if (q.rounds) {
      q.rounds.forEach(r => {
        if (r.orderConfirmation) {
          r.orderConfirmation.forEach(oc => {
            const currentId = parseInt(oc.orderConfirmationId.split('-').pop());
            if (currentId > lastId) {
              lastId = currentId;
            }
          });
        }
      });
    }
  });

  const newId = (lastId + 1).toString().padStart(3, '0');
  const year = new Date().getFullYear().toString().substring(2);
  return `OC-NLF-${year}-${newId}`;
};

// Initial state for form fields
const initialFormState = {
  orderConfirmationId: "", // Use this for OC ID
  quotationId: "",
  shipmentAddress: "",
  date: "",
  items: [
    { id: `item-${Date.now()}`, description: "", unit: "", quantity: "", rate: "" },
  ],
  additionalDetails: [
    { id: `addl-${Date.now()}`, description: "", unit: "", quantity: "", rate: "" },
  ],
  commercialTerms: {
    gst: "As applicable",
    supplyTerms: "",
    installationTerms: "",
  },
};

export default function OrderConfirmForm() {
  const { orderConfirmationId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [totals, setTotals] = useState({
    basicAmount: 0,
    gst: 0,
    grandTotal: 0,
  });

  // Calculate totals whenever items or additional details change
  useEffect(() => {
    const newTotals = calculateTotals(
      formData.items,
      formData.additionalDetails
    );
    setTotals(newTotals);
  }, [formData.items, formData.additionalDetails]);

  // Load data or generate new ID on component mount/ID change
  useEffect(() => {
    if (orderConfirmationId) {
      // Flag to check if the ID is the temporary one from the list view (e.g., Q-N25-001-R2)
      const isTemporaryRoundId = orderConfirmationId.includes("-R");
      let foundQuotation = null;
      let sourceRound = null; // The round object to pull items/terms from
      let ocIdToUse = orderConfirmationId; // The ID to use for the form field

      // 1. Try to find a permanent OC or the source round
      for (const quotation of initialQuotations) {
        // A. Check for a PERMANENT Order Confirmation ID (OC-NLF-...)
        let foundPermanentOrderConfirmation = null;

        // Check root level orderConfirmation
        foundPermanentOrderConfirmation = quotation.orderConfirmation?.find(
          (oc) => oc.orderConfirmationId === orderConfirmationId
        );

        // Check orderConfirmation within rounds
        if (!foundPermanentOrderConfirmation) {
          for (const round of quotation.rounds || []) {
            foundPermanentOrderConfirmation = round.orderConfirmation?.find(
              (oc) => oc.orderConfirmationId === orderConfirmationId
            );
            if (foundPermanentOrderConfirmation) break;
          }
        }

        if (foundPermanentOrderConfirmation) {
          foundQuotation = quotation;
          // If a permanent OC is found, try to find the round it was created from
          sourceRound = foundQuotation.rounds?.find(r => r.round === foundPermanentOrderConfirmation.roundId) || foundQuotation.rounds?.sort(
              (a, b) => parseInt(b.round.substring(1)) - parseInt(a.round.substring(1))
          )[0];
          
          ocIdToUse = foundPermanentOrderConfirmation.orderConfirmationId;
          break;
        }

        // B. If no permanent OC is found, check for the TEMPORARY Round ID (for new OC creation)
        if (isTemporaryRoundId) {
          // Split the composite ID: Q-N25-001-R2 -> ["Q-N25-001", "2"]
          const parts = orderConfirmationId.split("-R");
          // Check for valid split and format
          if (parts.length > 1 && parts.pop()) {
            const rNum = "R" + parts.pop(); // Reconstructs R2
            const qId = parts.join("-R"); // Reconstructs Q-N25-001

            if (quotation.quotationId === qId) {
              foundQuotation = quotation;
              // Find the exact round object that matches the round number
              sourceRound = quotation.rounds?.find(r => r.round === rNum);

              // The temporary ID is used for the display field
              ocIdToUse = orderConfirmationId;
              break;
            }
          }
        }
      }

      // 2. Load data based on found entities
      if (foundQuotation && sourceRound) {
        // Use the current ID as the stable key for React item lists
        const stableKey = ocIdToUse;

        setFormData({
          // This will either be the permanent OC ID or the temporary round ID
          orderConfirmationId: ocIdToUse,
          quotationId: foundQuotation.quotationId,
          // Use sourceRound's terms or customer address as fallback for shipment address
          shipmentAddress: sourceRound.commercialTerms?.supplyTerms || foundQuotation.customer.address || initialFormState.shipmentAddress,
          // For a new OC from a final round, use today's date. For a loaded OC, use its date.
          date: new Date().toISOString().split('T')[0],

          // Load items from the found sourceRound
          items: sourceRound.items?.length
            ? sourceRound.items.map((item, index) => ({ ...item, id: `item-${stableKey}-${index}` }))
            : initialFormState.items,

          // Load additional details from the found sourceRound
          additionalDetails: sourceRound.additionalDetails?.length
            ? sourceRound.additionalDetails.map((item, index) => ({ ...item, id: `addl-${stableKey}-${index}` }))
            : initialFormState.additionalDetails,

          commercialTerms: {
            gst: sourceRound.commercialTerms?.gst || initialFormState.commercialTerms.gst,
            supplyTerms: sourceRound.commercialTerms?.supplyTerms || initialFormState.commercialTerms.supplyTerms,
            installationTerms: sourceRound.commercialTerms?.installationTerms || initialFormState.commercialTerms.installationTerms,
          },
        });
      } else {
        console.error("Order confirmation or corresponding finalized quotation round not found:", orderConfirmationId);
        // Optionally navigate away, but for now we keep it to show the form empty/defaulted
        // navigate("/order-confirmations"); 
      }
    } else {
      // Logic for new order confirmation
      setFormData((prev) => ({
        ...prev,
        orderConfirmationId: generateNewOrderConfirmationId(initialQuotations),
        quotationId: "", // This would be selected from a dropdown in a real app
        date: new Date().toISOString().split('T')[0],
      }));
    }
  }, [orderConfirmationId, navigate]);

  // Handle changes for top-level form fields
  const handleMainFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for dynamic item fields
  const handleItemChange = (itemId, field, value, section) => {
    setFormData((prev) => {
      const updatedSection = prev[section].map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      );
      return { ...prev, [section]: updatedSection };
    });
  };

  // Handle changes for commercial terms
  const handleCommercialTermsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      commercialTerms: {
        ...prev.commercialTerms,
        [name]: value,
      },
    }));
  };

  // Add a new row to a dynamic section
  const handleAddItem = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        { id: `${section}-${Date.now()}`, description: "", unit: "", quantity: "", rate: "" },
      ],
    }));
  };

  // Remove a row from a dynamic section
  const handleRemoveItem = (itemId, section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== itemId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Order Confirmation Data:", { ...formData, ...totals });
    alert("Order Confirmation saved successfully!");
    navigate("/order-confirmations"); // Redirect to the order confirmations list
  };

  const handleCancel = () => {
    navigate("/order-confirmations");
  };

  return (
    <Container fluid className="my-4">
      <Button className="mb-3 btn btn-primary" style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }} onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </Button>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Card 1: Order Confirmation Details */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">
                  Order Confirmation Form
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmed Order No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="orderConfirmationId"
                        value={formData.orderConfirmationId}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Quotation ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="quotationId"
                        value={formData.quotationId}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleMainFormChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Shipment Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="shipmentAddress"
                        value={formData.shipmentAddress}
                        onChange={handleMainFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: Quotation Items */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">Item Description</Card.Title>
              </Card.Header>
              <Card.Body>
                {formData.items.map((item, index) => (
                  <Row key={item.id} className="align-items-center mb-3">
                    <Col md="5">
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "description",
                              e.target.value,
                              "items"
                            )
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
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "unit",
                              e.target.value,
                              "items"
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="2">
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "quantity",
                              parseFloat(e.target.value),
                              "items"
                            )
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
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "rate",
                              parseFloat(e.target.value),
                              "items"
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="1">
                      <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          type="number"
                          value={((item.quantity || 0) * (item.rate || 0)).toFixed(2)}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md="1">
                      {formData.items.length > 1 && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-4"
                          onClick={() => handleRemoveItem(item.id, "items")}
                        >
                          <FaMinus />
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}
                <div className="d-flex justify-content-start">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddItem("items")}
                  >
                    <FaPlus /> Add Item
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Card 3: ADDITIONAL DETAILS (WAS MISSING) */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">Additional Details / Services</Card.Title>
              </Card.Header>
              <Card.Body>
                {formData.additionalDetails.map((item, index) => (
                  <Row key={item.id} className="align-items-center mb-3">
                    <Col md="5">
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(item.id, "description", e.target.value, "additionalDetails")
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
                          onChange={(e) =>
                            handleItemChange(item.id, "unit", e.target.value, "additionalDetails")
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="2">
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(item.id, "quantity", parseFloat(e.target.value), "additionalDetails")
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
                          onChange={(e) =>
                            handleItemChange(item.id, "rate", parseFloat(e.target.value), "additionalDetails")
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="1">
                      <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          type="number"
                          value={((item.quantity || 0) * (item.rate || 0)).toFixed(2)}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md="1">
                      {formData.additionalDetails.length > 1 && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-4"
                          onClick={() => handleRemoveItem(item.id, "additionalDetails")}
                        >
                          <FaMinus />
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}
                <div className="d-flex justify-content-start">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddItem("additionalDetails")}
                  >
                    <FaPlus /> Add Additional Item
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 4: COMMERCIAL TERMS (WAS MISSING) */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">Commercial Terms</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>GST</Form.Label>
                      <Form.Control
                        type="text"
                        name="gst"
                        value={formData.commercialTerms.gst}
                        onChange={handleCommercialTermsChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Supply Terms</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        name="supplyTerms"
                        value={formData.commercialTerms.supplyTerms}
                        onChange={handleCommercialTermsChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Installation Terms</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        name="installationTerms"
                        value={formData.commercialTerms.installationTerms}
                        onChange={handleCommercialTermsChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 5: Totals and Submit (Correctly positioned) */}
          <Col md="12">
            <div className="d-flex justify-content-end">
              <Card style={{ width: "20rem" }}>
                <Card.Body >
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Basic Amount:</strong>
                    <span>₹{totals.basicAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>GST (18%):</strong>
                    <span>₹{totals.gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <h4>Total:</h4>
                    <h6>₹{totals.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h6>
                  </div>
                  <div className="d-flex justify-content-end mt-5 gap-3">
                    <Button className="btn" type="submit" style={{ backgroundColor: "#ed3131", border: "none", }}>
                      {orderConfirmationId ? "Update" : "Save"}
                    </Button>

                    <Button
                      className="btn me-2"
                      type="button"
                      onClick={handleCancel}
                      style={{ backgroundColor: "#adb5bd", border: "none", }}
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
// End of OrderConfirmForm