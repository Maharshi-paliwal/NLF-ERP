import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Row, Col, Form, Container, Button } from "react-bootstrap";
import { leads , officeBranches, Productchecklist} from "../data/mockdata";
import { FaArrowLeft } from "react-icons/fa";

const ViewLeads = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();

// const officeBranches = [
//   "Select Office Branch",
//   "Kolkata",
//   "Mumbai",
//   "Delhi",
//   "Hyderabad",
//   "Nagpur",
//   "Chennai",
//   "Bangalore",
//   "Pune",
//   "Ahmedabad"
// ];

// const Productchecklist = [
//   "ceiling/facade",
//   "roofing",
//   "furnishing",
//   "acoustics",
//   "Modular furniture",
// ];
// --- END DUMMY DATA ---

  // Determine if we're in "new lead" mode
  const isNew = projectName === "new";

  // Initialize form state
  const [formData, setFormData] = useState({
    projectName: "",
    architectName: "",
    clientName: "",
    contractor: "",

    department: "",
    salespersonName: "",
    stage: "",
    remarks: "",
    visitDate: "",
    nextVisitDate: "",
    additionalNotes: "",
    officeBranch: officeBranches[0] || "", 
    material: Productchecklist[0] || "",
  });

  // If editing existing lead, populate form
  useEffect(() => {
    if (!isNew) {
      const decodedName = decodeURIComponent(projectName);
      const lead = leads.find(
        (lead) => lead.projectName.toLowerCase() === decodedName.toLowerCase()
      );

      if (lead) {
      

        setFormData({
            ...lead, 
            officeBranch: lead.Officebranch || officeBranches[0] || "", // Map 'Officebranch' to 'officeBranch'
            material: lead.producttype || Productchecklist[0] || "", // Map 'product' to 'material'
        });
      } else {
        // Optional: redirect if not found
        navigate("/leadgeneration");
      }
    }
  }, [projectName, isNew, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const parseDateInput = (displayDate) => {
    if (!displayDate || displayDate === "—") return "";
    const [day, month, year] = displayDate.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: API call to save lead
    console.log("Saving lead:", formData);

    // For demo: add to mock data (optional)
    leads.push({ ...formData });

    // Redirect back
    navigate("/leadgeneration");
  };

  // If not new and lead not found (already handled in useEffect, but safe guard)
  if (!isNew && !leads.some(lead => 
    lead.projectName.toLowerCase() === decodeURIComponent(projectName)?.toLowerCase()
  ) && projectName !== "new") {
    return (
      <Container className="py-5 text-center">
        <h4>No lead found for "{decodeURIComponent(projectName)}"</h4>
        <Button as={Link} to="/leadgeneration" className="mt-3">
          <FaArrowLeft className="me-2" /> Back to Leads
        </Button>
      </Container>
    );
  }

  const isViewMode = !isNew;

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            {isViewMode ? "Lead Details" : "Add New Lead"}
          </h5>
          <Button as={Link} to="/leadgeneration" variant="outline-primary" size="sm">
            <FaArrowLeft className="me-2" />
            Back
          </Button>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Project Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    readOnly={isViewMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Architect Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="architectName"
                    value={formData.architectName}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </Form.Group>
              </Col>
            </Row>

              {/* ✅ Added Office Branch and Material dropdowns here */}
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Office Branch</Form.Label>
                              <Form.Select
                                name="officeBranch"
                                value={formData.officeBranch}
                                onChange={handleChange}
                                disabled={isViewMode}
                              >
                                {officeBranches.map((branch) => (
                                  <option key={branch} value={branch}>
                                    {branch}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Material</Form.Label>
                              <Form.Select
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                                disabled={isViewMode}
                              >
                                {Productchecklist.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contractor</Form.Label>
                  <Form.Control
                    type="text"
                    name="contractor"
                    value={formData.contractor}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Salesperson</Form.Label>
                  <Form.Control
                    type="text"
                    name="salespersonName"
                    value={formData.salespersonName}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Stage</Form.Label>
                  <Form.Select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    <option value="">Select...</option>
                    <option value="on submit">On Submit</option>
                    <option value="finalised">Finalised</option>
                    <option value="order lost">Order Lost</option>
                    <option value="follow up">Follow Up</option>
                  </Form.Select>
                 
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    readOnly={isViewMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Visit Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="visitDate"
                    value={parseDateInput(formatDate(formData.visitDate))}
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Next Visit</Form.Label>
                  <Form.Control
                    type="date"
                    name="nextVisitDate"
                    value={parseDateInput(formatDate(formData.nextVisitDate))}
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
               
                </Form.Group>
              </Col>
            </Row>

            {!isViewMode && (
              <div className="d-flex justify-content-end mt-4">
                <Button variant="primary" type="submit">
                  Save Lead
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewLeads;