import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Row, Col, Form, Badge, Container, Button } from "react-bootstrap";
import { quotations } from "../../data/mockdata";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";

// Component to display a single round of a quotation
const QuotationRoundDisplay = ({ round, quotationId, showTotals = false }) => {
  const statusGradient = () => {
    switch (round.status?.toLowerCase()) {
      case "rejected":
        return "linear-gradient(to right, rgb(244, 67, 54), rgb(198, 40, 40)";
      case "approved":
        return "linear-gradient(to right, rgb(76, 175, 80), rgb(46, 125, 50))";
      case "accepted":
        return "linear-gradient(to right, #87CEEB, #00BFFF)";
      case "revise":
        return "linear-gradient(to right, #ffc107, #ffda85)";
      default:
        return "linear-gradient(to right, #0d6efd, #6ea8fe)";
    }
  };

  // Helper function to calculate totals for a given round
  const calculateTotals = (items, additionalDetails) => {
    const basicAmount = items.reduce(
      (acc, item) => acc + (item.quantity || 0) * (item.rate || 0),
      0
    );
    const additionalAmount = additionalDetails.reduce(
      (acc, item) => acc + (item.quantity || 0) * (item.rate || 0),
      0
    );
    const subtotal = basicAmount + additionalAmount;
    const gst = subtotal * 0.18; // 18% GST
    const grandTotal = subtotal + gst;

    return { basicAmount, gst, grandTotal };
  };

  const totals = calculateTotals(round.items || [], round.additionalDetails || []);
  const isRejected = round.status?.toLowerCase() === "rejected";

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0 mt-0 card-title">
          {quotationId} ({round.round})
        </h5>
        <Badge
          className="px-3 py-2"
          style={{
            background: statusGradient(),
            color: "#fff",
          }}
        >
          {round.status?.charAt(0).toUpperCase() + round.status?.slice(1) || "-"}
        </Badge>
      </Card.Header>
      <Card.Body>
        {/* Quotation Items */}
        <h6 className="mb-3" style={{ fontWeight: "600" }}>Quotation Items</h6>
        {round.items?.map((item, index) => (
          <Row key={`item-${index}`} className="align-items-center mb-2 gap-4">
            <Col md="5">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={1}
                  readOnly
                  defaultValue={item.description || "-"}
                />
              </Form.Group>
            </Col>
            <Col md="1">
              <Form.Group>
                <Form.Control readOnly defaultValue={item.unit || "-"} />
              </Form.Group>
            </Col>
            <Col md="2">
              <Form.Group>
                <Form.Control readOnly defaultValue={item.quantity || "0"} />
              </Form.Group>
            </Col>
            <Col md="2">
              <Form.Group>
                <Form.Control readOnly defaultValue={item.rate || "0"} />
              </Form.Group>
            </Col>
            <Col md="1">
              <Form.Group>
                <Form.Control
                  readOnly
                  defaultValue={(item.quantity || 0) * (item.rate || 0)}
                />
              </Form.Group>
            </Col>
          </Row>
        ))}

        {/* Installation Details */}
        <h6 className="mt-4 mb-3" style={{ fontWeight: "600" }}>Installation Details</h6>
        {round.additionalDetails?.map((item, index) => (
          <Row key={`addl-${index}`} className="align-items-center mb-2 gap-4">
            <Col md="5">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={1}
                  readOnly
                  defaultValue={item.description || "-"}
                />
              </Form.Group>
            </Col>
            <Col md="1">
              <Form.Group>
                <Form.Control readOnly defaultValue={item.unit || "-"} />
              </Form.Group>
            </Col>
            <Col md="2">
              <Form.Group>
                <Form.Control readOnly defaultValue={item.quantity || "0"} />
              </Form.Group>
            </Col>
            <Col md="2">
              <Form.Group>
                <Form.Control readOnly defaultValue={item.rate || "0"} />
              </Form.Group>
            </Col>
            <Col md="1">
              <Form.Group>
                <Form.Control
                  readOnly
                  defaultValue={(item.quantity || 0) * (item.rate || 0)}
                />
              </Form.Group>
            </Col>
          </Row>
        ))}
        {/* Totals Section */}
        <div className="d-flex justify-content-end mt-4">
          <Card style={{ width: "20rem" }}>
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
                <h4>Total:</h4>
                <h6>₹{totals.grandTotal.toLocaleString()}</h6>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Commercial Terms */}
        <Card className="mt-4">
          <Card.Header>
            <Card.Title as="h4" style={{ fontWeight: "600" }}>Commercial Terms</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <h6 style={{ fontWeight: "600" }}>GST:</h6>
              <p>{round.commercialTerms?.gst || "N/A"}</p>
            </div>
            <div className="mb-3">
              <h6 style={{ fontWeight: "600" }}>Supply Terms</h6>
              <p>{round.commercialTerms?.supplyTerms || "N/A"}</p>
            </div>
            <div className="mb-3">
              <h6 style={{ fontWeight: "600" }}>Installation Terms</h6>
              <p>{round.commercialTerms?.installationTerms || "N/A"}</p>
            </div>
          </Card.Body>
        </Card>
        
        {isRejected && (
          <Form.Group className="mb-3">
            <Form.Label>Reason for Rejection</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              readOnly
              defaultValue={round.reason || "No reason provided"}
            />
          </Form.Group>
        )}
        {round.po && (
          <Card className="mt-3 border-success">
            <Card.Header>
              <strong>Purchase Order Details</strong>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>PO Number</Form.Label>
                    <Form.Control readOnly defaultValue={round.po.poNumber} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control readOnly defaultValue={round.po.poDate} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={`₹${round.po.totalAmount.toLocaleString()}`}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Delivery Date</Form.Label>
                    <Form.Control readOnly defaultValue={round.po.deliveryDate} />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
};

export default function RecordQuotations() {
  const { quotationId } = useParams();
  const customerQuotation = quotations.find((q) => q.quotationId === quotationId);

  if (!customerQuotation) {
    return (
      <Container className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Quotation History</h4>
        </div>
        <Card>
          <Card.Body>
            No quotation found for <strong>{quotationId}</strong>.
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      {/* Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button
          as={Link}
          to="/leadgeneration"
          className="btn-sm mt-0"
          style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
        >
           <FaArrowLeft />
        </Button>
      </div>

      {/* Customer Info Card */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0 mt-0 card-title">Primary Customer Details</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={customerQuotation.customer?.name || "-"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Customer Email</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={customerQuotation.customer?.email || "-"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={customerQuotation.customer?.mobile || "-"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={customerQuotation.customer?.address || "-"}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Multiple Rounds */}
      <Row>
        <Col md={12}>
          <h4 className="mb-3">Quotation History</h4>
         {[...customerQuotation.rounds]
  // Filter out the blank or initial round (e.g. "R0" or missing round name)
  .filter(round => round.round && round.round.toLowerCase() !== "r0")
  // Sort so the latest (e.g. R3, R2...) appears first
  .sort((a, b) => parseInt(b.round.substring(1)) - parseInt(a.round.substring(1)))
  // Render rounds
  .map((round, idx) => (
    <QuotationRoundDisplay
      key={idx}
      round={round}
      quotationId={customerQuotation.quotationId}
    />
  ))}
        </Col>
      </Row>
    </Container>
  );
}