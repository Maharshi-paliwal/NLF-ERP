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
import DatePicker from "react-datepicker";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

// Custom Input for DatePicker
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <Button
    variant="outline-secondary"
    onClick={onClick}
    ref={ref}
    className="d-flex align-items-center gap-2"
    style={{ width: "220px" }}
  >
    <BsCalendar3 size={16} />
    {value || "Pick a date"}
  </Button>
));

const AddAttendance = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      checkIn: "09:00",
      checkOut: "18:30",
      status: "present",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      checkIn: "08:45",
      checkOut: "19:00",
      status: "present",
    },
    {
      id: 3,
      name: "Michael Brown",
      department: "Sales",
      checkIn: "",
      checkOut: "",
      status: "absent",
    },
    {
      id: 4,
      name: "Emily Davis",
      department: "HR",
      checkIn: "",
      checkOut: "",
      status: "leave",
    },
    {
      id: 5,
      name: "David Wilson",
      department: "Finance",
      checkIn: "09:15",
      checkOut: "18:45",
      status: "present",
    },
  ]);

  const calculateOvertime = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const [inHour, inMin] = checkIn.split(":").map(Number);
    const [outHour, outMin] = checkOut.split(":").map(Number);
    const totalMinutes = outHour * 60 + outMin - (inHour * 60 + inMin);
    const totalHours = totalMinutes / 60;
    const overtime = Math.max(0, totalHours - 9);
    return overtime.toFixed(2);
  };

  const handleCheckInChange = (id, value) => {
    setAttendanceData((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, checkIn: value } : emp))
    );
  };

  const handleCheckOutChange = (id, value) => {
    setAttendanceData((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, checkOut: value } : emp))
    );
  };

  const handleStatusChange = (id, value) => {
    setAttendanceData((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: value } : emp))
    );
  };

  const handleSave = () => {
    // Save logic here
    console.log("Attendance saved for:", date, attendanceData);
    navigate("/attendance");
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="striped-tabled-with-hover">
            {/* Card Header — Matching Design.jsx */}
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
                    Add Employee Attendance
                  </Card.Title>
                </Col>

                {/* RIGHT: Back Button */}
                <Col className="d-flex justify-content-end">
                  {/* <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/attendance")}
                  >
                    Back
                  </Button> */}
                   <Form.Label className="fw-medium  me-2 mt-2"><strong>Select Date</strong></Form.Label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat="MMMM d, yyyy"
                />
                </Col>
              </Row>
            </Card.Header>

            {/* Card Body */}
            <Card.Body>
              {/* Date Picker Section */}
              <div className="mb-4">
               
              </div>

              {/* Attendance Table */}
              <div className="table-responsive mb-4">
                <Table striped hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Employee Name</th>
                      <th>Department</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Overtime Hrs.</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td className="fw-medium">{employee.name}</td>
                        <td>{employee.department}</td>
                        <td>
                          <Form.Control
                            type="time"
                            value={employee.checkIn}
                            onChange={(e) =>
                              handleCheckInChange(employee.id, e.target.value)
                            }
                            style={{ width: "140px" }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="time"
                            value={employee.checkOut}
                            onChange={(e) =>
                              handleCheckOutChange(employee.id, e.target.value)
                            }
                            style={{ width: "140px" }}
                          />
                        </td>
                        <td>
                          <span className=" badge bg-primary text-light "style={{width:"4vw"}}>
                            {calculateOvertime(employee.checkIn, employee.checkOut)}{" "}
                            hrs
                          </span>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            {["present", "absent", "leave"].map((status) => (
                              <Form.Check
                                key={status}
                                type="radio"
                                id={`${status}-${employee.id}`}
                                label={status.charAt(0).toUpperCase() + status.slice(1)}
                                name={`status-${employee.id}`}
                                checked={employee.status === status}
                                onChange={() => handleStatusChange(employee.id, status)}
                                className={`text-${
                                  status === "present"
                                    ? "success"
                                    : status === "absent"
                                    ? "danger"
                                    : "warning"
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-end gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/attendance")}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Attendance
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddAttendance;