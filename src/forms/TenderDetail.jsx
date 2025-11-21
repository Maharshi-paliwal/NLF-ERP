// src/pages/TenderDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { tenders as mockTenders } from "../data/mockdata";

export default function TenderDetail() {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [tender, setTender] = useState(null); // null = loading, undefined = not found, object = loaded

  useEffect(() => {
    const foundTender = mockTenders.find((t) => t.tenderId === tenderId);
    // set undefined if not found so we can show "not found"
    setTender(foundTender ?? undefined);
  }, [tenderId]);

  if (tender === null) {
    return (
      <Container fluid className="my-4">
        <p>Loading tender details...</p>
      </Container>
    );
  }

  if (tender === undefined) {
    return (
      <Container fluid className="my-4">
        <p>Tender not found.</p>
        <Button variant="secondary" onClick={() => navigate("/tenders")}>
          Back to Tenders
        </Button>
      </Container>
    );
  }

  // helper fallbacks to map your mock shape to the LeadForm fields
  const dateValue = tender.submissionDeadline || tender.date || "";
  const customerName = tender.companyName || tender.customerName || "";
  const customerCity = tender.customerCity || tender.city || "";
  const phoneNo = tender.phoneNo || tender.contactPersonPhone || "";
  const email = tender.email || "";
  const notes = tender.remarks || tender.notes || "";
  const tenderDetails = tender.tenderDetails || tender.items || [];

  return (
    <Container fluid className="my-4">
      <Form onSubmit={(e) => e.preventDefault()}>
         <Button className=" mb-3 btn btn-primary"  style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }} onClick={() => navigate(-1)}>
                  <FaArrowLeft />
                </Button>
        <Row>
          <Col md="12">
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h4">Tender Details</Card.Title>
               
              </Card.Header>

              <Card.Body>
                {/* Lead / Tender Details */}
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Tender No.</Form.Label>
                      <Form.Control type="text" name="leadId" value={tender.tenderId} readOnly />
                    </Form.Group>
                  </Col>

                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" name="date" value={dateValue} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Customer Details */}
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Customer Name</Form.Label>
                      <Form.Control type="text" name="customerName" value={customerName} readOnly />
                    </Form.Group>
                  </Col>

                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" name="customerCity" value={customerCity} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Contact Details */}
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Phone No.</Form.Label>
                      <Form.Control type="tel" name="phoneNo" value={phoneNo} readOnly />
                    </Form.Group>
                  </Col>

                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={email} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Notes */}
                <Row>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Label>Notes</Form.Label>
                      <Form.Control as="textarea" rows={3} name="remarks" value={notes} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Tender Details card (same layout as LeadForm) */}
                <Col md="12">
                  <Card className="mb-4">
                    <Card.Header>
                      <Card.Title as="h4">Tender Details</Card.Title>
                    </Card.Header>

                    <Card.Body>
                      {tenderDetails.length > 0 ? (
                        tenderDetails.map((item, idx) => (
                          <Row key={item.id ?? idx} className="align-items-center mb-3">
                            <Col md="4">
                              <Form.Group>
                                <Form.Label>Name of Item</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={item.itemName || item.name || ""}
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col md="2">
                              <Form.Group>
                                <Form.Label>Unit</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={item.unit || ""}
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col md="3">
                              <Form.Group>
                                <Form.Label>Tender Fee (Rs.)</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={item.tenderFee ?? item.fee ?? ""}
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col md="2">
                              <Form.Group>
                                <Form.Label>EMD (Rs.)</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={item.emd ?? item.emdAmount ?? ""}
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            {/* keep layout consistent with LeadForm (no remove button shown) */}
                            <Col md="1" />
                          </Row>
                        ))
                      ) : (
                        <p>No tender items available.</p>
                      )}

                      {/* Add Item button kept for visual parity, but disabled in detail view */}
                     
                    </Card.Body>
                  </Card>
                </Col>

                {/* Actions — Save disabled, Cancel goes back */}
                {/* <Col md="12" className="d-flex justify-content-end gap-3 mb-4">
                  <Button
                    className="btn"
                    type="submit"
                    style={{ backgroundColor: "#ed3131", border: "none", height: "40px" }}
                    disabled
                  >
                    Save Tender
                  </Button>

                  <Button
                    className="btn me-2"
                    type="button"
                    onClick={() => navigate("/tenders")}
                    style={{ backgroundColor: "#adb5bd", border: "none", height: "40px" }}
                  >
                    Cancel
                  </Button>
                </Col> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
