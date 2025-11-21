// src/pages/TendersAll.jsx

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa"; // Removed FaPlusCircle as it's not used in this file
import { useNavigate } from "react-router-dom";
import { tenders as mockTenders } from "../../data/mockdata";

export default function TendersAll() {
  const navigate = useNavigate();
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 10;

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setLoading(true);
        toast.loading("Fetching tenders...", { id: "fetch" });
        // In a real app, this is where you'd fetch from an API
        setTenders(mockTenders);
        toast.success("Tenders loaded successfully!", { id: "fetch" });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load tenders", { id: "fetch" });
      } finally {
        setLoading(false);
      }
    };
    fetchTenders();
  }, []);

  // Use the useNavigate hook to programmatically navigate
  const handleViewTender = (tenderId) => {
    // Navigate to the detail page for the specific tender
    navigate(`/tenders/${tenderId}`);
  };

  const filteredTenders = tenders.filter((t) => {
    const term = searchTerm.toLowerCase();
    const valuesToSearch = `${t.tenderId} ${t.companyName} ${t.contactPerson} ${t.status} ${t.budget} ${t.tenderFee} ${t.emd}`.toLowerCase();
    return valuesToSearch.includes(term);
  });

  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(
    indexOfFirstTender,
    indexOfLastTender
  );
  const totalPages = Math.ceil(filteredTenders.length / tendersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header
              style={{
                backgroundColor: "#fff",
                marginBottom: "2rem",
                borderBottom: "none",
              }}
            >
              <Row className="align-items-center">
                <Col className="d-flex align-items-center">
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    All Tenders
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Search by ID, Company, or Contact..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="custom-searchbar-input nav-search"
                    style={{ width: "20vw" }}
                  />
                  <Button
                    as={Link}
                    to="/lead-form"
                    className="add-customer-btn"
                  >
                    + Create Tender
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive d-flex justify-content-center align-items-center">
              <div className="table-responsive">
              <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th>Sr. No.</th> {/* ✅ New column */}
      <th>Company Name</th>
      <th>Date</th>
      <th>Tender Fee (Rs.)</th>
      <th>EMD (Rs.)</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="9" className="text-center p-4">
          Loading tenders...
        </td>
      </tr>
    ) : currentTenders.length > 0 ? (
      currentTenders.map((tender, index) => (
        <tr key={tender.tenderId}>
          {/* ✅ Serial number calculation based on pagination */}
          <td data-label="Sr. No.">
            {indexOfFirstTender + index + 1}
          </td>
          <td data-label="Company Name">{tender.companyName}</td>
          <td data-label="Submission Deadline">{tender.submissionDeadline}</td>
          <td data-label="Tender Fee">₹{tender.tenderFee.toLocaleString()}</td>
          <td data-label="EMD">₹{tender.emd.toLocaleString()}</td>
          <td data-label="Status">
            <span
              className={`badge ${
                tender.status === "open" ? "bg-success" : "bg-custom-red"
              }`}
            >
              {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
            </span>
          </td>
          <td data-label="Actions">
            <div className="table-actions d-flex gap-2">
              <button
                className="buttonEye"
                style={{ color: "white" }}
                onClick={() => handleViewTender(tender.tenderId)}
              >
                <FaEye size={15} />
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="9" className="text-center p-4">
          No tenders found.
        </td>
      </tr>
    )}
  </tbody>
</table>
              </div>
            </Card.Body>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center p-3">
                <Pagination>
                  <Pagination.First
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}