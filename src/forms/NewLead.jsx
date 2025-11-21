// NewLead.jsx
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Container, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";

// --- API BASE URL ---
const API_BASE = "http://192.168.162.141/cyberathon_admin/index.php/Api";

// --- DUMMY DATA FOR DROPDOWNS ---
const officeBranches = [
  "Select Office Branch",
  "Kolkata",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Nagpur",
  "Chennai",
  "Bangalore",
  "Pune",
  "Ahmedabad",
];

const Productchecklist = [
  "ceiling/facade",
  "roofing",
  "furnishing",
  "acoustics",
  "Modular furniture",
];
// --- END DUMMY DATA ---

// Helper: convert yyyy-mm-dd (HTML) -> dd-mm-yyyy (API)
const toApiDate = (dateStr) => {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}-${mm}-${yyyy}`;
};

// Helper: convert dd-mm-yyyy (API) -> yyyy-mm-dd (HTML)
const fromApiDate = (apiDate) => {
  if (!apiDate) return "";
  const [dd, mm, yyyy] = apiDate.split("-");
  return `${yyyy}-${mm}-${dd}`;
};

const NewLead = () => {
  const { id } = useParams(); // if present => edit mode
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    architectName: "",
    clientName: "",
    email: "",
    contact: "",
    contractor: "",
    department: "",
    salespersonName: "",
    stage: "",
    remarks: "",
    visitDate: "",
    nextVisitDate: "",
    officeBranch: "",
    material: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ---- GET LEAD BY ID (EDIT MODE) ----
  useEffect(() => {
    const fetchLead = async () => {
      if (!id) return; // add mode, no fetch
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/get_new_lead_by_id`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (data.status && data.success === "1" && data.data) {
          const lead = data.data;
          setFormData({
            projectName: lead.project_name || "",
            architectName: lead.architech_name || "",
            clientName: lead.client_name || "",
            email: lead.email || "",
            contact: lead.contact || "", // only if API has contact; else keep ""
            contractor: lead.contractor || "",
            department: lead.department || "",
            salespersonName: lead.sales_person || "",
            stage: lead.stage || "",
            remarks: lead.remark || "",
            visitDate: fromApiDate(lead.visiting_date),
            nextVisitDate: fromApiDate(lead.nxt_visit_date),
            officeBranch: lead.branch || "",
            material: lead.material || "", // if backend doesn't have this, will stay empty
          });
        } else {
          alert(data.message || "Failed to load lead details.");
        }
      } catch (err) {
        console.error("Error fetching lead:", err);
        alert("Something went wrong while fetching the lead.");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Build payload for Add/Update API
  const buildPayload = () => {
    return {
      project_name: formData.projectName,
      architech_name: formData.architectName,
      client_name: formData.clientName,
      email: formData.email,
      branch: formData.officeBranch,
      contractor: formData.contractor,
      department: formData.department,
      sales_person: formData.salespersonName,
      stage: formData.stage,
      remark: formData.remarks,
      visiting_date: toApiDate(formData.visitDate),
      nxt_visit_date: toApiDate(formData.nextVisitDate),
      contact: formData.contact, // if your API supports it
      // material: formData.material, // uncomment if backend expects this
    };
  };

  // ---- ADD NEW LEAD ----
  const addNewLead = async () => {
    const payload = buildPayload();

    const res = await fetch(`${API_BASE}/add_New_lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  };

  // ---- UPDATE EXISTING LEAD ----
  const updateNewLead = async () => {
    const payload = {
      id,
      ...buildPayload(),
    };

    const res = await fetch(`${API_BASE}/update_new_lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = id ? await updateNewLead() : await addNewLead();

      if (data.status && data.success === "1") {
        alert(
          data.message ||
            (id ? "Lead updated successfully." : "Lead added successfully.")
        );
        navigate("/leadgeneration");
      } else {
        alert(data.message || "Operation failed.");
      }
    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Something went wrong while saving the lead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            {id ? "Edit Lead" : "Add New Lead"}
          </h5>
          <Button
            as={Link}
            to="/leadgeneration"
            variant="outline-primary"
            size="sm"
          >
            <FaArrowLeft className="me-2" />
            Back
          </Button>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <p>Loading lead details...</p>
          ) : (
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
                      required
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
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="number"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Branch + Material */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Branch</Form.Label>
                    <Form.Select
                      name="officeBranch"
                      value={formData.officeBranch}
                      onChange={handleChange}
                      required
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
                    <Form.Label>Product</Form.Label>
                    <Form.Select
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    >
                      <option value="">Select...</option>
                      <option value="submit">On Submit</option>
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
                      value={formData.visitDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Next Visit</Form.Label>
                    <Form.Control
                      type="date"
                      name="nextVisitDate"
                      value={formData.nextVisitDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-4">
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : id ? "Update Lead" : "Save Lead"}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewLead;
