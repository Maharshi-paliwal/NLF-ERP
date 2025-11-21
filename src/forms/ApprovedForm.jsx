// src/pages/ApprovedForm.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { quotations as initialQuotations } from "../data/mockdata";
import { useParams, useNavigate } from "react-router-dom"; 
import { FaArrowLeft } from "react-icons/fa";

// Utility to find the approved round
const getApprovedQuote = (id) => {
    const quote = initialQuotations.find(q => q.quotationId === id);
    if (!quote) return null;

    const latestRound = [...quote.rounds].sort(
      (a, b) => parseInt(b.round.substring(1)) - parseInt(a.round.substring(1))
    )[0];

    if (latestRound && latestRound.status.toLowerCase() === "approved") {
      const terms = latestRound.commercialTerms 
        ? latestRound.commercialTerms 
        : "30-day credit, 5% advance"; 
      
      return {
        ...quote,
        latestRound: latestRound,
        commercialTerms: terms, 
        items: latestRound.items || [],
        additionalDetails: latestRound.additionalDetails || [],
      };
    }
    return null;
};

// Utility function to safely display commercial terms
const formatCommercialTerms = (terms) => {
    if (!terms) return "N/A";
    
    if (typeof terms === 'object' && terms !== null && !Array.isArray(terms)) {
      return (
        <div>
          {Object.entries(terms).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong>
              <div style={{ marginLeft: '10px' }}>{value}</div>
            </div>
          ))}
        </div>
      );
    }

    return terms;
};

const ApprovedForm = () => {
    const { quotationId, section } = useParams(); 
    const navigate = useNavigate();
    
    const [quoteDetails, setQuoteDetails] = useState(null);
    
    useEffect(() => {
        const details = getApprovedQuote(quotationId);
        setQuoteDetails(details);
    }, [quotationId]);

    if (!section || !quoteDetails) {
        return (
            <Container className="p-5 text-center">
                <p>Loading or Approved Quote not found for ID: {quotationId || 'N/A'} in section: {section || 'N/A'}</p>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Container>
        );
    }

    const isFinancialSection = section === "accounts";
    const { latestRound, customer, commercialTerms, items, additionalDetails } = quoteDetails;
    const { amount, quantity } = latestRound;

    // Calculate totals
    const basicAmount = items.reduce((acc, item) => acc + (item.qty * item.unitPrice || 0), 0);
    const additionalAmount = additionalDetails.reduce((acc, item) => acc + (item.qty * item.unitPrice || 0), 0);
    const subtotal = basicAmount + additionalAmount;
    const gst = amount ? amount - subtotal : 0;
    const grandTotal = amount || subtotal + gst;

    return (
        <Container fluid className="my-4">
            {/* Back Button */}
            <Button 
                className="mb-3 btn btn-primary" 
                style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }} 
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft />
            </Button>

            <Row>
                {/* Card 1: Order Details */}
                <Col md="12">
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title as="h4">
                                Order Details
                              
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md="6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Quote No.</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={quoteDetails.quotationId}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={latestRound.date}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={customer.name}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={customer.address.split(',').slice(-2, -1).join(',').trim()}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 2: Items & Installation Details Combined */}
                <Col md="12">
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title as="h4">Item Description</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {/* Items Table */}
                            {items.map((item, index) => (
                                <Row key={index} className="align-items-center mb-3">
                                    <Col md="5">
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={1}
                                                value={item.description}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md="1">
                                        <Form.Group>
                                            <Form.Label>Unit</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={item.unit || "N/A"}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md="2">
                                        <Form.Group>
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={item.qty}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    {isFinancialSection && (
                                        <>
                                            <Col md="2">
                                                <Form.Group>
                                                    <Form.Label>Rate</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={item.unitPrice}
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md="2">
                                                <Form.Group>
                                                    <Form.Label>Amount</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={item.qty * item.unitPrice}
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </>
                                    )}
                                </Row>
                            ))}
                        </Card.Body>

                        {/* Installation Details Section */}
                        <Card.Header>
                            <Card.Title as="h4">Installation Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {additionalDetails.length > 0 ? (
                                additionalDetails.map((item, index) => (
                                    <Row key={index} className="align-items-center mb-3">
                                        <Col md="5">
                                            <Form.Group>
                                                <Form.Label>Installation</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={1}
                                                    value={item.description}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="1">
                                            <Form.Group>
                                                <Form.Label>Unit</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={item.unit || "N/A"}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="2">
                                            <Form.Group>
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={item.qty}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                        {isFinancialSection && (
                                            <>
                                                <Col md="2">
                                                    <Form.Group>
                                                        <Form.Label>Rate</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={item.unitPrice}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md="2">
                                                    <Form.Group>
                                                        <Form.Label>Amount</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={item.qty * item.unitPrice}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </>
                                        )}
                                    </Row>
                                ))
                            ) : (
                                <p className="text-center text-muted fst-italic">No installation/additional items available.</p>
                            )}

                            {/* Totals Card - Only for Accounts Section */}
                            {isFinancialSection && (
                                <Col md="12">
                                    <div className="d-flex justify-content-end">
                                        <Card style={{ width: "20rem" }}>
                                            <Card.Body>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <strong>Basic Amount:</strong>
                                                    <span>₹{basicAmount.toLocaleString("en-IN")}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <strong>GST (18%):</strong>
                                                    <span>₹{gst.toLocaleString("en-IN")}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h4>Total:</h4>
                                                    <h6>₹{grandTotal.toLocaleString("en-IN")}</h6>
                                                </div>
                                                <div className="d-flex justify-content-end mt-5">
                                                    <Button 
                                                        className="btn" 
                                                        type="button"
                                                        style={{ backgroundColor: "#ed3131", border: "none", height: "40px" }}
                                                        onClick={() => alert(`Proceeding to next step for ${section.toUpperCase()}...`)}
                                                    >
                                                        Proceed to next step
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Col>
                            )}

                            {/* Commercial Terms - Only for Accounts Section */}
                          
                            {/* Proceed Button for Non-Financial Sections */}
                          
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ApprovedForm;