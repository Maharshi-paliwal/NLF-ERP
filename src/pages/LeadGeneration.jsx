// import React, { useState, useMemo } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Pagination,
//   Table,
//   Modal,
//   Dropdown,
// } from "react-bootstrap";
// import { FaPlus, FaEye } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { leads } from "../data/mockdata"; // ✅ adjust path if needed

// const LEAD_STAGE_OPTIONS = ["civil", "finalised", "submit"];

// export default function LeadGeneration() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSalesperson, setSelectedSalesperson] = useState("all");
//   const [startDate, setStartDate] = useState(null);
//   const [VisitDate, setVisitDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [timeFilter, setTimeFilter] = useState("all"); // 'all' | 'monthly' | 'quarterly' | 'yearly'
//   const [currentPage, setCurrentPage] = useState(1);
//   const [show, setShow] = useState(false);
//   const [leadStages, setLeadStages] = useState({});

//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   const uniqueSalespersons = [...new Set(leads.map((l) => l.salespersonName))];

//   // ✅ Helper: Get start/end of current period
//   const getPeriodRange = (period) => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth(); // 0-indexed

//     switch (period) {
//       case "monthly":
//         return {
//           start: new Date(year, month, 1),
//           end: new Date(year, month + 1, 0, 23, 59, 59),
//         };
//       case "quarterly":
//         const quarter = Math.floor(month / 3);
//         const qStartMonth = quarter * 3;
//         const qEndMonth = qStartMonth + 2;
//         return {
//           start: new Date(year, qStartMonth, 1),
//           end: new Date(year, qEndMonth + 1, 0, 23, 59, 59),
//         };
//       case "yearly":
//         return {
//           start: new Date(year, 0, 1),
//           end: new Date(year + 1, 0, 0, 23, 59, 59),
//         };
//       default:
//         return null;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     const [year, month, day] = dateString.split("-");
//     return `${day}-${month}-${year}`;
//   };

//   const flattenedRows = useMemo(() => {
//     return leads.map((lead) => ({
//       key: lead.leadId,
//       ...lead,
//       actionType: lead.stage === "civil" ? "create" : "view",
//     }));
//   }, []);

//   const filteredData = useMemo(() => {
//     const periodRange = timeFilter !== "all" ? getPeriodRange(timeFilter) : null;

//     return flattenedRows.filter((item) => {
//       // Salesperson filter
//       if (
//         selectedSalesperson !== "all" &&
//         item.salespersonName !== selectedSalesperson
//       )
//         return false;

//       // Custom date range filter
//       if (startDate || endDate) {
//         const itemDate = new Date(item.visitDate);
//         const start = startDate
//           ? new Date(
//               startDate.getFullYear(),
//               startDate.getMonth(),
//               startDate.getDate()
//             )
//           : null;
//         const end = endDate
//           ? new Date(
//               endDate.getFullYear(),
//               endDate.getMonth(),
//               endDate.getDate(),
//               23,
//               59,
//               59
//             )
//           : null;
//         if (start && itemDate < start) return false;
//         if (end && itemDate > end) return false;
//       }

//       // Time-based filter (monthly/quarterly/yearly)
//       if (periodRange) {
//         const itemDate = new Date(item.visitDate);
//         if (itemDate < periodRange.start || itemDate > periodRange.end) {
//           return false;
//         }
//       }

//       // Search term
//       const term = searchTerm.toLowerCase();
//       const searchStr = `${item.projectName} ${item.ClientName} ${item.contractor} ${item.department} ${item.stage} ${item.salespersonName}`.toLowerCase();
//       return searchStr.includes(term);
//     });
//   }, [flattenedRows, searchTerm, selectedSalesperson, startDate, endDate, timeFilter]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const handleCreateQuotation = (leadId) => {
//     navigate(`/new-quotation/from-lead/${leadId}`);
//     toast.success(`Redirecting to create quotation for ${leadId}`);
//   };

//   const handleViewLead = (projectName) => {
//     navigate(`/view-leads/${encodeURIComponent(projectName)}`);
//   };

