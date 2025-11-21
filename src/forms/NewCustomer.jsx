// src/pages/NewCustomer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { quotations } from "../data/mockdata"; // adjust path if needed
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function NewCustomer() {
  const { id } = useParams(); // id from route for editing

  const [customerData, setCustomerData] = useState({
    companyType: "Company/Organisation",
    customerId: "",
    companyName: "",
    registrationNumber: "",
    taxId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    customerSource: "",
    assignedAccountant: "",
    aboutCustomer: "",
  });

  // Generate temporary Customer ID if new
  const generateCustomerId = () =>
    "CUST-" + Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    if (id) {
      const existingCustomer = quotations.find(
        (q) => q.customer.id === id
      )?.customer;

      if (existingCustomer) {
        setCustomerData((prev) => ({
          ...prev,
          companyName: existingCustomer.name || "",
          email: existingCustomer.email || "",
          mobile: existingCustomer.mobile || "",
          address: existingCustomer.address || "",
          companyType: existingCustomer.companyType || "Company/Organisation",
          customerId: existingCustomer.id || generateCustomerId(),
        }));
      } else {
        console.warn(`Customer not found with ID: ${id}`);
        setCustomerData((prev) => ({
          ...prev,
          customerId: generateCustomerId(),
        }));
      }
    } else {
      setCustomerData((prev) => ({ ...prev, customerId: generateCustomerId() }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer data submitted:", customerData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <Container fluid className="mt-3">
      <Form onSubmit={handleSubmit}>
        {/* Basic Details */}
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Basic Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="5">
                    <Form.Group className="mb-3">
                      <Form.Label>Company Type</Form.Label>
                      <Form.Select
                        name="companyType"
                        value={customerData.companyType}
                        onChange={handleChange}
                      >
                        <option value="Company/Organisation">Company/Organisation</option>
                        <option value="Government Agency">Government Agency</option>
                        <option value="Contractor">Contractor</option>
                        <option value="Individual">Individual</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group className="mb-3">
                      <Form.Label>Customer ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="customerId"
                        value={customerData.customerId}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Company/Organisation Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={customerData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Registration Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="registrationNumber"
                        value={customerData.registrationNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Tax ID/VAT Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="taxId"
                        value={customerData.taxId}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Primary Customer Details */}
        <Row className="mt-3">
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Primary Customer Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={customerData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={customerData.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={customerData.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="address"
                        value={customerData.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={customerData.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={customerData.country}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={customerData.postalCode}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Details */}
        <Row className="mt-3">
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Additional Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Customer Source</Form.Label>
                      <Form.Select
                        name="customerSource"
                        value={customerData.customerSource}
                        onChange={handleChange}
                      >
                        <option value="">Select source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Advertising">Advertising</option>
                        <option value="Cold Calls">Cold Calls</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Others">Others</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Assigned Accountant</Form.Label>
                      <Form.Select
                        name="assignedAccountant"
                        value={customerData.assignedAccountant}
                        onChange={handleChange}
                      >
                        <option value="">Select accountant</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Label>About Customer</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="aboutCustomer"
                        value={customerData.aboutCustomer}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

               <div className="d-flex justify-content-end">
     <Button className="btn" type="submit" style={{backgroundColor:"#C62828",border:"none"}}>
                  {id ? "Update" : "Save"}
                </Button>
               </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
