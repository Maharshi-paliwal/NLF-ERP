// src/pages/ApprovedQuotes.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Pagination, Badge } from "react-bootstrap";
import { quotations as initialQuotations } from "../../data/mockdata";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const ApprovedQuotes = ({ section }) => {
  const [quotes, setQuotes] = useState(initialQuotations);
  const [approvedQuotes, setApprovedQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 10;

  // Utility → get latest round of each quotation
  const getLatestRounds = (quotations) =>
    quotations.map((q) => {
      if (!q.rounds || q.rounds.length === 0) return { ...q, latestRound: null };
      const latestRound = [...q.rounds].sort(
        (a, b) => parseInt(b.round.substring(1)) - parseInt(a.round.substring(1))
      )[0];
      return { ...q, latestRound };
    });

  // Effect → only approved quotes
  useEffect(() => {
    const latestRounds = getLatestRounds(quotes);
    const filtered = latestRounds.filter(
      (q) => q.latestRound && q.latestRound.status.toLowerCase() === "approved"
    );
    // NOTE: For the sake of showing the new columns (quantity),
    // you'll need to ensure your `initialQuotations` mock data
    // includes a `quantity` property on the `latestRound` object.
    setApprovedQuotes(filtered);
  }, [quotes]);

  // Filtering + Pagination
  const filterAndPaginateQuotes = (quotesToFilter) => {
    const filtered = quotesToFilter.filter((q) => {
      const term = searchTerm.toLowerCase();
      const latestRound = q.latestRound;
      if (!latestRound) return false;
      // Added latestRound.quantity to the searchable values
      const valuesToSearch = `${q.quotationId} ${q.customer.name} ${latestRound.date} ${latestRound.amount} ${latestRound.quantity}`.toLowerCase();
      return valuesToSearch.includes(term);
    });

    const indexOfLast = currentPage * quotesPerPage;
    const indexOfFirst = indexOfLast - quotesPerPage;
    const current = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / quotesPerPage);
    return { current, totalPages };
  };

  const { current: currentApprovedQuotes, totalPages } =
    filterAndPaginateQuotes(approvedQuotes);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Dynamic section title (Design / Store / Accounts)
  const sectionTitle =
    section === "design"
      ? "Design Team"
      : section === "store"
      ? "Store Team"
      : section === "accounts"
      ? "Accounts Team"
      : "Admin";

  // --- NEW LOGIC: Dynamic Column Headers ---
  const getTableHeaders = () => {
    const baseHeaders = ["Sr. No.", "Quote No.", "Name", "Date"];

    if (section === "design" || section === "store") {
      // Design/Store: Rate column is replaced by Quantity
      return [...baseHeaders, "Quantity", "Actions"];
    } else if (section === "accounts") {
      // Accounts: Show both Rate and Quantity
      return [...baseHeaders, "Quantity", "Rate", "Actions"];
    }
    // Default or Admin: Show Rate (or modify as needed for Admin)
    return [...baseHeaders, "Rate", "Actions"];
  };

  const tableHeaders = getTableHeaders();
  // --- END NEW LOGIC ---

  // NOTE: You need to implement the handleViewOrder function or replace it
  // with a proper `Link` component to a view page.
  const handleViewOrder = (id) => {
    console.log(`Viewing order with ID: ${id}`);
    // In a real app, you would use navigate or a Link to go to the detail page.
    // Since the original code had the Link commented out and was using `oc.orderConfirmationId`,
    // which isn't defined here, I'll keep the console log for now, but you should
    // replace `oc.orderConfirmationId` in the JSX with `quote.quotationId` or the
    // actual ID needed for the detail page and uncomment the Link.
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0 fw-bold">{sectionTitle} - Generated Orders</h4>
              <Form.Control
                type="text"
                placeholder="Search by ID, Name, or Date..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: "20vw" }}
              />
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          style={
                            header === "Actions" ? { minWidth: "120px" } : {}
                          }
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentApprovedQuotes.length > 0 ? (
                      currentApprovedQuotes.map((quote, index) => (
                        <tr key={quote.quotationId}>
                          <td>{(currentPage - 1) * 10 + index + 1}</td>
                          <td>{quote.quotationId}</td>
                          <td>{quote.customer.name}</td>
                          <td>{quote.latestRound.date}</td>

                          {/* --- NEW LOGIC: Dynamic Columns for Quantity/Rate --- */}
                          {(section === "design" || section === "store") && (
                            <td>
                              {/* Assumes latestRound has a `quantity` property */}
                              {quote.latestRound.quantity || "N/A"} 
                            </td>
                          )}

                          {section === "accounts" && (
                            <>
                              <td>
                                {/* Assumes latestRound has a `quantity` property */}
                                {quote.latestRound.quantity || "N/A"}
                              </td>
                              <td>
                                ₹{" "}
                                {quote.latestRound.amount.toLocaleString("en-IN")}
                              </td>
                            </>
                          )}
                          {/* Fallback for Admin/Default (original rate column logic) */}
                          {(!section ||
                            (section !== "design" &&
                              section !== "store" &&
                              section !== "accounts")) && (
                            <td>
                              ₹{" "}
                              {quote.latestRound.amount.toLocaleString("en-IN")}
                            </td>
                          )}
                          {/* --- END NEW LOGIC --- */}

                          <td>
                            {/* Uncomment the Link and use quote.quotationId for the URL when ready */}
                         <Link 
    to={`/approved-quotes/${section}/details/${quote.quotationId}`} 
    className="btn btn-primary btn-sm"
  >
    <FaEye size={15} /> View
  </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={tableHeaders.length} className="text-center p-4">
                          No quotations have been approved yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center p-3">
                  <Pagination>
                    <Pagination.First
                      onClick={() => paginate(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => paginate(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApprovedQuotes;