import React, { useState } from "react";
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
// Ensure this mockdata includes the 'rateApprovalStatus' at the top level of the quote object
import { quotations, workOrders } from "../data/mockdata.js";
import { FaDownload } from "react-icons/fa";
import PDFPreview from "../components/PDFpreview.jsx";

const AdminApproval = () => {
    const [quotes, setQuotes] = useState(quotations);
    const [workOrdersState, setWorkOrdersState] = useState(workOrders);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("rate"); // Default to 'rate'
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [showPDFPreview, setShowPDFPreview] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const quotesPerPage = 10;

    // Modal handlers
    const handleShowModal = (action) => {
        setPendingAction(action);
        setShowConfirmModal(true);
    };

    const handleConfirmAction = () => {
        if (pendingAction) pendingAction.execute();
        setShowConfirmModal(false);
        setPendingAction(null);
    };

    const handleCancelAction = () => {
        setShowConfirmModal(false);
        setPendingAction(null);
    };

    // PDF Preview handlers - FIXED TO PASS FULL QUOTATION DATA
    const handleShowPDFPreview = (itemData) => {
        // If itemData is just the table row data, find and pass the full quotation object
        let fullQuotationData = itemData;

        if (itemData.quotationId && !itemData.rounds) {
            // This is table row data, find the full quotation
            const fullQuote = quotes.find(q => q.quotationId === itemData.quotationId);
            fullQuotationData = fullQuote || itemData;
        }

        setSelectedItem(fullQuotationData);
        setShowPDFPreview(true);
    };

    const handleClosePDFPreview = () => {
        setShowPDFPreview(false);
        setSelectedItem(null);
    };

    // --- Handlers for each approval type ---
    const handleApproveRate = (quotationId) => {
        const action = {
            type: "approve_rate",
            quotationId,
            message:
                "Are you sure you want to approve this Rate? This will mark the initial rate/revision rate as accepted.",
            execute: () => {
                setQuotes((prevQuotes) =>
                    prevQuotes.map((q) => {
                        if (q.quotationId === quotationId) {
                            return { ...q, rateApprovalStatus: "approved" };
                        }
                        return q;
                    })
                );
            },
        };
        handleShowModal(action);
    };

    const handleApproveQuotation = (quotationId) => {
        const action = {
            type: "approve_quotation",
            quotationId,
            message:
                "Are you sure you want to approve this Quotation? This will permanently accept the latest revision.",
            execute: () => {
                setQuotes((prevQuotes) =>
                    prevQuotes.map((q) => {
                        if (q.quotationId === quotationId && q.rounds?.length > 0) {
                            const sortedRounds = [...q.rounds].sort(
                                (a, b) =>
                                    parseInt(b.round?.substring(1) || 0) -
                                    parseInt(a.round?.substring(1) || 0)
                            );
                            const latestRoundIdentifier = sortedRounds[0].round;
                            const updatedRounds = q.rounds.map((round) =>
                                round.round === latestRoundIdentifier
                                    ? { ...round, status: "accepted", approval: "admin-approved" }
                                    : round
                            );
                            return { ...q, rounds: updatedRounds };
                        }
                        return q;
                    })
                );
            },
        };
        handleShowModal(action);
    };

    const handleApproveWorkOrder = (workOrderId) => {
        const action = {
            type: "approve_work_order",
            workOrderId,
            message:
                "Are you sure you want to approve this Work Order? This will mark it as confirmed",
            execute: () => {
                setWorkOrdersState((prev) =>
                    prev.map((wo) =>
                        wo.workOrderId === workOrderId
                            ? { ...wo, approvalStatus: "approved" }
                            : wo
                    )
                );
            },
        };
        handleShowModal(action);
    };

    // --- CENTRALIZED FILTERING LOGIC ---
    const getTabData = (tabKey) => {
        const term = searchTerm.toLowerCase();

        if (tabKey === "rate") {
            const filteredData = quotes.reduce((acc, quote) => {
                const isRelevant = ["pending", "approved"].includes(quote.rateApprovalStatus);
                if (!isRelevant) return acc;

                const quoteRounds = quote.rounds || [];
                const sortedRounds = [...quoteRounds].sort(
                    (a, b) =>
                        parseInt(b.round?.substring(1) || 0) -
                        parseInt(a.round?.substring(1) || 0)
                );
                const latestRoundIdentifier = sortedRounds.length > 0 ? sortedRounds[0].round : "";

                const roundsToDisplay = quoteRounds.length > 0 ? quoteRounds : [{
                    date: "Initial Draft",
                    amount: quote.amount || 0,
                    round: ""
                }];

                const mappedRounds = roundsToDisplay.map((round) => {
                    const isLatestRound = round.round === latestRoundIdentifier;
                    const isPendingActionableRound = isLatestRound && quote.rateApprovalStatus === "pending";

                    const item = {
                        quotationId: quote.quotationId,
                        customer: quote.customer,
                        round: round.round,
                        date: round.date,
                        amount: round.amount,
                        isRateApproved: quote.rateApprovalStatus === "approved",
                        isRatePending: quote.rateApprovalStatus === "pending",
                        isPendingActionableRound: isPendingActionableRound,
                        // FIXED: Include the full quote object for PDF preview
                        fullQuotation: quote,
                    };

                    const searchValues = `${item.quotationId || ''} ${item.customer?.name || ''} ${item.date || ''} ${item.amount || ''} ${quote.rateApprovalStatus}`.toLowerCase();
                    return searchValues.includes(term) ? item : null;
                }).filter(item => item !== null);

                return acc.concat(mappedRounds);
            }, []);

            const indexOfLastItem = currentPage * quotesPerPage;
            const indexOfFirstItem = indexOfLastItem - quotesPerPage;
            const current = filteredData.slice(indexOfFirstItem, indexOfLastItem);
            const totalPages = Math.ceil(filteredData.length / quotesPerPage);

            return { current, totalPages, isWorkOrder: false };

        } else if (tabKey === "quotation_approval") {
            const filteredData = quotes.reduce((acc, quote) => {
                const latestRound = quote.rounds ?
                    [...quote.rounds].sort(
                        (a, b) => parseInt(b.round?.substring(1) || 0) - parseInt(a.round?.substring(1) || 0)
                    )[0] : null;

                if (!latestRound) return acc;

                const status = latestRound.status?.toLowerCase() || "";
                const isQuotationApprovalFlow = ["revise", "accepted", "approved"].includes(status);
                if (!isQuotationApprovalFlow) return acc;

                const item = {
                    quotationId: quote.quotationId,
                    customer: quote.customer,
                    round: latestRound.round,
                    date: latestRound.date,
                    amount: latestRound.amount,
                    isQuotationApproved: ["accepted", "approved"].includes(status),
                    isQuotationPending: status === "revise",
                    // FIXED: Include the full quote object for PDF preview
                    fullQuotation: quote,
                };

                const searchValues = `${item.quotationId} ${item.customer?.name} ${item.date} ${item.amount} ${status}`.toLowerCase();
                return searchValues.includes(term) ? acc.concat(item) : acc;
            }, []);

            const indexOfLastItem = currentPage * quotesPerPage;
            const indexOfFirstItem = indexOfLastItem - quotesPerPage;
            const current = filteredData.slice(indexOfFirstItem, indexOfLastItem);
            const totalPages = Math.ceil(filteredData.length / quotesPerPage);

            return { current, totalPages, isWorkOrder: false };

        } else if (tabKey === "work_order") {
            const filtered = workOrdersState
                .map(wo => ({
                    ...wo,
                    approvalStatus: wo.approvalStatus || "pending"
                }))
                .filter(wo => {
                    const matchesSearch = `${wo.workOrderId} ${wo.customerName} ${wo.woDate} ${wo.totalAmount}`.toLowerCase().includes(term);
                    return matchesSearch && wo.approvalStatus === "pending";
                });

            const indexOfLastItem = currentPage * quotesPerPage;
            const indexOfFirstItem = indexOfLastItem - quotesPerPage;
            const current = filtered.slice(indexOfFirstItem, indexOfLastItem);
            const totalPages = Math.ceil(filtered.length / quotesPerPage);

            return { current, totalPages, isWorkOrder: true };

        } else {
            return { current: [], totalPages: 0, isWorkOrder: false };
        }
    };

    const { current: currentTabData, totalPages: totalTabPages, isWorkOrder = false } = getTabData(activeTab);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const currentApproveHandler =
        activeTab === "rate" ? handleApproveRate :
        activeTab === "quotation_approval" ? handleApproveQuotation :
        activeTab === "work_order" ? handleApproveWorkOrder :
        null;

    const titlePrefix =
        activeTab === "rate" ? "Rate" :
        activeTab === "quotation_approval" ? "Quotation" :
        "Work Order";

    return (
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                        <Tabs
                            id="approval-tabs"
                            activeKey={activeTab}
                            onSelect={(k) => {
                                setActiveTab(k);
                                setSearchTerm("");
                                setCurrentPage(1);
                            }}
                            className="mb-0 card-top-tabs"
                        >
                            <Tab eventKey="rate" title="Rate Approval" />
                            <Tab eventKey="quotation_approval" title="Quotation Approval" />
                            <Tab eventKey="work_order" title="Work Order Approval" />
                            <Tab eventKey="PO" title="PO Vendor Approval" />
                        </Tabs>

                        <Card.Header
                            style={{ backgroundColor: "#fff", marginBottom: "2rem", borderBottom: "none" }}
                        >
                            <Row className="align-items-center">
                                <Col className="d-flex align-items-center">
                                    <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                                        Admin's Approval
                                    </Card.Title>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center gap-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search by ID, Name, or Date..."
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
                            {(activeTab === "rate" || activeTab === "quotation_approval" || activeTab === "work_order") && (
                                <QuoteApprovalTable
                                    quotes={currentTabData}
                                    currentPage={currentPage}
                                    totalPages={totalTabPages}
                                    paginate={paginate}
                                    handleApproveQuote={currentApproveHandler}
                                    titlePrefix={titlePrefix}
                                    showConfirmModal={showConfirmModal}
                                    onShowPDFPreview={handleShowPDFPreview}
                                    isWorkOrder={isWorkOrder}
                                />
                            )}
                            {activeTab === "PO" && (
                                <div className="p-4 text-muted">Placeholder for PO Vendor Approval workflow.</div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showConfirmModal} onHide={handleCancelAction} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation Required</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <i className="fa fa-exclamation-triangle text-warning mb-3" style={{ fontSize: "48px" }}></i>
                    <p className="mb-0">
                        {pendingAction?.message ||
                            "Are you sure you want to proceed? This action cannot be reverted."}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelAction}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmAction}>
                        Yes, Proceed
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* PDF Preview Modal - FIXED: Now receives full quotation with officeBranch */}
            <PDFPreview
                show={showPDFPreview}
                onHide={handleClosePDFPreview}
                quotationData={selectedItem}
            />
        </Container>
    );
};

