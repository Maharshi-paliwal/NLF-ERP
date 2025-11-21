import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaFileInvoice,
  FaShoppingCart,
  FaUserPlus,
  FaEye,
  FaArrowLeft
} from 'react-icons/fa';

const Report = () => {
  const reportCards = [
    {
      title: "Quotation Report",
      description: "View and manage all quotations",
      icon: FaFileInvoice,
      color: "primary",
      stats: {
        total: "156",
        pending: "23",
        approved: "98",
        rejected: "35"
      },
      route: "/quotations/reports"
    },
    {
      title: "Purchase Order Report",
      description: "Track purchase orders and vendors",
      icon: FaShoppingCart,
      color: "success",
      stats: {
        total: "89",
        pending: "12",
        completed: "65",
        cancelled: "12"
      },
      route: "/purchase-orders/reports"
    },
    {
      title: "Lead Generation Report",
      description: "Monitor leads and conversion rates",
      icon: FaUserPlus,
      color: "warning",
      stats: {
        total: "234",
        active: "45",
        converted: "156",
        lost: "33"
      },
      route: "/leads/reports"
    }
  ];

  const getColorClass = (color) => {
    switch (color) {
      case 'primary': return 'text-primary bg-primary-subtle';
      case 'success': return 'text-success bg-success-subtle';
      case 'warning': return 'text-warning bg-warning-subtle';
      default: return 'text-secondary bg-secondary-subtle';
    }
  };

  const getBadgeClass = (color) => {
    switch (color) {
      case 'primary': return 'bg-primary';
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        
        {/* Header */}
        <div className="mb-5">
          <div className="d-flex align-items-center gap-3 mb-3">
            <button 
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft className="me-2" size={16} />
              Back
            </button>
            <h1 className="display-5 fw-bold text-dark mb-0">Reports Dashboard</h1>
          </div>
          <p className="text-muted fs-5">View and analyze business reports</p>
        </div>

        {/* Report Cards */}
        <div className="row g-4">
          {reportCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card shadow-sm border-0" style={{height: 'fit-content'}}>
                  <div className="card-body p-2">
                    {/* Header with Icon */}
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className={`p-2 rounded ${getColorClass(card.color)}`}>
                        <Icon size={24} />
                      </div>
                      <span className={`badge ${getBadgeClass(card.color)} px-2 py-1`}>
                        {card.stats.total}
                      </span>
                    </div>
                    {/* Title and Description */}
                    <div className="mb-1">
                      <h5 className="card-title fw-bold mb-0">{card.title}</h5>
                      <p className="text-muted mb-0">{card.description}</p>
                    </div>
                    {/* Statistics */}
                    <div className="mb-1">
                      <div className="row g-1 text-center">
                        <div className="col-6">
                          <div className="bg-light rounded p-1">
                            <div className="fw-bold text-dark">{card.stats.pending || card.stats.active}</div>
                            <small className="text-muted">{card.stats.pending ? 'Pending' : 'Active'}</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-light rounded p-1">
                            <div className="fw-bold text-success">{card.stats.approved || card.stats.completed || card.stats.converted}</div>
                            <small className="text-muted">
                              {card.stats.approved ? 'Approved' : card.stats.completed ? 'Completed' : 'Converted'}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="d-grid">
                      <Link 
                        to={card.route} 
                        className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaEye size={16} />
                        View Report
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-3">Report Features</h5>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="text-primary">
                        <FaFileInvoice size={20} />
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-1">Detailed Analytics</h6>
                        <p className="text-muted mb-0 small">Comprehensive data analysis with charts and graphs</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="text-success">
                        <FaShoppingCart size={20} />
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-1">Export Options</h6>
                        <p className="text-muted mb-0 small">Download reports in PDF, Excel, and CSV formats</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="text-warning">
                        <FaUserPlus size={20} />
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-1">Real-time Updates</h6>
                        <p className="text-muted mb-0 small">Live data synchronization and automatic updates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Report;