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
  FaArrowLeft,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeClaim = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const claims = [
    {
      id: 1,
      type: "Travel Expense",
      submittedDate: "2024-01-15",
      price: "₹5,000",
      status: "Pending",
    },
    {
      id: 2,
      type: "Medical Reimbursement",
      submittedDate: "2024-01-10",
      price: "₹12,000",
      status: "Approved",
    },
    {
      id: 3,
      type: "Office Supplies",
      submittedDate: "2024-01-05",
      price: "₹2,500",
      status: "Rejected",
    },
  ];

  const filteredClaims = useMemo(() => {
    if (!searchQuery) return claims;
    const term = searchQuery.toLowerCase();
    return claims.filter((claim) => claim.type.toLowerCase().includes(term));
  }, [searchQuery]);

  const getStatusVariant = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  const handleBack = () => {
    navigate(-1); // or navigate("/hr") if preferred
  };

  return (
    <Container fluid>

      <Row>

        <Col md="12">
          <Button

            className="buttonEye me-3 mb-4"
            style={{ background: "#ed3131" }}
            title="View Work Order Details"
            onClick={handleBack}
          >
            <FaArrowLeft />
          </Button>
          <Card className="striped-tabled-with-hover">
            <Card.Header
              style={{
                backgroundColor: "#fff",
                borderBottom: "none",
                paddingTop: "2rem",
              }}
            >
              <Row className="align-items-center">
                {/* Left: Title with back button */}
                <Col>
                  <div className="d-flex align-items-center gap-3">
                  
                    <Card.Title className="mb-0 mt-0" style={{ fontWeight: "700" }}>
                      Employee Claims
                    </Card.Title>
                  </div>
                </Col>

                {/* Right: Search + Add Claim Button */}
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <div className="position-relative" style={{ width: "20vw" }}>
                    <Form.Control
                      type="text"
                      placeholder="Search claims..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ paddingRight: "35px" }}
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
                    className="buttonEye fw-bold"
                    onClick={() => navigate("/hr/new-claim")}
                    size="sm"
                  >
                    <FaPlus size={12} className="me-1" />
                    Add Claim
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive px-0">
              <Table striped hover className="mb-0">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Claim Type</th>
                    <th>Submitted Date</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim, index) => (
                      <tr key={claim.id}>
                        <td className="ps-4">{index + 1}</td>
                        <td className="fw-medium">{claim.type}</td>
                        <td>{claim.submittedDate}</td>
                        <td>{claim.price}</td>
                        <td>
                          <span className={`badge bg-${getStatusVariant(claim.status)}`}>
                            {claim.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No claims found matching your search.
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

export default EmployeeClaim;