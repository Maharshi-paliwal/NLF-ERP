import React, { useState } from "react";
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
  BsPeopleFill,
  BsCheckCircleFill,
  BsXCircleFill,
  BsClockFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("january");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const stats = [
    { title: "Total Employees", value: "45", icon: BsPeopleFill, variant: "primary" },
    { title: "Total Present Days", value: "892", icon: BsCheckCircleFill, variant: "success" },
    { title: "Total Absent", value: "23", icon: BsXCircleFill, variant: "danger" },
    { title: "Total Overtime", value: "156 hrs", icon: BsClockFill, variant: "warning" },
  ];

  const attendanceData = [
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      totalDays: 22,
      present: 20,
      absent: 1,
      leave: 1,
      regularHrs: 160,
      overtimeHrs: 8,
      status: "Active"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      totalDays: 22,
      present: 22,
      absent: 0,
      leave: 0,
      regularHrs: 176,
      overtimeHrs: 12,
      status: "Active"
    },
    {
      id: 3,
      name: "Michael Brown",
      department: "Sales",
      totalDays: 22,
      present: 19,
      absent: 2,
      leave: 1,
      regularHrs: 152,
      overtimeHrs: 4,
      status: "Active"
    },
    {
      id: 4,
      name: "Emily Davis",
      department: "HR",
      totalDays: 22,
      present: 21,
      absent: 0,
      leave: 1,
      regularHrs: 168,
      overtimeHrs: 6,
      status: "Active"
    },
  ];

  const months = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "hr", label: "HR" },
    { value: "finance", label: "Finance" },
  ];

  return (
    <Container fluid>
      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted mb-1 small">{stat.title}</p>
                      <h2 className="fw-bold mb-0">{stat.value}</h2>
                    </div>
                    <div className={`text-${stat.variant}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Main Table Card — Styled like Design.jsx */}
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
                {/* LEFT: Title */}
                <Col>
                  <Card.Title className="mb-0 mt-0" style={{ fontWeight: "700" }}>
                    Employee Attendance & Working Hours
                  </Card.Title>
                </Col>

                {/* RIGHT: Filters + Add Button */}
                <Col className="d-flex justify-content-end align-items-center gap-2 flex-wrap">
                  <Form.Select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    style={{ width: "140px", fontSize: "0.875rem" }}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    style={{ width: "160px", fontSize: "0.875rem" }}
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </Form.Select>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/hr/add-attendance")}
                  >
                    Add Attendance
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive px-0">
              <Table striped hover className="mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>Sr.</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Total Days</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Leave</th>
                    <th>Regular Hrs.</th>
                    <th>Overtime Hrs.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.length > 0 ? (
                    attendanceData.map((record) => (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td className="fw-medium">{record.name}</td>
                        <td>{record.department}</td>
                        <td>{record.totalDays}</td>
                        <td>{record.present}</td>
                        <td>{record.absent}</td>
                        <td>{record.leave}</td>
                        <td>{record.regularHrs}</td>
                        <td>{record.overtimeHrs}</td>
                        <td>
                          <span className="badge bg-success">{record.status}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        No attendance records found.
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

export default Attendance;