//   const handleStageChange = (leadId, newStage) => {
//     setLeadStages((prev) => ({ ...prev, [leadId]: newStage }));
//     toast.success(`Lead ${leadId} status updated to: ${newStage}`);
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   // ✅ Color helper for dropdown toggle
//   const getVariantForStage = (stage) => {
//     switch (stage) {
//       case "civil":
//         return "warning";
//       case "finalised":
//         return "primary";
//       case "submit":
//         return "success";
//       default:
//         return "secondary";
//     }
//   };

//   const renderRow = (item, index) => {
//     const selectedStage = leadStages[item.leadId] || item.stage || "open";
//     return (
//       <tr key={item.key}>
//         <td>{indexOfFirstItem + index + 1}</td>
//         <td>{item.projectName}</td>
//         <td>{item.architectName}</td>
//         <td>{item.contractor}</td>
//         <td>{item.department}</td>

//         {/* ✅ Stage dropdown with bg colors */}
//         <td>
//           <Dropdown
//             onSelect={(newStage) => handleStageChange(item.leadId, newStage)}
//           >
//             <Dropdown.Toggle
//               variant={getVariantForStage(selectedStage)}
//               size="sm"
//               style={{ textTransform: "capitalize", width: "100px" }}
//             >
//               {selectedStage}
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//               <Dropdown.Item eventKey="civil" className="fw-semibold">
//                 Civil
//               </Dropdown.Item>
//               <Dropdown.Item eventKey="finalised" className="fw-semibold">
//                 Finalised
//               </Dropdown.Item>
//               <Dropdown.Item eventKey="submit" className="fw-semibold">
//                 Submit
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </td>

//         <td>{formatDate(item.visitDate)}</td>
//         {/* MODIFIED: Added textAlign: "center" to the 'Next Visit' data cell */}
//         <td style={{ textAlign: "center" }}>
//           <Button className="add-customer-btn btn-sm" onClick={handleShow}>
//             <FaPlus />
//           </Button>
//         </td>
//         {/* MODIFIED: Removed textAlign: "center" from the 'Action' data cell as it wasn't requested */}
//         <td>
//           <Button
//             className="buttonEye"
//             size="sm"
//             onClick={() => handleViewLead(item.projectName)}
//             title="View Lead"
//           >
//             <FaEye />
//           </Button>
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <Container fluid>
//       <Row>
//         <Col md="12">
//           <Card className="strpied-tabled-with-hover">
//             <Card.Header style={{ backgroundColor: "#fff", borderBottom: "none" }}>
//               <Row className="align-items-center">
//                 <Col>
//                   <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
//                     Lead Generation
//                   </Card.Title>
//                 </Col>

//                 <Col className="d-flex justify-content-end align-items-center gap-2">
//                   <Form.Select
//                     value={selectedSalesperson}
//                     onChange={(e) => {
//                       setSelectedSalesperson(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     style={{ width: "175px" }}
//                   >
//                     <option value="all">All Salespersons</option>
//                     {uniqueSalespersons.map((name) => (
//                       <option key={name} value={name}>
//                         {name}
//                       </option>
//                     ))}
//                   </Form.Select>

//                   {/* ✅ New Time Filter Dropdown */}
//                   <Form.Select
//                     value={timeFilter}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setTimeFilter(value);
//                       if (value !== "all") {
//                         setStartDate(null);
//                         setEndDate(null);
//                       }
//                       setCurrentPage(1);
//                     }}
//                     style={{ width: "100px" }}
//                   >
//                     <option value="all">Search by</option>
//                     <option value="monthly"> Month</option>
//                     <option value="quarterly"> Quarter</option>
//                     <option value="yearly"> Year</option>
//                   </Form.Select>

