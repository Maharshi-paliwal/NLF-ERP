//AnnextureViewer.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Table, Tabs, Tab, Badge } from 'react-bootstrap';
import { FaBox, FaCog, FaFileDownload } from 'react-icons/fa';
import { annextures } from '../data/mockdata';
import { useParams } from 'react-router-dom';

const AnnextureViewer = () => {
  const { workOrderId } = useParams(); // ✅ Get from URL - Primary Key
  const [activeTab, setActiveTab] = useState('items');
  
  // Fetch annexture data using workOrderId as primary key
  const annexture = annextures.find(a => a.workOrderId === workOrderId);
  
  if (!annexture) {
    return (
      <Card className="mt-4">
        <Card.Body>
          <p className="text-danger">No annexture found for Work Order: {workOrderId}</p>
        </Card.Body>
      </Card>
    );
  }

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Group accessories by category
  const groupAccessoriesByCategory = () => {
    return annexture.accessories.reduce((grouped, accessory) => {
      const category = accessory.category;
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(accessory);
      return grouped;
    }, {});
  };

  const accessoriesByCategory = groupAccessoriesByCategory();

  return (
    <div className="annexture-viewer mt-4">
      {/* Header */}
      <Card className="mb-3">
        <Card.Header style={{ backgroundColor: '#2c3e50' }}>
          <Row className="align-items-center">
            <Col>
              <h3>{annexture.projectName}</h3>
            </Col>
            <Col className="text-end">
              <Badge bg={annexture.approvalStatus === 'approved' ? 'success' : 'warning'}>
                {annexture.approvalStatus.toUpperCase()}
              </Badge>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Client:</strong> {annexture.clientName}</p>
              <p><strong>Work Order ID:</strong> <Badge bg="info">{annexture.workOrderId}</Badge></p>
              <p><strong>Quotation ID:</strong> {annexture.quotationId}</p>
            </Col>
            <Col md={6}>
              <p><strong>Created Date:</strong> {new Date(annexture.createdDate).toLocaleDateString()}</p>
              <p><strong>Prepared by:</strong> {annexture.preparedBy}</p>
              <p><strong>Approved by:</strong> {annexture.approvedBy}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabs */}
      <Card>
        <Card.Body>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            
            {/* ITEMS TAB */}
            <Tab eventKey="items" title={`Primary Items (${annexture.items.length})`}>
              <Table striped hover responsive className="mt-3">
                <thead>
                  <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                    <th>Sr.</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Rate</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {annexture.items.map((item, idx) => (
                    <tr key={item.itemId}>
                      <td>{idx + 1}</td>
                      <td>
                        <Badge bg="primary">{item.category}</Badge>
                      </td>
                      <td>
                        <strong>{item.description}</strong>
                        <br />
                        <small className="text-muted">{item.material}</small>
                        {item.specifications && (
                          <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                            <details>
                              <summary style={{ cursor: 'pointer', color: '#007bff' }}>View Specs</summary>
                              <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                                {Object.entries(item.specifications).map(([key, value]) => (
                                  <li key={key}>
                                    <strong>{key}:</strong> {String(value)}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          </div>
                        )}
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td className="text-end">{formatCurrency(item.rate)}</td>
                      <td className="text-end">
                        <strong>{formatCurrency(item.total)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row className="mt-3">
                <Col md={8} />
                <Col md={4}>
                  <div style={{ backgroundColor: '#ecf0f1', padding: '10px', borderRadius: '5px' }}>
                    <p><strong>Items Total: {formatCurrency(annexture.summary.itemsTotal)}</strong></p>
                  </div>
                </Col>
              </Row>
            </Tab>

            {/* ACCESSORIES TAB */}
            <Tab eventKey="accessories" title={`Accessories (${annexture.accessories.length})`}>
              <div className="mt-3">
                {Object.entries(accessoriesByCategory).map(([category, accessories]) => (
                  <div key={category} className="mb-4">
                    <h6 style={{ backgroundColor: '#bdc3c7', padding: '8px', borderRadius: '3px' }}>
                      <FaCog className="me-2" />
                      {category} ({accessories.length})
                    </h6>
                    
                    <Table striped hover size="sm" responsive>
                      <thead>
                        <tr style={{ backgroundColor: '#95a5a6', color: 'white' }}>
                          <th>Sr.</th>
                          <th>Accessory Name</th>
                          <th>Qty</th>
                          <th>Unit</th>
                          <th>Rate</th>
                          <th>Total</th>
                          <th>Supplier</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accessories.map((acc, idx) => (
                          <tr key={acc.accessoryId}>
                            <td>{idx + 1}</td>
                            <td>
                              <strong>{acc.name}</strong>
                              <br />
                              <small className="text-muted">{acc.description}</small>
                              {acc.specifications && (
                                <details style={{ fontSize: '0.75rem', marginTop: '3px' }}>
                                  <summary style={{ cursor: 'pointer', color: '#007bff' }}>Specs</summary>
                                  <ul style={{ marginTop: '3px', paddingLeft: '20px' }}>
                                    {Object.entries(acc.specifications).slice(0, 3).map(([key, value]) => (
                                      <li key={key}>
                                        <strong>{key}:</strong> {String(value)}
                                      </li>
                                    ))}
                                  </ul>
                                </details>
                              )}
                            </td>
                            <td className="text-center">{acc.quantity}</td>
                            <td>{acc.unit}</td>
                            <td className="text-end">{formatCurrency(acc.rate)}</td>
                            <td className="text-end">
                              <strong>{formatCurrency(acc.total)}</strong>
                            </td>
                            <td>
                              <small>{acc.supplier}</small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ))}
              </div>
              
              <Row className="mt-3">
                <Col md={8} />
                <Col md={4}>
                  <div style={{ backgroundColor: '#ecf0f1', padding: '10px', borderRadius: '5px' }}>
                    <p><strong>Accessories Total: {formatCurrency(annexture.summary.accessoriesTotal)}</strong></p>
                  </div>
                </Col>
              </Row>
            </Tab>

            {/* SUMMARY TAB */}
            <Tab eventKey="summary" title="Summary & Totals">
              <div className="mt-3">
                <Row>
                  <Col md={6}>
                    <Card style={{ backgroundColor: '#f8f9fa' }}>
                      <Card.Body>
                        <h6 className="mb-3">Item Breakdown</h6>
                        <p>Primary Items: <strong className="text-primary">{annexture.summary.totalPrimaryItems}</strong></p>
                        <p>Accessories: <strong className="text-success">{annexture.summary.totalAccessories}</strong></p>
                        <hr />
                        <p>Total Line Items: <strong>{annexture.summary.totalLineItems}</strong></p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card style={{ backgroundColor: '#f8f9fa' }}>
                      <Card.Body>
                        <h6 className="mb-3">Financial Summary</h6>
                        <table style={{ width: '100%' }}>
                          <tbody>
                            <tr>
                              <td><strong>Items Total</strong></td>
                              <td className="text-end">{formatCurrency(annexture.summary.itemsTotal)}</td>
                            </tr>
                            <tr>
                              <td><strong>Accessories Total</strong></td>
                              <td className="text-end">{formatCurrency(annexture.summary.accessoriesTotal)}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#e8f4f8', borderTop: '2px solid #007bff' }}>
                              <td><strong>Subtotal</strong></td>
                              <td className="text-end">
                                <strong>{formatCurrency(annexture.summary.itemsTotal + annexture.summary.accessoriesTotal)}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td><strong>GST (18%)</strong></td>
                              <td className="text-end"><strong>{formatCurrency(annexture.summary.gst)}</strong></td>
                            </tr>
                            <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold', borderTop: '2px solid #28a745' }}>
                              <td>Grand Total</td>
                              <td className="text-end" style={{ fontSize: '1.2rem', color: '#155724' }}>
                                {formatCurrency(annexture.summary.grandTotalWithGST)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Tab>

            {/* NOTES TAB */}
            <Tab eventKey="notes" title="Notes & Details">
              <div className="mt-3">
                <Card>
                  <Card.Body>
                    <h6>Project Notes:</h6>
                    <p className="text-muted">{annexture.notes}</p>
                  </Card.Body>
                </Card>

                {annexture.attachments && annexture.attachments.length > 0 && (
                  <Card className="mt-3">
                    <Card.Header>
                      <h6 className="mb-0">Attachments</h6>
                    </Card.Header>
                    <Card.Body>
                      <ul>
                        {annexture.attachments.map((att, idx) => (
                          <li key={idx}>
                            {att.documentName}
                            <br />
                            <small className="text-muted">
                              Uploaded: {new Date(att.uploadedDate).toLocaleDateString()}
                            </small>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                )}
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* Download Button */}
      <div className="mt-3 mb-4">
        <button className="add-customer-btn">
          <FaFileDownload className="me-2" />
          Download Annexture
        </button>
      </div>
    </div>
  );
};

export default AnnextureViewer;