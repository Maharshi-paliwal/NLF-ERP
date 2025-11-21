// src/pages/SiteManagement.jsx
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
import { FaSearch, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  siteBranches,
  materialDeliveries,
  weeklyUsageLogs
} from "../data/mockdata"; // ✅ Import site-related data

const SiteManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Combine deliveries and usage logs into a single list with type
  const allSiteEvents = useMemo(() => {
    const deliveries = materialDeliveries.map(d => ({
      id: `DEL-${d.deliveryId}`,
      type: "Delivery",
      siteId: d.siteId,
      date: d.deliveryDate,
      status: d.status,
      description: `Material delivery: ${d.items.length} item(s)`,
      ...d
    }));

    //percentage progress bar in cards

    const usages = weeklyUsageLogs.map(u => ({
      id: `USAGE-${u.usageLogId}`,
      type: "Usage",
      siteId: u.siteId,
      date: u.weekEndDate,
      status: u.approvalStatus,
      description: `Weekly usage report (W${u.weekNumber})`,
      ...u
    }));

    return [...deliveries, ...usages];
  }, []);

      // Calculate progress % for each site
const siteProgressMap = useMemo(() => {
  const progressMap = {};

  // Step 1: Aggregate total delivered value per site
  const deliveredValue = {};
  materialDeliveries.forEach(delivery => {
    const siteId = delivery.siteId;
    if (!deliveredValue[siteId]) deliveredValue[siteId] = 0;
    const total = delivery.items.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
    deliveredValue[siteId] += total;
  });

  // Step 2: Aggregate total used value per site
  const usedValue = {};
  weeklyUsageLogs.forEach(log => {
    const siteId = log.siteId;
    if (!usedValue[siteId]) usedValue[siteId] = 0;
    const total = log.materials.reduce((sum, mat) => sum + (mat.usageCost || 0), 0);
    usedValue[siteId] += total;
  });

  // Step 3: Compute percentage
  siteBranches.forEach(site => {
    const siteId = site.siteId;
    const delivered = deliveredValue[siteId] || 0;
    const used = usedValue[siteId] || 0;

    let progress = 0;
    if (delivered > 0) {
      progress = Math.min(100, Math.round((used / delivered) * 100));
    } else if (used > 0) {
      // If nothing delivered but usage logged (edge case), assume 100%
      progress = 100;
    }

    progressMap[siteId] = progress;
  });

  return progressMap;
}, []);

  // Map siteId to siteName for display
  const siteNameMap = useMemo(() => {
    const map = {};
    siteBranches.forEach(site => {
      map[site.siteId] = site.siteName;
    });
    return map;
  }, []);

  // Filter events by search term
  const filteredEvents = useMemo(() => {
    if (!searchTerm) return allSiteEvents;
    const term = searchTerm.toLowerCase();
    return allSiteEvents.filter(event =>
      (event.siteId && event.siteId.toLowerCase().includes(term)) ||
      (siteNameMap[event.siteId] && siteNameMap[event.siteId].toLowerCase().includes(term)) ||
      (event.type && event.type.toLowerCase().includes(term)) ||
      (event.description && event.description.toLowerCase().includes(term)) ||
      (event.supervisorName && event.supervisorName.toLowerCase().includes(term))
    );
  }, [searchTerm, allSiteEvents, siteNameMap]);

  // Status badge styling
  const getStatusBadge = (type, status) => {
    if (type === "Delivery") {
      return status === "received" ? "bg-info" : status === "delayed" ? "bg-warning" : "bg-secondary";
    } else {
      return status === "approved" ? "bg-success" : status === "pending" ? "bg-warning" : "bg-danger";
    }
  };

  return (
    <Container fluid>
      {/* Site Cards */}
    <Row className="mb-4">
  {siteBranches.map((site) => {
    const progress = siteProgressMap[site.siteId] || 0;
    return (
      <Col key={site.siteId} md={4} lg={3} className="mb-3">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="fs-6 mb-4">{site.siteName}</Card.Title>
            <Card.Text className="small mb-1">
              <strong>Manager:</strong> {site.siteManager}
            </Card.Text>

            {/* Progress Bar */}
            <div className="mt-2">
              <small className="text-muted">Work Done</small>
              <div className="progress" style={{ height: "8px", marginTop: "4px", marginBottom: "4px" }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <small className="text-muted">{progress}% Complete</small>
            </div>

            {/* Status Badge */}
            <span
              className={`badge ${
                site.siteStatus === "active"
                  ? "bg-success"
                  : site.siteStatus === "to be set"
                  ? "bg-warning text-dark"
                  : "bg-secondary"
              }`}
            >
              {site.siteStatus.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </Card.Body>
        </Card>
      </Col>
    );
  })}
</Row>

      {/* Activity Table */}
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header style={{ backgroundColor: "#fff", borderBottom: "none" }}>
              <Row className="align-items-center">
                <Col>
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    Site Working
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Search by Site, Type, Supervisor, Status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "25vw", paddingRight: "35px" }}
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
                  {/* Optional: Add new delivery/usage form later */}
                  {/* <Button className="btn btn-primary">
                    <FaPlus size={14} className="me-1" /> Add Activity
                  </Button> */}
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Site</th>
                    {/* <th>Type</th> */}
                    <th>Date</th>
                    <th>Status</th>
                    <th>Supervisor</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                      <tr key={event.id}>
                        <td>{index + 1}</td>
                        <td>{siteNameMap[event.siteId] || event.siteId}</td>
                        {/* <td>
                          <span className="badge bg-info">{event.type}</span>
                        </td> */}
                        <td>{event.date}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(event.type, event.status)}`}>
                            {event.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td>{event.supervisorName || "— N/A —"}</td>
                        <td>{event.description}</td>
                        <td>
                          <Link
                             to={`/site-management/view/${event.workOrderId || event.id}`}
                              state={{ mode: "view", data: event }}
                          >
                            <Button className="buttonEye ms-4">
                              <FaEye />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No site activities found.
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

export default SiteManagement;