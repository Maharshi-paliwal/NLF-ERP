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
import { FaPlus, FaEye, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { workOrders } from "../data/mockdata";

// Map type to display title
const TITLE_MAP = {
  design: "Design",
  store: "Store",
  planning: "Planning",
};

// Button labels (used if button is ever shown for other types)
const BUTTON_TEXT_MAP = {
  design: "Add Design Order",
  store: "Add Store Order",
  planning: "Add Planning Order",
};

// ✅ Types where the "Add" button should be HIDDEN
const HIDE_ADD_BUTTON_TYPES = ["design", "store", "planning"];

export default function Ordertable({ type = "design" }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Validate and normalize type
  const validType = ["design", "store", "planning"].includes(type) ? type : "design";
  const pageTitle = TITLE_MAP[validType] || "Orders";
  const addButtonLabel = BUTTON_TEXT_MAP[validType] || "Add Work Order";

  // ✅ Determine if "Add" button should be shown
  const showAddButton = !HIDE_ADD_BUTTON_TYPES.includes(validType);

  // Filter work orders based on search term
  const filteredWorkOrders = useMemo(() => {
    if (!searchTerm) return workOrders;
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return workOrders.filter(
      (wo) =>
        wo.workOrderId.toLowerCase().includes(lowercasedSearchTerm) ||
        wo.customerName.toLowerCase().includes(lowercasedSearchTerm) ||
        wo.projectName.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm]);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header style={{ backgroundColor: "#fff", borderBottom: "none" }}>
              <Row className="align-items-center">
                <Col>
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    {pageTitle}
                  </Card.Title>
                </Col>

                <Col className="d-flex justify-content-end align-items-center gap-2">
                  {/* Search Bar */}
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Search W.O., Customer, Project..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "20vw", paddingRight: "35px" }}
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

                  {/* ✅ "Add Work Order" button — ONLY shown if type is NOT design/store/planning */}
                  {showAddButton && (
                    <Button
                      as={Link}
                      to="/workorderform"
                      className="btn btn-primary add-customer-btn"
                      style={{ width: "15vw" }}
                    >
                      <FaPlus size={14} className="me-1" /> {addButtonLabel}
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Work Order No</th>
                    <th>Client Name</th>
                    <th>Project Name</th>
                    <th>Architect</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkOrders.map((workOrder, index) => (
                    <tr key={workOrder.workOrderId}>
                      <td>{index + 1}</td>
                      <td>{workOrder.workOrderId}</td>
                      <td>{workOrder.customerName}</td>
                      <td>{workOrder.projectName}</td>
                      <td>{workOrder.architect || "N/A"}</td>
                      <td>
                        <Button
                          as={Link}
                          to={`/workorderform/${workOrder.workOrderId}`}
                          // ✅ Pass context so WorkOrderForm knows to hide financial fields
                          state={{ viewContext: "operations" }}
                          className="buttonEye"
                          title={`View ${pageTitle} Details`}
                        >
                          <FaEye />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredWorkOrders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No {pageTitle} orders found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}