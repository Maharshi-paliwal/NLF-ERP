import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Pagination,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import { FaEye, FaPlus } from "react-icons/fa";

// Importing the centralized static database
import { salespersons as mockSalespersonsData, leads as mockLeadsData } from "../../data/mockdata";

// CONSTANTS
const LEADS_PER_PAGE = 10;

/**
 * Utility: Calculate reminder date (15 days after last interaction)
 */
const calculateReminderDate = (interactionDate) => {
  if (!interactionDate) return 'N/A';
  const lastInteraction = new Date(interactionDate + 'T00:00:00');
  lastInteraction.setDate(lastInteraction.getDate() + 15);
  const year = lastInteraction.getFullYear();
  const month = String(lastInteraction.getMonth() + 1).padStart(2, '0');
  const day = String(lastInteraction.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Utility: Get countdown status
 */
const getCountdownStatus = (targetDateString) => {
  if (!targetDateString || targetDateString === 'N/A') {
    return { text: 'N/A', style: 'secondary' };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(targetDateString + 'T00:00:00');
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `${Math.abs(diffDays)} days overdue!`, style: 'danger' };
  } else if (diffDays === 0) {
    return { text: 'Due Today!', style: 'warning' };
  } else if (diffDays <= 3) {
    return { text: `${diffDays} days left`, style: 'warning' };
  } else {
    return { text: `${diffDays} days left`, style: 'success' };
  }
};

/**
 * Format date string (YYYY-MM-DD) to DD-MM-YYYY
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

// --- Main Component ---
export default function SalesPerson() {
  const [allLeadsWithSalesperson, setAllLeadsWithSalesperson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const navigate = useNavigate();

  const handleViewLeadDetails = (clientName) => {
    const path = `/sales-details/${clientName}`;
    navigate(path);
    toast.success(`Fetching details for Lead ${clientName}...`);
  };

  const handleShowModal = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLead(null);
  };

  // Form state for new interaction
  const [newInteraction, setNewInteraction] = useState({
    date: '',
    mode: '',
    location: '',
    status: '',
    moms: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInteraction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save interaction logic (e.g., dispatch to store or API)
    console.log("New interaction for lead:", selectedLead?.leadId, newInteraction);
    toast.success("Interaction log saved!");
    handleCloseModal();
    // Reset form
    setNewInteraction({
      date: '',
      mode: '',
      location: '',
      status: '',
      moms: '',
    });
  };

  // --- Fetch and flatten data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        toast.loading("Fetching and processing sales data...", { id: "fetch-sps" });

        const salespersonMap = mockSalespersonsData.reduce((acc, sp) => {
          acc[sp.salespersonId] = sp.name;
          return acc;
        }, {});

        const enrichedLeads = mockLeadsData.map((lead) => {
          const salespersonName = salespersonMap[lead.salespersonId] || 'Unknown';
          const reminderDate = calculateReminderDate(lead.visitDate);
          const countdown = getCountdownStatus(reminderDate);

          return {
            ...lead,
            salespersonName,
            clientName: lead.clientName || 'N/A',
            companyName: lead.contractor || 'N/A',
            reminderDate,
            countdown,
          };
        });

        const sortedLeads = enrichedLeads.sort(
          (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
        );

        setAllLeadsWithSalesperson(sortedLeads);
        toast.success("Sales data loaded successfully!", { id: "fetch-sps" });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load sales data", { id: "fetch-sps" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Global filtering ---
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return allLeadsWithSalesperson;

    const lower = searchTerm.toLowerCase();
    return allLeadsWithSalesperson.filter((lead) => {
      const searchable = [
        lead.salespersonName,
        lead.salespersonId,
        lead.clientName,
        lead.companyName,
        lead.customer?.name || '',
        lead.customer?.mobile || '',
        lead.customer?.email || '',
        lead.leadId,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return searchable.includes(lower);
    });
  }, [allLeadsWithSalesperson, searchTerm]);

  // --- Pagination logic ---
  const totalPages = Math.ceil(filteredLeads.length / LEADS_PER_PAGE);
  const currentLeads = useMemo(() => {
    const start = (currentPage - 1) * LEADS_PER_PAGE;
    return filteredLeads.slice(start, start + LEADS_PER_PAGE);
  }, [filteredLeads, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginate = (page) => setCurrentPage(page);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    let items = [];
    items.push(
      <Pagination.First
        key="first"
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
      />
    );
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    if (endPage - startPage < 4) {
      if (currentPage <= 3) endPage = Math.min(totalPages, 5);
      else if (currentPage > totalPages - 2) startPage = Math.max(1, totalPages - 4);
    }

    if (startPage > 1) items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }
    if (endPage < totalPages) items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
      />
    );
    return items;
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          {/* Header and Search */}
          <Card className="strpied-tabled-with-hover mb-4">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={6}>
                  <Card.Title style={{ fontWeight: "700", fontSize: "1.5rem", marginBottom: "0" }}>
                    Sales
                  </Card.Title>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <Form.Control
                    type="text"
                    placeholder="Search by Salesperson, Client, Company, Lead ID, etc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: "300px" }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {loading ? (
            <div className="text-center p-5">Loading...</div>
          ) : currentLeads.length > 0 ? (
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-responsive p-0">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sr. No</th>
                      <th>Salesperson</th>
                      <th>Client / Company</th>
                      <th>Last Interaction</th>
                      <th>Follow-up Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeads.map((lead, index) => (
                      <tr key={lead.leadId || lead.clientName}>
                        <td>{(currentPage - 1) * LEADS_PER_PAGE + index + 1}</td>
                        <td>{lead.salespersonName}</td>
                        <td>
                          {lead.clientName} <br />
                          <small className="text-muted">{lead.companyName}</small>
                        </td>
                        <td>{formatDate(lead.visitDate)}</td>
                        <td>
                          <span className={`badge bg-${lead.countdown.style}`}>
                            {lead.countdown.text}
                          </span>
                          <small className="ms-2 text-muted" title="Target Follow-up Date">
                            ({lead.reminderDate})
                          </small>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleViewLeadDetails(lead.clientName)}
                            title="View Lead Details"
                            className="me-2"
                          >
                            <FaEye />
                          </Button>
                          <Button
                            className="add-customer-btn"
                            size="sm"
                            onClick={() => handleShowModal(lead)}
                            title="Add Interaction Log"
                          >
                            <FaPlus />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>

              {totalPages > 1 && (
                <Card.Footer className="d-flex justify-content-center">
                  <Pagination size="sm">{renderPagination()}</Pagination>
                </Card.Footer>
              )}
            </Card>
          ) : (
            <Card>
              <Card.Body className="text-center py-4">
                No leads found matching your search.
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* ✅ Modal moved OUTSIDE useEffect — in render body */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <FaPlus className="me-2" /> Add Client Interaction
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formInteractionDate">
                  <Form.Label>
                    Date of Interaction <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newInteraction.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formInteractionMode">
                  <Form.Label>Mode</Form.Label>
                  <Form.Select name="mode" value={newInteraction.mode} onChange={handleChange} required>
                    <option value="">Select Interaction Mode</option>
                    <option value="Initial Meeting">Initial Meeting</option>
                    <option value="Virtual Meeting">Virtual Meeting</option>
                    <option value="Client Site Visit">Client Site Visit</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email/Text">Email/Text</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formInteractionLocation">
              <Form.Label>Location / Details</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newInteraction.location}
                onChange={handleChange}
                placeholder="Enter location or specific details"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInteractionStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={newInteraction.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Requirement Gathering">Requirement Gathering</option>
                <option value="Technical Discussion">Technical Discussion</option>
                <option value="Quotation Sent">Quotation Sent</option>
                <option value="Revised">Revised</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInteractionMOMs">
              <Form.Label>
                Minutes of Meeting (MOMs) / Notes <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="moms"
                value={newInteraction.moms}
                onChange={handleChange}
                placeholder="Summarize the discussion, next steps, and key decisions..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save Interaction Log
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}