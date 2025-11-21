import { useState } from "react";

const NewClaim = () => {
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" });

  const showNotification = (title, description) => {
    setToastMessage({ title, description });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showNotification("Claim Submitted", "Your claim has been submitted successfully.");
    setTimeout(() => {
      window.history.back();
    }, 1500);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    showNotification("Expense Added", "Expense has been added to the claim.");
    setIsExpenseDialogOpen(false);
  };

  return (
    <div className="min-vh-100 bg-light p-4">
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        rel="stylesheet"
      />

      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show" role="alert">
            <div className="toast-header">
              <strong className="me-auto">{toastMessage.title}</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">{toastMessage.description}</div>
          </div>
        </div>
      )}

      <div className="container-fluid" style={{ maxWidth: "1000px" }}>
        <div className="mb-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="h2 mb-0 fw-bold">New Claim</h1>
          </div>

          <div className="card border-0 shadow-sm p-4">
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label htmlFor="employeeId" className="form-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeId"
                  placeholder="Enter employee ID"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="employeeName" className="form-label">
                  Employee Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter employee name"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="projectCode" className="form-label">
                  Project Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectCode"
                  placeholder="Enter project code"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="fromDate" className="form-label">
                  From Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fromDate"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="toDate" className="form-label">
                  To Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="toDate"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="totalAmount" className="form-label">
                  Total Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="totalAmount"
                  placeholder="Enter total amount"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="claimAmount" className="form-label">
                  Claim Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="claimAmount"
                  placeholder="Enter claim amount"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="claimDescription" className="form-label">
                Claim Description
              </label>
              <textarea
                className="form-control"
                id="claimDescription"
                rows="3"
                placeholder="Enter claim description"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="form-label">
                Message to Employee
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
                placeholder="Enter message"
              ></textarea>
            </div>

            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setIsExpenseDialogOpen(true)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Expenses
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      </div>

      {isExpenseDialogOpen && (
        <>
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Expense</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsExpenseDialogOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="expenseName" className="form-label">
                      Expense Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="expenseName"
                      placeholder="Enter expense name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="details" className="form-label">
                      Details
                    </label>
                    <textarea
                      className="form-control"
                      id="details"
                      rows="3"
                      placeholder="Enter expense details"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="receipt" className="form-label">
                      Receipt
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        id="receipt"
                        accept="image/*,.pdf"
                      />
                      <button className="btn btn-outline-secondary" type="button">
                        <i className="fas fa-upload"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setIsExpenseDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleAddExpense}
                  >
                    Add Expense
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewClaim;