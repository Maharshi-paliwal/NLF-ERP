//store.jsx
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
import { FaPlus, FaEye, FaSearch, FaStore , FaDownload} from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { workOrders } from "../data/mockdata";
import PDFVendorPO from "../components/PDFVendorPO.jsx";
import { poVendor } from "../data/mockdata"; // ✅ Import 

const LEAD_STAGE_OPTIONS = ["civil", "finalised", "submit"];

export default function Store() {
  const [searchTerm, setSearchTerm] = useState("");
    const [showPDFVendorPO, setShowPDFVendorPO] = useState(false);
      const [selectedVendorPOs, setSelectedVendorPOs] = useState([]); // Changed to array (multiple POs per WO)
    
  const location = useLocation(); // ✅ Get current location (including state)

  // Determine if this page was accessed from the Design section
  const viewContext = location.state?.viewContext; // Will be "design" if coming from Design menu

  // Filter work orders based on search term
  const filteredWorkOrders = useMemo(() => {
    if (!searchTerm) {
      return workOrders;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return workOrders.filter(
      (wo) =>
        wo.workOrderId.toLowerCase().includes(lowercasedSearchTerm) ||
        wo.customerName.toLowerCase().includes(lowercasedSearchTerm) ||
        wo.projectName.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm]);

  const handleShowPDFVendorPO = (workOrderId) => {
    // Find all Vendor POs for this Work Order
    const matchedPOs = poVendor.filter((po) => po.workOrderId === workOrderId);

    if (matchedPOs && matchedPOs.length > 0) {
      setSelectedVendorPOs(matchedPOs);
      setShowPDFVendorPO(true);
    } else {
      toast.error("No Vendor PO found for this Work Order");
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
                    Store
                  </Card.Title>
                </Col>

                <Col className="d-flex justify-content-end align-items-center gap-2">
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
                      style={{ right: "10px", top: "50%", transform: "translateY(-50%)", color: "#999" }}
                    />
                  </div>
                  {/* 
                  <Button
                    as={Link}
                    to="/workorderform"
                    className="btn btn-primary add-customer-btn"
                    style={{ width: "15vw" }}
                  >
                    <FaPlus size={14} className="me-1" /> Add Work Order
                  </Button> */}
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
                          to={`/storenewvendor`} variant="success"
                          size="sm"

                          className="me-4"
                          onClick={() => handleConvertToPO(round.quotationId, round.roundIdentifier)}
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                        >
                          Vendor PO
                        </Button>

                          <button
                                                  className="btn btn-sm btn-outline-dark text-danger me-3"
                                                  title="Preview & Download Vendor PO"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShowPDFVendorPO(workOrder.workOrderId);
                                                  }}
                                                >
                                                  <FaDownload size={15} />
                                                </button>

                        <Button
                          as={Link}
                          to={`/storesubpage/${workOrder.workOrderId}`}

                          className="buttonEye me-3"
                          style={{ background: "#ed3131" }}
                          title="View Work Order Details"
                        >
                          <FaStore />
                        </Button>

                        <Button
                          as={Link}
                          to={
                            viewContext === "design"
                              ? `/design/${storeworkOrder.workOrderId}` // Destination if viewContext is "design"
                              : `/storeworkorderform/${workOrder.workOrderId}` // Destination otherwise
                          }
                          state={{ viewContext: viewContext || "operations" }}
                          className="buttonEye"
                          title="View Work Order Details"
                        >
                          <FaEye />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredWorkOrders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Work Orders found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

          <PDFVendorPO
        show={showPDFVendorPO}
        onHide={() => {
          setShowPDFVendorPO(false);
          setSelectedVendorPOs([]);
        }}
        vendorPODataArray={selectedVendorPOs} // Pass array instead of single object
      />
    </Container>
  );
}