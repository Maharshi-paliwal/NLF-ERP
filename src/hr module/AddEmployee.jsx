import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    designation: "",
    experienceLevel: "",
    joiningDate: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/hr/employees"); // or wherever you want to go
    }, 2000);
  };

  const handleBack = () => {
    navigate(-1); // or navigate("/hr/employees")
  };

  return (
    <Container className="py-4">
       <Button
      
                  className="buttonEye me-3 mb-4"
                  style={{ background: "#ed3131" }}
                  title="View Work Order Details"
                  onClick={handleBack}
                >
                  <ArrowLeft />
                </Button>
      <Card className="shadow-sm border-0">
        {/* Card Header: Title + Back Button */}
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Add/Onboard Employee</h5>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleBack}
          >
            <ArrowLeft size={14} className="me-2" />
            Back
          </Button>
        </Card.Header>

        {/* Card Body: Form */}
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employee ID *</Form.Label>
                  <Form.Control
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mobile No. *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Birth *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Gender *</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Designation *</Form.Label>
                  <Form.Select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select designation</option>
                    <option value="manager">Manager</option>
                    <option value="senior-developer">Senior Developer</option>
                    <option value="developer">Developer</option>
                    <option value="junior-developer">Junior Developer</option>
                    <option value="designer">Designer</option>
                    <option value="hr">HR</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Experience Level *</Form.Label>
                  <Form.Select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5-10 years)</option>
                    <option value="expert">Expert Level (10+ years)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Joining Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Documents</Form.Label>
                  <div>
                    <Button className="w-100 d-flex align-items-center justify-content-center gap-2 buttonEye" style={{color:"white", }}>
                      <Upload size={16} />
                      Upload Documents
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-4">
              <Button variant="outline-secondary" onClick={handleBack}>
                Cancel
              </Button>
              <Button variant="danger" type="submit">
                Add Employee
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Simple Toast Notification (Bootstrap-styled) */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1050,
          }}
        >
          <div className="toast show" role="alert" aria-live="assertive">
            <div className="toast-header">
              <strong className="me-auto">Success</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">
              New employee has been successfully onboarded.
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AddEmployee;