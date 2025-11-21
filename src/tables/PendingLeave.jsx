//POVendor.jsx
import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { FaSearch, FaEye , FaPlus, FaReceipt} from "react-icons/fa";
import { Link } from "react-router-dom";
import { poVendor } from "../data/mockdata"; 

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function PendingLeave() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPOs = useMemo(() => {
    if (!searchTerm) return poVendor;

    const term = searchTerm.toLowerCase();
    return poVendor.filter((po) =>
      po.poId.toLowerCase().includes(term) ||
      po.vendorName.toLowerCase().includes(term) ||
      po.deliveryNumber?.toLowerCase().includes(term)
    );
  }, [searchTerm]);

   const getVariantForStage = (stage) => {
    switch (stage) {
      case "civil":
        return "warning";
      case "finalised":
        return "primary";
      case "submit":
        return "success";
      default:
        return "secondary";
    }
  };



  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header style={{ backgroundColor: "#fff", borderBottom: "none" }}>
              <Row className="align-items-center">
                <Col>
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    Filter Leave Requests
                  </Card.Title>
                </Col>

                <Col className="d-flex justify-content-end align-items-center gap-2">
                
                  <div className="position-relative">
                    
                    <Form.Control
                      type="text"
                      placeholder="Search PO, Vendor, Delivery No..."
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "15vw", paddingRight: "35px" }}
                    />

                    
                    <FaSearch
                      className="position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#999",
                      }}
                    />
                    
                   
                  </div>

                  {/* Optional: Add New PO Button (uncomment if needed later) */}
                   <Form.Select aria-label="Default select example" style={{width:"15vw"}}>
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
                  <Button
                    as={Link}
                    to="/newvendorpo"
                    className="btn btn-primary add-customer-btn"
                    style={{ width: "12vw" }}
                  >
                    <FaPlus size={14} className="me-1" /> Add Vendor PO
                  </Button>
               
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {/* <th>Dispatch Date</th>
                    <th>Delivery Method</th>
                    <th>Total (₹)</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
               
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}