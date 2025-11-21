// src/pages/ViewSiteManagement.jsx
import React, { useState, useMemo } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  Pagination,
  Tabs,
  Tab,
  Badge,
  Modal,
} from "react-bootstrap";
import { siteBranches, materialDeliveries, weeklyUsageLogs } from "../data/mockdata.js";
import { FaEye, FaDownload } from "react-icons/fa";

const ViewSiteManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("sites"); // "sites", "deliveries", "usage"
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 10;

  // Modal handlers
  const handleShowDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  // === 📊 Calculate Site Progress: Usage Cost / Delivered Cost ===
  const siteProgressMap = useMemo(() => {
    const progressMap = {};

    // Step 1: Total delivered value per site
    const deliveredValue = {};
    materialDeliveries.forEach((delivery) => {
      const siteId = delivery.siteId;
      if (!deliveredValue[siteId]) deliveredValue[siteId] = 0;
      const total = delivery.items.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
      deliveredValue[siteId] += total;
    });

    // Step 2: Total used value per site
    const usedValue = {};
    weeklyUsageLogs.forEach((log) => {
      const siteId = log.siteId;
      if (!usedValue[siteId]) usedValue[siteId] = 0;
      const total = log.materials.reduce((sum, mat) => sum + (mat.usageCost || 0), 0);
      usedValue[siteId] += total;
    });

    // Step 3: Compute progress %
    siteBranches.forEach((site) => {
      const siteId = site.siteId;
      const delivered = deliveredValue[siteId] || 0;
      const used = usedValue[siteId] || 0;

      let progress = 0;
      if (delivered > 0) {
        progress = Math.min(100, Math.round((used / delivered) * 100));
      } else if (used > 0) {
        progress = 100;
      }

      progressMap[siteId] = progress;
    });

    return progressMap;
  }, []);

  // --- CENTRALIZED FILTERING LOGIC ---
  const getTabData = (tabKey) => {
    const term = searchTerm.toLowerCase();

    if (tabKey === "sites") {
      const filteredData = siteBranches.filter((site) => {
        const searchValues = `${site.siteId} ${site.siteName} ${site.city} ${site.siteStatus}`.toLowerCase();
        return searchValues.includes(term);
      });

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const current = filteredData.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      return { current, totalPages };

    } else if (tabKey === "deliveries") {
      const filteredData = materialDeliveries.filter((delivery) => {
        const searchValues = `${delivery.deliveryId} ${delivery.siteId} ${delivery.status} ${delivery.deliveryDate}`.toLowerCase();
        return searchValues.includes(term);
      });

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const current = filteredData.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      return { current, totalPages };

    } else if (tabKey === "usage") {
      const filteredData = weeklyUsageLogs.filter((log) => {
        const searchValues = `${log.usageLogId} ${log.siteId} ${log.month} ${log.supervisorName}`.toLowerCase();
        return searchValues.includes(term);
      });

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const current = filteredData.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      return { current, totalPages };
    }

    return { current: [], totalPages: 0 };
  };

  const { current: currentTabData, totalPages: totalTabPages } = getTabData(activeTab);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Tabs
              id="site-management-tabs"
              activeKey={activeTab}
              onSelect={(k) => {
                setActiveTab(k);
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="mb-0 card-top-tabs"
            >
              <Tab eventKey="sites" title="Site Branches" />
              <Tab eventKey="deliveries" title="Material Deliveries" />
              <Tab eventKey="usage" title="Weekly Usage Logs" />
            </Tabs>

            <Card.Header
              style={{ backgroundColor: "#fff", marginBottom: "2rem", borderBottom: "none" }}
            >
              <Row className="align-items-center">
                <Col className="d-flex align-items-center">
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    Site Management 
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="custom-searchbar-input nav-search"
                    style={{ width: "20vw" }}
                  />
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              {activeTab === "sites" && (
                <SitesTable
                  sites={currentTabData}
                  currentPage={currentPage}
                  totalPages={totalTabPages}
                  paginate={paginate}
                  onShowDetail={handleShowDetail}
                />
              )}
              {activeTab === "deliveries" && (
                <DeliveriesTable
                  deliveries={currentTabData}
                  currentPage={currentPage}
                  totalPages={totalTabPages}
                  paginate={paginate}
                  onShowDetail={handleShowDetail}
                />
              )}
              {activeTab === "usage" && (
                <UsageLogsTable
                  logs={currentTabData}
                  currentPage={currentPage}
                  totalPages={totalTabPages}
                  paginate={paginate}
                  onShowDetail={handleShowDetail}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetail} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Detailed Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              {activeTab === "sites" && (
                <SiteDetailView
                  site={selectedItem}
                  progress={siteProgressMap[selectedItem.siteId] || 0}
                />
              )}
              {activeTab === "deliveries" && <DeliveryDetailView delivery={selectedItem} />}
              {activeTab === "usage" && <UsageDetailView log={selectedItem} />}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

// --- SITES TABLE ---
const SitesTable = ({ sites, currentPage, totalPages, paginate, onShowDetail }) => (
  <>
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Site ID</th>
            <th>Site Name</th>
            <th>City</th>
            <th>Manager</th>
            <th>Warehouse Capacity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sites.length > 0 ? (
            sites.map((site, index) => (
              <tr key={site.siteId}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>{site.siteId}</td>
                <td>{site.siteName}</td>
                <td>{site.city}</td>
                <td>{site.siteManager}</td>
                <td>{site.warehouseCapacity} sq.ft</td>
                <td>
                  <Badge
                    className={`px-1 w-75 ${
                      site.siteStatus === "active"
                        ? "bg-success text-light"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {site.siteStatus?.toUpperCase()}
                  </Badge>
                </td>
                <td>
                  <Button
                    className="buttonEye ms-3"
                    onClick={() => onShowDetail(site)}
                    title="View Details"
                  >
                    <FaEye />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No sites found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="d-flex justify-content-center p-3">
        <Pagination>
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    )}
  </>
);

// --- DELIVERIES & USAGE TABLES (unchanged – kept for completeness) ---
const DeliveriesTable = ({ deliveries, currentPage, totalPages, paginate, onShowDetail }) => (
  <>
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Delivery ID</th>
            <th>Site ID</th>
            <th>Delivery Date</th>
            <th>Expected Date</th>
            <th>Items Count</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length > 0 ? (
            deliveries.map((delivery, index) => {
              const itemsCount = delivery.items?.length || 0;
              const statusColor =
                delivery.status === "received"
                  ? "success"
                  : delivery.status === "delayed"
                  ? "danger"
                  : "info";

              return (
                <tr key={delivery.deliveryId}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{delivery.deliveryId}</td>
                  <td>{delivery.siteId}</td>
                  <td>{delivery.deliveryDate}</td>
                  <td>{delivery.expectedDeliveryDate}</td>
                  <td>{itemsCount}</td>
                  <td>₹ {(delivery.totalAmount || 0).toLocaleString("en-IN")}</td>
                  <td>
                    <Badge className={`px-3 py-2 bg-${statusColor} text-light`}>
                      {delivery.status?.toUpperCase()}
                    </Badge>
                  </td>
                  <td>
                    <Button
                     className="buttonEye ms-3"
                      onClick={() => onShowDetail(delivery)}
                      title="View Details"
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className="text-center p-4">
                No deliveries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="d-flex justify-content-center p-3">
        <Pagination>
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    )}
  </>
);

const UsageLogsTable = ({ logs, currentPage, totalPages, paginate, onShowDetail }) => (
  <>
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Usage Log ID</th>
            <th>Site ID</th>
            <th>Week</th>
            <th>Month</th>
            <th>Supervisor</th>
            <th>Materials Count</th>
            <th>Usage Cost</th>
            <th>Approval Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => {
              const materialsCount = log.materials?.length || 0;
              const approvalColor =
                log.approvalStatus === "approved"
                  ? "success"
                  : log.approvalStatus === "rejected"
                  ? "danger"
                  : "warning";

              return (
                <tr key={log.usageLogId}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{log.usageLogId}</td>
                  <td>{log.siteId}</td>
                  <td>{log.weekNumber}</td>
                  <td>{log.month}</td>
                  <td>{log.supervisorName}</td>
                  <td>{materialsCount}</td>
                  <td>₹ {(log.weekSummary?.totalUsageCost || 0).toLocaleString("en-IN")}</td>
                  <td>
                    <Badge className={`px-3 py-2 bg-${approvalColor} text-light`}>
                      {log.approvalStatus?.toUpperCase()}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      className="buttonEye ms-3"
                      onClick={() => onShowDetail(log)}
                      title="View Details"
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-4">
                No usage logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="d-flex justify-content-center p-3">
        <Pagination>
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    )}
  </>
);

// --- DETAIL VIEW COMPONENTS ---
const SiteDetailView = ({ site, progress = 0 }) => (
  <div>
    <Row className="mb-3">
      <Col md="6">
        <p><strong>Site ID:</strong> {site.siteId}</p>
        <p><strong>Site Name:</strong> {site.siteName}</p>
        <p><strong>City:</strong> {site.city}</p>
        <p><strong>Status:</strong> {site.siteStatus}</p>
        {/* ➕ WORK DONE PROGRESS */}
        <p><strong>Work Done:</strong> {progress}%</p>
        <div className="progress" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </Col>
      <Col md="6">
        <p><strong>Manager:</strong> {site.siteManager}</p>
        <p><strong>Manager Mobile:</strong> {site.siteManagerMobile}</p>
        <p><strong>Supervisor:</strong> {site.supervisor}</p>
        <p><strong>Warehouse Capacity:</strong> {site.warehouseCapacity} sq.ft</p>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <p><strong>Address:</strong> {site.address}</p>
        <p><strong>Start Date:</strong> {site.siteStartDate || "TBD"}</p>
        <p><strong>Planned Completion:</strong> {site.plannedCompletionDate}</p>
      </Col>
    </Row>
  </div>
);

const DeliveryDetailView = ({ delivery }) => (
  <div>
    <Row className="mb-3">
      <Col md="6">
        <p><strong>Delivery ID:</strong> {delivery.deliveryId}</p>
        <p><strong>Shipment ID:</strong> {delivery.shipmentId}</p>
        <p><strong>Site ID:</strong> {delivery.siteId}</p>
        <p><strong>Delivery Date:</strong> {delivery.deliveryDate}</p>
      </Col>
      <Col md="6">
        <p><strong>Expected Date:</strong> {delivery.expectedDeliveryDate}</p>
        <p><strong>Status:</strong> {delivery.status}</p>
        <p><strong>Total Amount:</strong> ₹ {(delivery.totalAmount || 0).toLocaleString("en-IN")}</p>
        <p><strong>Supervisor:</strong> {delivery.supervisorName}</p>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <h6>Items Delivered:</h6>
        {delivery.items?.map((item, idx) => (
          <p key={idx}>
            {idx + 1}. {item.description} - Qty: {item.receivedQuantity} {item.unit} - Amount: ₹{item.totalAmount}
          </p>
        ))}
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <p><strong>Notes:</strong> {delivery.notes}</p>
      </Col>
    </Row>
  </div>
);

const UsageDetailView = ({ log }) => (
  <div>
    <Row className="mb-3">
      <Col md="6">
        <p><strong>Usage Log ID:</strong> {log.usageLogId}</p>
        <p><strong>Site ID:</strong> {log.siteId}</p>
        <p><strong>Week:</strong> {log.weekNumber}</p>
        <p><strong>Month:</strong> {log.month}</p>
      </Col>
      <Col md="6">
        <p><strong>Supervisor:</strong> {log.supervisorName}</p>
        <p><strong>Approval Status:</strong> {log.approvalStatus}</p>
        <p><strong>Total Usage Cost:</strong> ₹ {(log.weekSummary?.totalUsageCost || 0).toLocaleString("en-IN")}</p>
        <p><strong>Efficiency:</strong> {log.weekSummary?.usageEfficiency}%</p>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <h6>Materials:</h6>
        {log.materials?.map((material, idx) => (
          <p key={idx}>
            {idx + 1}. {material.description} - Used: {material.used} {material.unit} - Cost: ₹{material.usageCost}
          </p>
        ))}
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <p><strong>Quality Issues:</strong> {log.qualityIssues || "None"}</p>
        <p><strong>Notes:</strong> {log.notes}</p>
      </Col>
    </Row>
  </div>
);

export default ViewSiteManagement;