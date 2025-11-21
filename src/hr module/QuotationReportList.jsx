import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaSearch,
  FaEye,
  FaArrowLeft,
  FaCalendarAlt,
  FaFileInvoice
} from 'react-icons/fa';

const QuotationReportList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sample quotation data
  const quotations = [
    {
      id: 1,
      name: "ABC Corporation",
      quoteNo: "QT-2024-001",
      revision: "Rev 1",
      roundDate: "2024-01-15",
      status: "Pending"
    },
    {
      id: 2,
      name: "XYZ Industries",
      quoteNo: "QT-2024-002",
      revision: "Rev 2",
      roundDate: "2024-01-18",
      status: "Approved"
    },
    {
      id: 3,
      name: "Tech Solutions Ltd",
      quoteNo: "QT-2024-003",
      revision: "Rev 1",
      roundDate: "2024-01-20",
      status: "Rejected"
    },
    {
      id: 4,
      name: "Global Enterprises",
      quoteNo: "QT-2024-004",
      revision: "Rev 3",
      roundDate: "2024-01-22",
      status: "Pending"
    },
    {
      id: 5,
      name: "Innovation Corp",
      quoteNo: "QT-2024-005",
      revision: "Rev 1",
      roundDate: "2024-01-25",
      status: "Approved"
    },
    {
      id: 6,
      name: "Future Systems",
      quoteNo: "QT-2024-006",
      revision: "Rev 2",
      roundDate: "2024-01-28",
      status: "Pending"
    },
    {
      id: 7,
      name: "Smart Technologies",
      quoteNo: "QT-2024-007",
      revision: "Rev 1",
      roundDate: "2024-02-01",
      status: "Approved"
    },
    {
      id: 8,
      name: "Digital Dynamics",
      quoteNo: "QT-2024-008",
      revision: "Rev 4",
      roundDate: "2024-02-05",
      status: "Rejected"
    }
  ];

  // Filter quotations based on search and date
  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch = 
      quotation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.quoteNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.revision.toLowerCase().includes(searchQuery.toLowerCase());

    const quotationDate = new Date(quotation.roundDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDate = 
      (!start || quotationDate >= start) &&
      (!end || quotationDate <= end);

    return matchesSearch && matchesDate;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-success';
      case 'Pending':
        return 'bg-warning';
      case 'Rejected':
        return 'bg-danger';
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
              <FaFileInvoice className="text-primary" size={24} />
              <h1 className="h3 fw-bold text-dark mb-0">Quotation Report List</h1>
            </div>
          </div>
          <p className="text-muted">View and manage all quotation reports</p>
        </div>

        {/* Filters */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              
              {/* Search Bar */}
              <div className="col-md-4">
                <label className="form-label fw-medium">Search Quotations</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch className="text-muted" size={14} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, quote no, or revision..."
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
              Showing {filteredQuotations.length} of {quotations.length} quotations
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

        {/* Quotation List Table */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center">Sr. No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quote No.</th>
                    <th scope="col">Revision</th>
                    <th scope="col">Round Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotations.length > 0 ? (
                    filteredQuotations.map((quotation, index) => (
                      <tr key={quotation.id}>
                        <td className="text-center fw-medium">{index + 1}</td>
                        <td className="fw-medium">{quotation.name}</td>
                        <td>
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {quotation.quoteNo}
                          </span>
                        </td>
                        <td>{quotation.revision}</td>
                        <td>{formatDate(quotation.roundDate)}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(quotation.status)}`}>
                            {quotation.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <Link 
                            to={`/quotations/${quotation.id}/view`}
                            className="btn btn-outline-primary btn-sm"
                            title="View Quotation"
                          >
                            <FaEye size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">
                        <FaFileInvoice size={48} className="mb-3 opacity-50" />
                        <div>No quotations found matching your criteria</div>
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
        {filteredQuotations.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Quotation pagination">
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

export default QuotationReportList;