import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Modal,
  Badge,
} from "react-bootstrap";
import { FaArrowLeft, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const employees = [
    {
      id: "1",
      employeeId: "EMP001",
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "+1 234 567 8900",
      designation: "Senior Developer",
      joinDate: "2023-01-15",
      performance: "Excellent",
    },
    {
      id: "2",
      employeeId: "EMP002",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      phone: "+1 234 567 8901",
      designation: "Project Manager",
      joinDate: "2022-06-20",
      performance: "Outstanding",
    },
    {
      id: "3",
      employeeId: "EMP003",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      phone: "+1 234 567 8902",
      designation: "Designer",
      joinDate: "2023-03-10",
      performance: "Good",
    },
    {
      id: "4",
      employeeId: "EMP004",
      name: "Sarah Williams",
      email: "sarah.williams@company.com",
      phone: "+1 234 567 8903",
      designation: "Developer",
      joinDate: "2023-08-05",
      performance: "Excellent",
    },
  ];

  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees;
    const term = searchQuery.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(term) ||
        emp.employeeId.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
    );
  }, [searchQuery]);

  const getPerformanceVariant = (performance) => {
    switch (performance) {
      case "Outstanding":
        return "success";
      case "Excellent":
        return "primary";
      case "Good":
        return "warning";
      default:
        return "secondary";
    }
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <Container fluid>
      <Button
                      variant="danger"
                      className="mb-3"
                      size="sm"
                      style={{ width: "36px", height: "36px", padding: 0 }}
                      onClick={() => navigate(-1)}
                    >
                      <FaArrowLeft size={16} />
                    </Button>
      <Row>
        <Col md="12">
          <Card className="striped-tabled-with-hover">
            <Card.Header
              style={{
                backgroundColor: "#fff",
                borderBottom: "none",
                paddingTop: "2rem",
              }}
            >
              <Row className="align-items-center">
                {/* LEFT: Title with back button */}
                <Col>
                  <div className="d-flex align-items-center gap-3">
                    
                    <Card.Title className="mb-0 mt-0" style={{ fontWeight: "700" }}>
                      Employee Management
                    </Card.Title>
                  </div>
                </Col>

                {/* RIGHT: Search */}
                <Col className="d-flex justify-content-end">
                  <div className="position-relative" style={{ width: "25vw" }}>
                    <Form.Control
                      type="text"
                      placeholder="Search employees..."
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
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive px-0">
              <Table striped hover className="mb-0">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Join Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => (
                      <tr key={employee.id}>
                        <td className="fw-medium">{index + 1}</td>
                        <td>{employee.employeeId}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.joinDate}</td>
                        <td className="ps-4">
                          <Button
                          className="buttonEye"
                          size="sm"
                            onClick={() => handleViewDetails(employee)}
                          >
                            <FaEye />
                            
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No employees found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        {selectedEmployee && (
          <>
            <Modal.Body>
              <Row className="g-4">
                <Col md={6}>
                  <small className="text-muted">Employee ID</small>
                  <p className="fw-semibold mb-0">{selectedEmployee.employeeId}</p>
                </Col>
                <Col md={6}>
                  <small className="text-muted">Full Name</small>
                  <p className="fw-semibold mb-0">{selectedEmployee.name}</p>
                </Col>
                <Col md={6}>
                  <small className="text-muted">Email</small>
                  <p className="fw-semibold mb-0">{selectedEmployee.email}</p>
                </Col>
                <Col md={6}>
                  <small className="text-muted">Phone</small>
                  <p className="fw-semibold mb-0">{selectedEmployee.phone}</p>
                </Col>
                <Col md={6}>
                  <small className="text-muted">Designation</small>
                  <p className="fw-semibold mb-0">{selectedEmployee.designation}</p>
                </Col>
                <Col md={6}>
                  <small className="text-muted">Join Date</small>
                  <p className="fw-semibold mb-0">{selectedEmployee.joinDate}</p>
                </Col>
                <Col xs={12}>
                  <small className="text-muted">Performance Metrics</small>
                  <div className="mt-1">
                    <Badge bg={getPerformanceVariant(selectedEmployee.performance)}>
                      {selectedEmployee.performance}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary">Edit</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Employees;