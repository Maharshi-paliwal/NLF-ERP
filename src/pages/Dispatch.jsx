// src/pages/Dispatch.jsx
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
import {
  FaEye,
  FaSearch,
  FaPlus
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { shipments } from "../data/mockdata"; // ✅ Import shipments

const Dispatch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter shipments based on search term
  const filteredShipments = useMemo(() => {
    if (!searchTerm) return shipments;
    const term = searchTerm.toLowerCase();
    return shipments.filter((shipment) =>
      (shipment.workOrderId && shipment.workOrderId.toLowerCase().includes(term)) ||
      (shipment.vendorName && shipment.vendorName.toLowerCase().includes(term)) ||
      (shipment.clientName && shipment.clientName.toLowerCase().includes(term)) ||
      (shipment.sourceDetails?.name && shipment.sourceDetails.name.toLowerCase().includes(term)) ||
      (shipment.destinationDetails?.name && shipment.destinationDetails.name.toLowerCase().includes(term)) ||
      (shipment.shipmentId && shipment.shipmentId.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  // Helper to get badge color based on status
  const getShipmentStatusBadge = (status) => {
    const statusMap = {
      "ordered": "bg-secondary",
      "dispatched": "bg-info",
      "on-route": "bg-primary",
      "delivered": "bg-warning",
      "received": "bg-success",
      "verified": "bg-success",
      "completed": "bg-success",
      "delayed": "bg-danger",
      "damaged": "bg-danger"
    };
    return statusMap[status] || "bg-light text-dark";
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
                    Dispatch & Shipments
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Search by WO ID, Vendor PO, Client, Source, Destination..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "25vw", paddingRight: "35px" }}
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
                  <Button
                    as={Link}
                    to="/dispatchform"
                    className="btn btn-primary add-customer-btn"
                    style={{ width: "10vw" }}
                  >
                    <FaPlus size={14} className="me-1" /> Add Shipment
                  </Button>


                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    {/* <th>Shipment ID</th>
                    <th>Work Order ID</th> */}
                    <th>Vendor Name</th>
                    <th>Client</th>
                    <th>Project</th>
                    <th>From </th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((shipment, index) => (
                      <tr key={shipment.shipmentId}>
                        <td>{index + 1}</td>
                        {/* <td>{shipment.shipmentId}</td>
                        <td>{shipment.workOrderId || "— N/A —"}</td> */}
                        <td>{shipment.vendorName || "— N/A —"}</td>
                        <td>
                          <div>
                            {shipment.clientName || "N/A"}

                          </div>
                        </td>
                        <td>
                          {shipment.projectName || "—"}
                        </td>
                        <td>
                          <div>
                            {shipment.sourceDetails?.name || "Source"}


                          </div>
                        </td>
                        <td>
                          {shipment.destinationDetails?.name || "Destination"}
                        </td>
                        <td>
                          <span className={`badge w-100 pe-1 ps-1 ${getShipmentStatusBadge(shipment.shipmentStatus)}`}>
                            {shipment.shipmentStatus.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td>
                          {/* <Button
                            as={Link}
                            to={`/dispatchform/view/${shipment.shipmentId}`}
                            className="buttonEye ms-3"
                           
                            title="View Shipment Details"
                          >
                            <FaEye />
                          </Button> */}

                          {/* <Link to={`/dispatchform/${shipment.shipmentId}`} state={{ mode: 'view' }}>
  <Button>View</Button>
</Link> */}

                          <Link to={`/dispatchform/view/${shipment.shipmentId}`} state={{ mode: 'view' }}>
                            <Button className="buttonEye ms-3">
                              <FaEye />

                            </Button>
                          </Link>


                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No shipment records found.
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
};

export default Dispatch;