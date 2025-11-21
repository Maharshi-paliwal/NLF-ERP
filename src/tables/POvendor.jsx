// PoVendor.jsx
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
  FaPlus,
  FaReceipt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { poVendor, po } from "../data/mockdata";

const PoVendor = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter vendor POs based on search term
  const filteredPoVendors = useMemo(() => {
    if (!searchTerm) return poVendor;
    const term = searchTerm.toLowerCase();
    return poVendor.filter((po) =>
      (po.vendorName && po.vendorName.toLowerCase().includes(term)) ||
      (po.clientName && po.clientName.toLowerCase().includes(term)) ||
      (po.vendorPoId && po.vendorPoId.toLowerCase().includes(term)) ||
      (po.workOrderId && po.workOrderId.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  // Determine if a vendor PO is assigned (i.e., linked to a client PO and work order)
  const isAssigned = (po) => {
    return po.workOrderId != null && po.clientPoId != null && po.poStatus !== "draft";
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
                    Vendor Purchase Orders
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Search by Vendor, Client, WO ID..."
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

                  <Button
                    as={Link}
                    to=""
                    className="btn btn-primary add-customer-btn"
                 
                  >
                    <FaPlus size={14} className="me-1" /> Add Vendor
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Vendor PO ID</th>
                    <th>Vendor Name</th>
                    <th>Client / Project</th>
                    <th>Work Order ID</th>
                    {/* <th>Status</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPoVendors.length > 0 ? (
                    filteredPoVendors.map((po, index) => (
                      <tr key={po.vendorPoId || `draft-${index}`}>
                        <td>{index + 1}</td>
                        <td>{po.vendorPoId || "TBA"}</td>
                        <td>{po.vendorName}</td>
                        <td>{po.clientName || "Unassigned"}</td>
                        <td>{po.workOrderId || "— Pending —"}</td>
                        {/* <td>
                          <span
                            className={`badge ${
                              po.poStatus === "draft"
                                ? "bg-warning text-dark"
                                : po.poStatus === "initiated"
                                ? "bg-primary"
                                : po.poStatus === "delivered"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {po.poStatus || "Draft"}
                          </span>
                        </td> */}
                        <td>

                          {isAssigned(po) ? (
                            <Button
                              as={Link}
                              to={`/povendor/${po.vendorPoId}`}

                              className="buttonEye me-3"

                              title="Create Vendor PO"
                            >
                              <FaEye />
                            </Button>
                          ) : (
                            ""
                          )}

                          {isAssigned(po) ? (
                            <Button
                              as={Link}
                              to={`/annextureviewer/${po.workOrderId}`} variant="danger"
                              size="sm"
                              title="View Vendor PO Details"
                            >
                              <FaReceipt />
                            </Button>
                          ) : (
                            <Button
                              as={Link}
                              to="/annextureform/ "
                              // to={`/povendor/create?client=${encodeURIComponent(po.clientName || "")}&quotationId=${po.quotationId}`}
                              variant="danger ms-1"
                              size="sm"
                              title="Create Vendor PO"
                            >
                              <FaPlus /> create
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Vendor PO records found.
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

export default PoVendor;