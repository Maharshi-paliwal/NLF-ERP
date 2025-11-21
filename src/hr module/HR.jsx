// src/pages/HR.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaUsers,
  FaUserPlus,
  FaCalendarAlt,
  FaBell,
  FaBirthdayCake,
  FaClock,
  FaDollarSign,
  FaUserCheck,
  FaBriefcase,
  FaArrowLeft,
  FaEye,
 FaOpenid,
} from "react-icons/fa";

export default function HR() {
  const stats = [
    { title: "Total Employees", value: "248", icon: FaUsers, trend: "+12 from last month" },
    { title: "New Hires This Month", value: "8", icon: FaUserPlus, trend: "In onboarding" },
    { title: "Pending Leave Requests", value: "15", icon: FaCalendarAlt, trend: "Awaiting approval" },
  ];

  const notifications = [
    {
      title: "Pending Leave Approvals",
      count: 15,
      description: "5 urgent requests require immediate attention",
      icon: FaBell,
      variant: "danger",
    },
    {
      title: "Upcoming Birthdays",
      count: 7,
      description: "This week: Sarah, John, Mike, and 4 others",
      icon: FaBirthdayCake,
      variant: "info",
    },
    {
      title: "Time to Submit Timesheet",
      count: 3,
      description: "Deadline: End of day Friday",
      icon: FaClock,
      variant: "warning",
    },
  ];

  const modules = [
    { title: "Recruitment Process", description: "Manage job postings and candidates", icon: FaBriefcase, route: "/hr/recruitment" },
    { title: "Add/Onboard Employee", description: "New employee onboarding", icon: FaUserCheck, route: "/hr/add-employee" },
    { title: "Employee", description: "Employee records and profiles", icon: FaUsers, route: "/hr/employees" },
    { title: "Employee Claim", description: "Expense claims management", icon: FaDollarSign, route: "/hr/employee-claim" },
    { title: "Employee Attendance & Working Hours", description: "Track time and attendance", icon: FaClock, route: "/hr/attendance" },
    { title: "Leave", description: "Leave management system", icon: FaCalendarAlt, route: "/pendingleaves" },
  ];

  return (
    <Container fluid className="my-4">
      {/* Back Button */}
      {/* <Link to="/dashboard">
        <Button
          className="mb-3 btn btn-primary"
          style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
        >
          <FaArrowLeft /> Back
        </Button>
      </Link> */}

      <Row>
        {/* Header */}
        <Col md="12">
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header>
              <Card.Title as="h4" style={{ fontWeight: "600" }}>
                HR Dashboard
              </Card.Title>
              <p className="text-muted mb-0">Manage your workforce efficiently</p>
            </Card.Header>
          </Card>
        </Col>

        {/* Stats Section */}
        <Col md="12">
          <Card className="mb-4">
            <Card.Header>
              <Card.Title as="h4" style={{ fontWeight: "600" }}>
                Summary Overview
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Col md="4" key={index} className="mb-3">
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="fw-semibold text-muted mb-0">{stat.title}</h6>
                            <Icon className="text-primary" size={22} />
                          </div>
                          <h3 className="fw-bold mb-1">{stat.value}</h3>
                          <small className="text-muted">{stat.trend}</small>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Notifications Section */}
        <Col md="12">
          <Card className="mb-4">
            <Card.Header>
              <Card.Title as="h4" style={{ fontWeight: "600" }}>
                Notifications & Pending Actions
              </Card.Title>
              <p className="text-muted mb-0">Items requiring your attention</p>
            </Card.Header>
            <Card.Body>
              {notifications.map((note, index) => {
                const Icon = note.icon;
                const variantColor =
                  note.variant === "danger"
                    ? "#dc3545"
                    : note.variant === "warning"
                    ? "#ffc107"
                    : "#0d6efd";
                return (
                  <div
                    key={index}
                    className="d-flex align-items-start justify-content-between p-3 mb-3 rounded border"
                    style={{ backgroundColor: "rgba(248,249,250,0.8)" }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="p-2 rounded"
                        style={{ backgroundColor: `${variantColor}20` }}
                      >
                        <Icon size={20} color={variantColor} />
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-1">
                          {note.title}{" "}
                          <span
                            className="badge"
                            style={{
                              backgroundColor: variantColor,
                              color: "#fff",
                              fontSize: "0.7rem",
                            }}
                          >
                            {note.count}
                          </span>
                        </h6>
                        <p className="text-muted small mb-0">{note.description}</p>
                      </div>
                    </div>
                    <Button
                      as={Link}
                      to="/pendingleaves"
                      size="sm"
                      className="buttonEye"
                    >
                      <FaEye/>
                    </Button>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Col>

        {/* HR Modules Section */}
       <Col md="12">
  <Card className="mb-4">
    <Card.Header>
      <Card.Title as="h4" style={{ fontWeight: "600" }}>
        HR Modules
      </Card.Title>
      <p className="text-muted mb-0">All HR tools in one place</p>
    </Card.Header>

    <Card.Body>
      <Row>
        {modules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Col md={4} key={index} className="mb-3">
              <div
                className="d-flex align-items-start justify-content-between p-3 rounded border h-100"
                style={{
                  backgroundColor: "rgba(248,249,250,0.8)",
                  minHeight: "110px",
                }}
              >
                <div className="d-flex align-items-start gap-3">
                  <div
                    className="p-2 rounded bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                    style={{ width: "38px", height: "38px" }}
                  >
                    <Icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1">{module.title}</h6>
                    <p className="text-muted small mb-0">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center mt-3">
                  <Button
                    as={Link}
                    to={module.route}
                    size="sm"
                  variant="danger"
                  >
                  open
                  </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Card.Body>
  </Card>
</Col>

      </Row>
    </Container>
  );
}