//                   <div
//                     className="d-flex align-items-center gap-2"
//                     style={{ width: "240px" }}
//                   >
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => {
//                         setStartDate(date);
//                         setTimeFilter("all"); // reset time filter when custom date is used
//                         setCurrentPage(1);
//                       }}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       placeholderText="Start Date"
//                       className="form-control"
//                       dateFormat="dd-MM-yyyy"
//                       isClearable
//                     />
//                     <span>to</span>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => {
//                         setEndDate(date);
//                         setTimeFilter("all"); // reset time filter
//                         setCurrentPage(1);
//                       }}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       placeholderText="End Date"
//                       className="form-control"
//                       dateFormat="dd-MM-yyyy"
//                       isClearable
//                     />
//                   </div>

//                   <Form.Control
//                     type="text"
//                     placeholder="Search by Project, architect, or Department..."
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     style={{ width: "20vw" }}
//                   />

//                   <Button
//                     as={Link}
//                     to="/newlead"
//                     className="btn btn-primary add-customer-btn"
//                     style={{ width: "10vw" }}
//                   >
//                     <FaPlus size={14} className="me-1" /> Add Lead
//                   </Button>
//                 </Col>
//               </Row>
//             </Card.Header>

//             <Card.Body className="table-full-width table-responsive" >
//               <Table striped hover>
//                 <thead>
//                   <tr>
//                     <th>Sr. No.</th>
//                     <th>Project Name</th>
//                     <th>Architect</th>
//                     <th>Contractor</th>
//                     <th>Department</th>
//                     <th>Stage</th>
//                     <th>Visit Date</th>
//                     {/* MODIFIED: Removed inline style on 'Next Visit' header and added a class for styling in a more standard way */}
//                     <th className="text-center">Next Visit</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.length > 0 ? (
//                     currentItems.map(renderRow)
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="text-center p-4">
//                         No leads found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </Card.Body>

//             <Modal show={show} onHide={handleClose}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Add next visit date</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <DatePicker
//                   selected={VisitDate}
//                   onChange={(date) => {
//                     setVisitDate(date);
//                   }}
//                   placeholderText="Next Visit Date"
//                   className="form-control"
//                   dateFormat="dd-MM-yyyy"
//                   isClearable
//                 />
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button className="add-customer-btn" onClick={handleClose}>
//                   Save Changes
//                 </Button>
//                 <Button variant="secondary" onClick={handleClose}>
//                   Close
//                 </Button>
//               </Modal.Footer>
//             </Modal>

//             {totalPages > 1 && (
//               <div className="d-flex justify-content-center p-3">
//                 <Pagination>
//                   <Pagination.First
//                     onClick={() => setCurrentPage(1)}
//                     disabled={currentPage === 1}
//                   />
//                   <Pagination.Prev
//                     onClick={() => setCurrentPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   />
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <Pagination.Item
//                       key={i + 1}
//                       active={i + 1 === currentPage}
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       {i + 1}
//                     </Pagination.Item>
//                   ))}
//                   <Pagination.Next
//                     onClick={() => setCurrentPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   />
//                   <Pagination.Last
//                     onClick={() => setCurrentPage(totalPages)}
//                     disabled={currentPage === totalPages}
//                   />
//                 </Pagination>
//               </div>
//             )}
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }


import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Pagination,
  Table,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { FaPlus, FaEye } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { leads } from "../data/mockdata"; // ✅ adjust path if needed

// --- API BASE URL ---
const API_BASE = "http://192.168.162.141/cyberathon_admin/index.php/Api";

const LEAD_STAGE_OPTIONS = ["civil", "finalised", "submit"];