// --- Table Component ---
const QuoteApprovalTable = ({ 
    quotes, 
    currentPage, 
    totalPages, 
    paginate, 
    handleApproveQuote, 
    titlePrefix, 
    showConfirmModal, 
    onShowPDFPreview,
    isWorkOrder = false 
}) => (
    <>
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>{isWorkOrder ? "Work Order No." : "Quotation No / Round"}</th>
                        <th>Client Name</th>
                        <th>{isWorkOrder ? "WO Date" : "Revision Date"}</th>
                        <th>Amount (₹)</th>
                        <th>Approve {titlePrefix}</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.length > 0 ? (
                        quotes.map((item, index) => {
                            let isApproved, isPending, isActionable;

                            if (isWorkOrder) {
                                isApproved = item.approvalStatus === "approved";
                                isPending = item.approvalStatus === "pending";
                                isActionable = isPending;
                            } else if (titlePrefix === "Rate") {
                                isApproved = !item.isPendingActionableRound;
                                isPending = item.isPendingActionableRound;
                                isActionable = item.isPendingActionableRound;
                            } else {
                                isApproved = item.isQuotationApproved;
                                isPending = item.isQuotationPending;
                                isActionable = item.isQuotationPending;
                            }

                            return (
                                <tr key={isWorkOrder ? item.workOrderId : `${item.quotationId}-${item.round || 'initial'}`}>
                                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                                    <td>
                                        {isWorkOrder 
                                            ? item.workOrderId 
                                            : item.round 
                                                ? `${item.quotationId}-${item.round}` 
                                                : item.quotationId}
                                    </td>
                                    <td>{isWorkOrder ? item.customerName : (item.customer?.name || "Unknown")}</td>
                                    <td>{isWorkOrder ? item.woDate || "N/A" : item.date || "N/A"}</td>
                                    <td>₹ {(isWorkOrder ? item.totalAmount : item.amount || 0).toLocaleString("en-IN")}</td>
                                    <td className="text-center">
                                        <Form.Check
                                            type="checkbox"
                                            checked={isApproved}
                                            disabled={!isActionable || showConfirmModal}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                if (isActionable) {
                                                    handleApproveQuote(isWorkOrder ? item.workOrderId : item.quotationId);
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <Badge
                                                className={`px-3 py-2 ${isApproved ? "bg-success text-light" : "bg-warning text-dark"}`}
                                                style={{ minWidth: "80px" }}
                                            >
                                                {isApproved ? "Approved" : "Pending"}
                                            </Badge>

                                            {isApproved && (
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // FIXED: Pass the full quotation object
                                                        onShowPDFPreview(item.fullQuotation || item);
                                                    }}
                                                    title="Preview & Download"
                                                >
                                                    <FaDownload style={{ color: "red" }} />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center p-4">
                                No {titlePrefix.toLowerCase()}s awaiting approval.
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

export default AdminApproval;