import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaSearch,
  FaEye,
  FaArrowLeft,
  FaCalendarAlt,
  FaShoppingCart
} from 'react-icons/fa';

const PurchaseOrderReportList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sample purchase order data
  const purchaseOrders = [
    {
      id: 1,
      workOrderNo: "WO-2024-001",
      clientName: "ABC Corporation",
      projectName: "Office Complex Phase 1",
      architect: "John Smith Architects",
      orderDate: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      workOrderNo: "WO-2024-002",
      clientName: "XYZ Industries",
      projectName: "Manufacturing Plant Expansion",
      architect: "Design Studio Ltd",
      orderDate: "2024-01-18",
      status: "Completed"
    },
    {
      id: 3,
      workOrderNo: "WO-2024-003",
      clientName: "Tech Solutions Ltd",
      projectName: "Data Center Construction",
      architect: "Modern Architects Inc",
      orderDate: "2024-01-20",
      status: "Pending"
    },
    {
      id: 4,
      workOrderNo: "WO-2024-004",
      clientName: "Global Enterprises",
      projectName: "Retail Mall Development",
      architect: "Creative Designs Co",
      orderDate: "2024-01-22",
      status: "Active"
    },
    {
      id: 5,
      workOrderNo: "WO-2024-005",
      clientName: "Innovation Corp",
      projectName: "Research Facility",
      architect: "Future Architecture",
      orderDate: "2024-01-25",
      status: "Completed"
    },
    {
      id: 6,
      workOrderNo: "WO-2024-006",
      clientName: "Future Systems",
      projectName: "Smart Building Project",
      architect: "Green Design Studio",
      orderDate: "2024-01-28",
      status: "Active"
    },
    {
      id: 7,
      workOrderNo: "WO-2024-007",
      clientName: "Smart Technologies",
      projectName: "Tech Campus Phase 2",
      architect: "Urban Planners Ltd",
      orderDate: "2024-02-01",
      status: "Pending"
    },
    {
      id: 8,
      workOrderNo: "WO-2024-008",
      clientName: "Digital Dynamics",
      projectName: "Corporate Headquarters",
      architect: "Elite Architects",
      orderDate: "2024-02-05",
      status: "Completed"
    }
  ];

  // Filter purchase orders based on search and date
  const filteredPurchaseOrders = purchaseOrders.filter((order) => {
    const matchesSearch = 
      order.workOrderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.architect.toLowerCase().includes(searchQuery.toLowerCase());

    const orderDate = new Date(order.orderDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDate = 
      (!start || orderDate >= start) &&
      (!end || orderDate <= end);

    return matchesSearch && matchesDate;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'Active':
        return 'bg-primary';
      case 'Pending':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-4">
        
        {/* Header */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <Link to="/reports" className="btn btn-outline-secondary">
              <FaArrowLeft className="me-2" size={16} />
              Back to Reports
            </Link>
            <div className="d-flex align-items-center gap-2">
              <FaShoppingCart className="text-success" size={24} />
              <h1 className="h3 fw-bold text-dark mb-0">Purchase Order Report List</h1>
            </div>
          </div>
          <p className="text-muted">View and manage all purchase order reports</p>
        </div>

        {/* Filters */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              
              {/* Search Bar */}
              <div className="col-md-4">
                <label className="form-label fw-medium">Search Purchase Orders</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch className="text-muted" size={14} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by work order, client, project, or architect..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="col-md-3">
                <label className="form-label fw-medium">Start Date</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaCalendarAlt className="text-muted" size={14} />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-medium">End Date</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaCalendarAlt className="text-muted" size={14} />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="col-md-2 d-flex align-items-end">
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    setSearchQuery("");
                    setStartDate("");
                    setEndDate("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-muted mb-0">
              Showing {filteredPurchaseOrders.length} of {purchaseOrders.length} purchase orders
            </p>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm">
                Export PDF
              </button>
              <button className="btn btn-outline-success btn-sm">
                Export Excel
              </button>
            </div>
          </div>
        </div>

        {/* Purchase Order List Table */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center">Sr. No.</th>
                    <th scope="col">Work Order No.</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Architect</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchaseOrders.length > 0 ? (
                    filteredPurchaseOrders.map((order, index) => (
                      <tr key={order.id}>
                        <td className="text-center fw-medium">{index + 1}</td>
                        <td>
                          <span className="badge bg-success bg-opacity-10 text-success">
                            {order.workOrderNo}
                          </span>
                        </td>
                        <td className="fw-medium">{order.clientName}</td>
                        <td>{order.projectName}</td>
                        <td className="text-muted">{order.architect}</td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <Link 
                            to={`/purchase-orders/${order.id}/view`}
                            className="btn btn-outline-primary btn-sm"
                            title="View Purchase Order"
                          >
                            <FaEye size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-5 text-muted">
                        <FaShoppingCart size={48} className="mb-3 opacity-50" />
                        <div>No purchase orders found matching your criteria</div>
                        <small>Try adjusting your search or date filters</small>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredPurchaseOrders.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Purchase order pagination">
              <ul className="pagination">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        )}

      </div>
    </div>
  );
};

export default PurchaseOrderReportList;