// Helper: Date object -> dd-mm-yyyy (API format)
const toApiDate = (dateObj) => {
  if (!dateObj) return "";
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export default function LeadGeneration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalesperson, setSelectedSalesperson] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [VisitDate, setVisitDate] = useState(null); // Next visit date for modal
  const [endDate, setEndDate] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all"); // 'all' | 'monthly' | 'quarterly' | 'yearly'
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [leadStages, setLeadStages] = useState({});

  // NEW: which lead's next visit we're editing + loading flag
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [savingNextVisit, setSavingNextVisit] = useState(false);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const uniqueSalespersons = [...new Set(leads.map((l) => l.salespersonName))];

  // ✅ Helper: Get start/end of current period
  const getPeriodRange = (period) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed

    switch (period) {
      case "monthly":
        return {
          start: new Date(year, month, 1),
          end: new Date(year, month + 1, 0, 23, 59, 59),
        };
      case "quarterly":
        const quarter = Math.floor(month / 3);
        const qStartMonth = quarter * 3;
        const qEndMonth = qStartMonth + 2;
        return {
          start: new Date(year, qStartMonth, 1),
          end: new Date(year, qEndMonth + 1, 0, 23, 59, 59),
        };
      case "yearly":
        return {
          start: new Date(year, 0, 1),
          end: new Date(year + 1, 0, 0, 23, 59, 59),
        };
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const flattenedRows = useMemo(() => {
    return leads.map((lead) => ({
      key: lead.leadId,
      ...lead,
      actionType: lead.stage === "civil" ? "create" : "view",
    }));
  }, []);

  const filteredData = useMemo(() => {
    const periodRange = timeFilter !== "all" ? getPeriodRange(timeFilter) : null;

    return flattenedRows.filter((item) => {
      // Salesperson filter
      if (
        selectedSalesperson !== "all" &&
        item.salespersonName !== selectedSalesperson
      )
        return false;

      // Custom date range filter
      if (startDate || endDate) {
        const itemDate = new Date(item.visitDate);
        const start = startDate
          ? new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate()
            )
          : null;
        const end = endDate
          ? new Date(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDate(),
              23,
              59,
              59
            )
          : null;
        if (start && itemDate < start) return false;
        if (end && itemDate > end) return false;
      }

      // Time-based filter (monthly/quarterly/yearly)
      if (periodRange) {
        const itemDate = new Date(item.visitDate);
        if (itemDate < periodRange.start || itemDate > periodRange.end) {
          return false;
        }
      }

      // Search term
      const term = searchTerm.toLowerCase();
      const searchStr = `${item.projectName} ${item.ClientName} ${item.contractor} ${item.department} ${item.stage} ${item.salespersonName}`.toLowerCase();
      return searchStr.includes(term);
    });
  }, [flattenedRows, searchTerm, selectedSalesperson, startDate, endDate, timeFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleCreateQuotation = (leadId) => {
    navigate(`/new-quotation/from-lead/${leadId}`);
    toast.success(`Redirecting to create quotation for ${leadId}`);
  };

  const handleViewLead = (projectName) => {
    navigate(`/view-leads/${encodeURIComponent(projectName)}`);
  };

  const handleStageChange = (leadId, newStage) => {
    setLeadStages((prev) => ({ ...prev, [leadId]: newStage }));
    toast.success(`Lead ${leadId} status updated to: ${newStage}`);
  };

  const handleClose = () => {
    setShow(false);
    setVisitDate(null);
    setSelectedLeadId(null);
  };

  // OPEN modal for a specific lead
  const handleShow = (leadId) => {
    setSelectedLeadId(leadId);
    setVisitDate(null);
    setShow(true);
  };

  // ✅ Call backend to save next visit date for selected lead
  const handleSaveNextVisit = async () => {
    if (!selectedLeadId) {
      toast.error("No lead selected.");
      return;
    }
    if (!VisitDate) {
      toast.error("Please select a date.");
      return;
    }

    try {
      setSavingNextVisit(true);

      const payload = {
        id: selectedLeadId,
        nxt_visit_date: toApiDate(VisitDate),
      };

      const res = await fetch(`${API_BASE}/update_new_lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status && data.success === "1") {
        toast.success(data.message || "Next visit date updated.");
        // Optional: update local mock data if needed later
        handleClose();
      } else {
        toast.error(data.message || "Failed to update next visit date.");
      }
    } catch (err) {
      console.error("Error updating next visit date:", err);
      toast.error("Something went wrong.");
    } finally {
      setSavingNextVisit(false);
    }
  };

  // ✅ Color helper for dropdown toggle
  const getVariantForStage = (stage) => {
    switch (stage) {
      case "civil":
        return "warning";
      case "finalised":
        return "primary";
      case "submit":
        return "success";
      default:
        return "secondary";
    }
  };

  const renderRow = (item, index) => {
    const selectedStage = leadStages[item.leadId] || item.stage || "open";
    return (
      <tr key={item.key}>
        <td>{indexOfFirstItem + index + 1}</td>
        <td>{item.projectName}</td>
        <td>{item.architectName}</td>
        <td>{item.contractor}</td>
        <td>{item.department}</td>

        {/* ✅ Stage dropdown with bg colors */}
        <td>
          <Dropdown
            onSelect={(newStage) => handleStageChange(item.leadId, newStage)}
          >
            <Dropdown.Toggle
              variant={getVariantForStage(selectedStage)}
              size="sm"
              style={{ textTransform: "capitalize", width: "100px" }}
            >
              {selectedStage}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="civil" className="fw-semibold">
                Civil
              </Dropdown.Item>
              <Dropdown.Item eventKey="finalised" className="fw-semibold">
                Finalised
              </Dropdown.Item>
              <Dropdown.Item eventKey="submit" className="fw-semibold">
                Submit
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>

        <td>{formatDate(item.visitDate)}</td>

        {/* Next Visit */}
        <td style={{ textAlign: "center" }}>
          <Button
            className="add-customer-btn btn-sm"
            onClick={() => handleShow(item.leadId)} // 👈 pass leadId
          >
            <FaPlus />
          </Button>
        </td>

        {/* Action */}
        <td>
          <Button
            className="buttonEye"
            size="sm"
            onClick={() => handleViewLead(item.projectName)}
            title="View Lead"
          >
            <FaEye />
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header style={{ backgroundColor: "#fff", borderBottom: "none" }}>
              <Row className="align-items-center">
                <Col>
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    Lead Generation
                  </Card.Title>
                </Col>

                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <Form.Select
                    value={selectedSalesperson}
                    onChange={(e) => {
                      setSelectedSalesperson(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{ width: "175px" }}
                  >
                    <option value="all">All Salespersons</option>
                    {uniqueSalespersons.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>

                  {/* ✅ New Time Filter Dropdown */}
                  <Form.Select
                    value={timeFilter}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTimeFilter(value);
                      if (value !== "all") {
                        setStartDate(null);
                        setEndDate(null);
                      }
                      setCurrentPage(1);
                    }}
                    style={{ width: "100px" }}
                  >
                    <option value="all">Search by</option>
                    <option value="monthly"> Month</option>
                    <option value="quarterly"> Quarter</option>
                    <option value="yearly"> Year</option>
                  </Form.Select>

                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ width: "240px" }}
                  >
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setTimeFilter("all");
                        setCurrentPage(1);
                      }}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start Date"
                      className="form-control"
                      dateFormat="dd-MM-yyyy"
                      isClearable
                    />
                    <span>to</span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        setTimeFilter("all");
                        setCurrentPage(1);
                      }}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="End Date"
                      className="form-control"
                      dateFormat="dd-MM-yyyy"
                      isClearable
                    />
                  </div>

                  <Form.Control
                    type="text"
                    placeholder="Search by Project, architect, or Department..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{ width: "20vw" }}
                  />

                  <Button
                    as={Link}
                    to="/newlead"
                    className="btn btn-primary add-customer-btn"
                    style={{ width: "10vw" }}
                  >
                    <FaPlus size={14} className="me-1" /> Add Lead
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Project Name</th>
                    <th>Architect</th>
                    <th>Contractor</th>
                    <th>Department</th>
                    <th>Stage</th>
                    <th>Visit Date</th>
                    <th className="text-center">Next Visit</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map(renderRow)
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center p-4">
                        No leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>

            {/* Next Visit Modal */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add next visit date</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <DatePicker
                  selected={VisitDate}
                  onChange={(date) => {
                    setVisitDate(date);
                  }}
                  placeholderText="Next Visit Date"
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                  isClearable
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="add-customer-btn"
                  onClick={handleSaveNextVisit}
                  disabled={savingNextVisit}
                >
                  {savingNextVisit ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center p-3">
                <Pagination>
                  <Pagination.First
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
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
