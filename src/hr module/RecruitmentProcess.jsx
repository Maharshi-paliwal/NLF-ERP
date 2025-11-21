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
  FaSearch,
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecruitmentProcess = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const jobs = [
    { id: "1", title: "Senior Software Engineer", department: "Engineering", location: "Remote", candidates: 12, status: "Active", postedDate: "2025-10-15" },
    { id: "2", title: "Product Manager", department: "Product", location: "New York", candidates: 8, status: "Active", postedDate: "2025-10-20" },
    { id: "3", title: "HR Manager", department: "Human Resources", location: "Chicago", candidates: 5, status: "Active", postedDate: "2025-10-25" },
    { id: "4", title: "Marketing Specialist", department: "Marketing", location: "Remote", candidates: 15, status: "Active", postedDate: "2025-10-28" },
    { id: "5", title: "Data Analyst", department: "Analytics", location: "San Francisco", candidates: 9, status: "Active", postedDate: "2025-11-01" },
  ];

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs;
    const term = searchQuery.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.department.toLowerCase().includes(term)
    );
  }, [searchQuery, jobs]);

  const handleBack = () => {
    navigate("/hr");
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
         <Button
                  className="mb-3 btn btn-primary"
                  style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
                  onClick={handleBack}
                >
                  <FaArrowLeft />
                </Button>
          {/* Stats Row */}
          <Row className="mb-4 g-3">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Subtitle className="text-muted mb-2">Open Positions</Card.Subtitle>
                    <Card.Title className="mb-0 fw-bold fs-4">{jobs.length}</Card.Title>
                  </div>
                  <FaBriefcase className="text-muted" size={24} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Subtitle className="text-muted mb-2">Candidates</Card.Subtitle>
                    <Card.Title className="mb-0 fw-bold fs-4">
                      {jobs.reduce((sum, job) => sum + job.candidates, 0)}
                    </Card.Title>
                  </div>
                  <FaUsers className="text-muted" size={24} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Subtitle className="text-muted mb-2">Interviews Scheduled</Card.Subtitle>
                    <Card.Title className="mb-0 fw-bold fs-4">24</Card.Title>
                  </div>
                  <FaCalendarAlt className="text-muted" size={24} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Main Table Card */}
          <Card className="striped-tabled-with-hover">
            <Card.Header className="border-0 py-3">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                {/* LEFT: Title with optional back button */}
                <div className="d-flex align-items-center gap-3">
                  {/* <Button
                    variant="light"
                    size="sm"
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "36px", height: "36px", padding: 0 }}
                    onClick={handleBack}
                  >
                 
                  </Button> */}
                  <Card.Title className="mb-0 fw-bold ">Recruitment Process</Card.Title>
                </div>

                {/* RIGHT: Search + Action Buttons */}
                <div className="d-flex flex-wrap align-items-center gap-2">
                  {/* Search Input with Icon */}
                  <div className="position-relative" style={{ width: "220px" }}>
                    <Form.Control
                      type="text"
                      placeholder="Search jobs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ps-4 pe-4 py-1"
                      style={{ fontSize: "0.875rem" }}
                    />
                    <FaSearch
                      className="position-absolute"
                      style={{
                        left: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#6c757d",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <Button variant="primary" size="sm">Create Job Opening</Button>
                  <Button variant="outline-secondary" size="sm">Hiring Pipeline</Button>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="table-responsive px-0">
              <Table striped hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "70px" }}>Sr. No.</th>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Candidates</th>
                    <th>Status</th>
                    <th>Posted Date</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <tr key={job.id}>
                        <td className="fw-medium">{index + 1}</td>
                        <td className="fw-semibold">{job.title}</td>
                        <td>{job.department}</td>
                        <td>{job.location}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <FaUsers size={14} className="text-muted" />
                            {job.candidates}
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-primary">{job.status}</span>
                        </td>
                        <td>{job.postedDate}</td>
                        <td className="text-center">
                          <Button size="sm" className=" buttonEye">
                            <FaEye size={14}  />
                           
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No job positions found.
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

export default RecruitmentProcess;