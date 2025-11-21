// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//     Card,
//     Container,
//     Row,
//     Col,
//     Button,
//     Form,
//     Pagination,
//     Modal, // 1. IMPORT MODAL
// } from "react-bootstrap";
// import { FaEye, FaEdit, FaCheckCircle, FaEnvelope, FaFilePdf, FaDownload, FaUser } from "react-icons/fa";
// import { quotations as mockQuotations } from "../data/mockdata";

// // NOTE: You'll need to create or correctly reference this component.
// // Based on admin approval, it should be in the same relative path.
// import PDFPreview from "../components/PDFpreview.jsx"; // 2. IMPORT PDFPreview

// // Helper function to extract numeric value from round identifier for sorting
// const getRoundSortValue = (roundId) => {
//     if (!roundId || roundId === 'Initial') return 0;
//     // Assuming round identifiers are like 'R1', 'R2', etc.
//     const match = roundId.match(/^R(\d+)$/);
//     return match ? parseInt(match[1]) : 0;
// };

// export default function ClientLead() {
//     const [quotationRounds, setQuotationRounds] = useState([]);
//     const [loading, setLoading] = useState(false);
//     // State variables copied from AdminApproval
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [pendingAction, setPendingAction] = useState(null); // Added for completeness, though not currently used in this file's logic
//     // State variables for PDF preview
//     const [showPDFPreview, setShowPDFPreview] = useState(false); // 3. ADD PDF PREVIEW STATE
//     const [selectedQuotation, setSelectedQuotation] = useState(null); // 4. ADD SELECTED QUOTATION STATE

//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const roundsPerPage = 10;

//     const navigate = useNavigate();

//     // Modal handlers (for Confirm Modal - copied for completeness)
//     const handleShowModal = (action) => {
//         setPendingAction(action);
//         setShowConfirmModal(true);
//     };

//     const handleConfirmAction = () => {
//         if (pendingAction) pendingAction.execute();
//         setShowConfirmModal(false);
//         setPendingAction(null);
//     };

//     const handleCancelAction = () => {
//         setShowConfirmModal(false);
//         setPendingAction(null);
//     };

//     // PDF Preview handlers (copied from AdminApproval)
//     const handleShowPDFPreview = (quotationData) => { // 5. IMPLEMENT SHOW PDF PREVIEW
//         console.log("Opening PDF preview for:", quotationData);
//         // Note: The quotationData passed here is the flattened round object
//         // For the PDF component to work, it might need the full quote object from mockQuotations.
//         // For now, we pass the flattened round and assume PDFPreview can handle it or fetch what it needs.
//         // In a real application, you might need to find the full quote object here.

//         // Find the full quotation object based on the round's quotationId
//         const fullQuoteData = mockQuotations.flat().find(q => q.quotationId === quotationData.quotationId);

//         // Pass the full quote data to the PDF preview component
//         setSelectedQuotation(fullQuoteData);
//         setShowPDFPreview(true);
//     };

//     const handleClosePDFPreview = () => { // 6. IMPLEMENT CLOSE PDF PREVIEW
//         setShowPDFPreview(false);
//         setSelectedQuotation(null);
//     };

//     // Helper function to check if this is the latest iteration for a quotation
//     const isLatestIteration = (quotationId, roundIdentifier, allRounds) => {
//         // Get all rounds for this quotation ID
//         const quotationRounds = allRounds.filter(r => r.quotationId === quotationId);

//         // Find the latest round by comparing round values
//         const latestRound = quotationRounds.reduce((latest, current) => {
//             const latestValue = getRoundSortValue(latest.roundIdentifier);
//             const currentValue = getRoundSortValue(current.roundIdentifier);
//             // This is a slight correction in logic to handle the initial case better
//             if (!latest) return current;
//             return currentValue > latestValue ? current : latest;
//         }, quotationRounds[0]);

//         return latestRound.roundIdentifier === roundIdentifier;
//     };

//     useEffect(() => {
//         const fetchQuotationRounds = async () => {
//             try {
//                 setLoading(true);

//                 const allQuotationRounds = [];

//                 // Flatten the data
//                 mockQuotations.forEach((item) => {
//                     const quotes = Array.isArray(item) ? item : [item];

//                     quotes.forEach((q) => {
//                         if (!q || !q.customer || !q.customer.name || !q.quotationId) {
//                             console.warn("Skipping incomplete quotation entry:", q);
//                             return;
//                         }

//                         const baseData = {
//                             name: q.customer.name,
//                             email: q.customer.email,
//                             mobile: q.customer.mobile,
//                             id: q.customer.id,
//                             quotationId: q.quotationId,
//                             // Added amount to the base data, which is useful for the table but not strictly necessary for this task
//                             amount: q.amount,
//                         };

//                         if (q.rounds && q.rounds.length > 0) {
//                             q.rounds.forEach((round) => {
//                                 const isDraftRound = round.round === "";
//                                 const revisionIdentifier = isDraftRound ? "Initial" : round.round;

//                                 const fullQuotationId = isDraftRound
//                                     ? q.quotationId
//                                     : `${q.quotationId}-${round.round}`;

//                                 allQuotationRounds.push({
//                                     ...baseData,
//                                     key: `${q.quotationId}-${revisionIdentifier}`,
//                                     fullQuotationId: fullQuotationId,
//                                     roundIdentifier: revisionIdentifier,
//                                     roundStatus: isDraftRound ? "draft" : round.status, // Use 'draft' as status if round is empty
//                                     roundDate: round.date,
//                                 });
//                             });
//                         } else {
//                             allQuotationRounds.push({
//                                 ...baseData,
//                                 key: `${q.quotationId}-initial`,
//                                 fullQuotationId: q.quotationId,
//                                 roundIdentifier: "Initial",
//                                 roundStatus: "draft", // Use 'draft' as status if no rounds exist
//                                 roundDate: q.customer.date || "",
//                             });
//                         }
//                     });
//                 });

//                 // Group by quotationId and then sort within each group (to ensure latest round logic works)
//                 const groupedRounds = new Map();
//                 allQuotationRounds.forEach(round => {
//                     const id = round.quotationId;
//                     if (!groupedRounds.has(id)) {
//                         groupedRounds.set(id, []);
//                     }
//                     groupedRounds.get(id).push(round);
//                 });

//                 let finalSortedRounds = [];
//                 groupedRounds.forEach((roundsArray) => {
//                     roundsArray.sort((a, b) => {
//                         const valA = getRoundSortValue(a.roundIdentifier);
//                         const valB = getRoundSortValue(b.roundIdentifier);
//                         return valB - valA;
//                     });

//                     finalSortedRounds.push(...roundsArray);
//                 });

//                 setQuotationRounds(finalSortedRounds);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchQuotationRounds();
//     }, []);

//     const handleViewClient = (id) => {
//         // This is still a console log as it was in the original code
//         console.log(`Viewing client details for ID: ${id}`);
//     };

//     const handleConvertToPO = (quotationId, roundIdentifier) => {
//         const roundPart = roundIdentifier === 'Initial' ? 'initial' : roundIdentifier;
//         const path = `/po/new/${quotationId}/${roundPart}`;
//         navigate(path);
//     };

//     const handleCreateRevision = (quotationId, roundIdentifier) => {
//         navigate(`/quotations/${quotationId}/new-revision`);
//     };

//     // The old simple handleShowPDFPreview has been replaced by the implemented one above.

//     // Filter logic 
//     const filteredRounds = quotationRounds.filter((r) => {
//         const term = searchTerm.toLowerCase();
//         const valuesToSearch = `${r.name} ${r.quotationId} ${r.fullQuotationId} ${r.roundIdentifier} ${r.roundDate} ${r.roundStatus}`.toLowerCase();
//         return valuesToSearch.includes(term);
//     });

//     // Pagination Logic
//     const indexOfLastRound = currentPage * roundsPerPage;
//     const indexOfFirstRound = indexOfLastRound - roundsPerPage;

//     const currentRounds = filteredRounds.slice(
//         indexOfFirstRound,
//         indexOfLastRound
//     );
//     const totalPages = Math.ceil(filteredRounds.length / roundsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <Container fluid>
//             <Row>
//                 <Col md="12">
//                     <Card className="strpied-tabled-with-hover">
//                         <Card.Header
//                             style={{
//                                 backgroundColor: "#fff",
//                                 borderBottom: "none",
//                             }}
//                         >
//                             <Row className="align-items-center">
//                                 <Col className="d-flex align-items-center">
//                                     <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
//                                         Quotation Rounds
//                                     </Card.Title>
//                                 </Col>
//                                 <Col className="d-flex justify-content-end align-items-center gap-2">
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Search by Name, Quote No, Revision, Status..."
//                                         value={searchTerm}
//                                         onChange={(e) => {
//                                             setSearchTerm(e.target.value);
//                                             setCurrentPage(1);
//                                         }}
//                                         className="custom-searchbar-input nav-search"
//                                         style={{ width: "20vw" }}
//                                     />
//                                     <Button as={Link} to="/new-quotation" className="add-customer-btn btn btn-primary">
//                                         + Create Quotation
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         </Card.Header>

//                         <Card.Body className="table-full-width table-responsive d-flex justify-content-center align-items-center">
//                             <div className="table-responsive">
//                                 <table className="table table-striped table-hover">
//                                     <thead>
//                                         <tr>
//                                             <th>Sr. no</th>
//                                             <th>Name</th>
//                                             <th>Quote No</th>
//                                             <th>Revision</th>
//                                             <th>Round Date</th>
//                                             <th>Status</th>
//                                             <th style={{ minWidth: '120px' }}>PO Action</th>
//                                             <th style={{ minWidth: '150px' }}>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {loading ? (
//                                             <tr>
//                                                 <td colSpan="8" className="text-center p-4">
//                                                     Loading quotations...
//                                                 </td>
//                                             </tr>
//                                         ) : currentRounds.length > 0 ? (
//                                             currentRounds.map((round, index) => {
//                                                 const isLatest = isLatestIteration(
//                                                     round.quotationId,
//                                                     round.roundIdentifier,
//                                                     quotationRounds
//                                                 );
//                                                 const showCreateRevision = isLatest && round.roundStatus === 'revise';

//                                                 return (
//                                                     <tr key={round.key}>
//                                                         <td>{indexOfFirstRound + index + 1}</td>
//                                                         <td>{round.name}</td>
//                                                         <td>{round.fullQuotationId}</td>
//                                                         <td>
//                                                             {round.roundIdentifier && round.roundIdentifier !== 'Initial'
//                                                                 ? round.roundIdentifier
//                                                                 : "-"}
//                                                         </td>
//                                                         <td>{round.roundDate || "-"}</td>
//                                                         <td>
//                                                             <span
//                                                                 className={`badge ${round.roundStatus === 'accepted' ? 'bg-success' :
//                                                                     round.roundStatus === 'revise' ? 'bg-warning' :
//                                                                         round.roundStatus === 'pending' ? 'bg-info' :
//                                                                             round.roundStatus === 'draft' ? 'bg-secondary' :
//                                                                                 'bg-secondary'
//                                                                     }`}
//                                                             >
//                                                                 {round.roundStatus || 'draft'}
//                                                             </span>
//                                                         </td>

//                                                         {/* Convert to PO Button */}
//                                                         <td data-label="PO Action">
//                                                             {round.roundStatus === 'accepted' && (
//                                                                 <Button
//                                                                     variant="success"
//                                                                     size="sm"
//                                                                     onClick={() => handleConvertToPO(round.quotationId, round.roundIdentifier)}
//                                                                     style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
//                                                                 >
//                                                                     Convert to PO
//                                                                 </Button>
//                                                             )}
//                                                         </td>

//                                                         <td data-label="Actions">
//                                                             <div className="table-actions d-flex gap-3">
//                                                                 {/* Show Create Revision Button OR View Button */}
//                                                                 {showCreateRevision ? (
//                                                                     <button
//                                                                         className="btn btn-sm btn-warning"
//                                                                         style={{ padding: '0.3rem 0.5rem' }}
//                                                                         onClick={() => handleCreateRevision(round.quotationId, round.roundIdentifier)}
//                                                                         title="Create Revision"
//                                                                     >
//                                                                         <FaEdit size={15} />
//                                                                     </button>
//                                                                 ) : (
//                                                                     <Link to={`/quotations/${round.quotationId}/${round.roundIdentifier || 'initial'}?view=true`}>
//                                                                         <button
//                                                                             className="buttonEye"
//                                                                             style={{ color: "white" }}
//                                                                             onClick={() => handleViewClient(round.id)}
//                                                                             title="View Quotation"
//                                                                         >
//                                                                             <FaEye size={15} />
//                                                                         </button>
//                                                                     </Link>
//                                                                 )}

//                                                                 {/* Download PDF button — only if accepted */}
//                                                                 {round.roundStatus === 'accepted' ? (
//                                                                     <button
//                                                                         className="btn btn-sm btn-outline-secondary" // Added bootstrap classes for style
//                                                                         style={{ color: "red" }}
//                                                                         title="Preview & Download Quotation" // Changed title to match AdminApproval.jsx
//                                                                         onClick={(e) => {
//                                                                             e.stopPropagation();
//                                                                             handleShowPDFPreview(round); // Now calls the state-updating function
//                                                                         }}
//                                                                     >
//                                                                         <FaDownload size={15} />
//                                                                     </button>


//                                                                 ) : (
// ""
//                                                                 )}
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="8" className="text-center p-4">
//                                                     No quotations found.
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </Card.Body>

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="d-flex justify-content-center p-3">
//                                 <Pagination>
//                                     <Pagination.First
//                                         onClick={() => paginate(1)}
//                                         disabled={currentPage === 1}
//                                     />
//                                     <Pagination.Prev
//                                         onClick={() => paginate(currentPage - 1)}
//                                         disabled={currentPage === 1}
//                                     />
//                                     {Array.from({ length: totalPages }, (_, i) => (
//                                         <Pagination.Item
//                                             key={i + 1}
//                                             active={i + 1 === currentPage}
//                                             onClick={() => paginate(i + 1)}
//                                         >
//                                             {i + 1}
//                                         </Pagination.Item>
//                                     ))}
//                                     <Pagination.Next
//                                         onClick={() => paginate(currentPage + 1)}
//                                         disabled={currentPage === totalPages}
//                                     />
//                                     <Pagination.Last
//                                         onClick={() => paginate(totalPages)}
//                                         disabled={currentPage === totalPages}
//                                     />
//                                 </Pagination>
//                             </div>
//                         )}
//                     </Card>
//                 </Col>
//             </Row>

//             {/* 7. PDF Preview Modal (Copied from AdminApproval) */}
//             <PDFPreview
//                 show={showPDFPreview}
//                 onHide={handleClosePDFPreview}
//                 quotationData={selectedQuotation}
//             />
//         </Container>
//     );
// }


// ClientLead.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  Pagination,
  Modal,
} from "react-bootstrap";
import {
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaEnvelope,
  FaFilePdf,
  FaDownload,
  FaUser, // ✅ Imported FaUser
} from "react-icons/fa";
import { quotations as mockQuotations } from "../data/mockdata";
import PDFPreview from "../components/PDFpreview.jsx";
import PDFClientPO from "../components/PDFClientPO.jsx"; 
import { po as poData } from "../data/mockdata";

// Helper function to extract numeric value from round identifier for sorting
const getRoundSortValue = (roundId) => {
  if (!roundId || roundId === "Initial") return 0;
  const match = roundId.match(/^R(\d+)$/);
  return match ? parseInt(match[1]) : 0;
};

export default function ClientLead() {
  const [quotationRounds, setQuotationRounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roundsPerPage = 10;
  const [showPDFClientPO, setShowPDFClientPO] = useState(false);
const [selectedPO, setSelectedPO] = useState(null);

  const navigate = useNavigate();

  // Modal handlers (kept for completeness)
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

  // PDF Preview handlers
  const handleShowPDFPreview = (quotationData) => {
    const fullQuoteData = mockQuotations.flat().find(
      (q) => q.quotationId === quotationData.quotationId
    );
    setSelectedQuotation(fullQuoteData);
    setShowPDFPreview(true);
  };

  const handleClosePDFPreview = () => {
    setShowPDFPreview(false);
    setSelectedQuotation(null);
  };

  const handleShowPDFClientPO = (quotationId, roundIdentifier) => {
  // Find PO that matches quotationId and quotationRound
  const matchedPO = poData.find(p => 
    p.quotationId === quotationId && 
    p.quotationRound === (roundIdentifier === 'Initial' ? '' : roundIdentifier)
  );

  if (matchedPO) {
    setSelectedPO(matchedPO);
    setShowPDFClientPO(true);
  } else {
    // Optional: fallback to client view if no PO
    const round = quotationRounds.find(r => r.quotationId === quotationId && r.roundIdentifier === roundIdentifier);
    if (round?.id) {
      navigate(`/clients/${round.id}`);
    }
  }
};

const handleClosePDFClientPO = () => {
  setShowPDFClientPO(false);
  setSelectedPO(null);
};

  // Helper: Check if round is the latest for its quotation
  const isLatestIteration = (quotationId, roundIdentifier, allRounds) => {
    const quotationRounds = allRounds.filter((r) => r.quotationId === quotationId);
    const latestRound = quotationRounds.reduce((latest, current) => {
      const latestValue = getRoundSortValue(latest?.roundIdentifier || "Initial");
      const currentValue = getRoundSortValue(current.roundIdentifier);
      if (!latest) return current;
      return currentValue > latestValue ? current : latest;
    }, null);
    return latestRound?.roundIdentifier === roundIdentifier;
  };

  // Fetch and flatten quotation rounds
  useEffect(() => {
    const fetchQuotationRounds = async () => {
      try {
        setLoading(true);
        const allQuotationRounds = [];

        mockQuotations.forEach((item) => {
          const quotes = Array.isArray(item) ? item : [item];
          quotes.forEach((q) => {
            if (!q || !q.customer?.name || !q.quotationId) {
              console.warn("Skipping incomplete quotation:", q);
              return;
            }

            const baseData = {
              name: q.customer.name,
              email: q.customer.email,
              mobile: q.customer.mobile,
              id: q.customer.id, // ✅ This becomes the client ID
              quotationId: q.quotationId,
              amount: q.amount,
            };

            if (q.rounds && q.rounds.length > 0) {
              q.rounds.forEach((round) => {
                const isDraftRound = round.round === "";
                const revisionIdentifier = isDraftRound ? "Initial" : round.round;
                const fullQuotationId = isDraftRound
                  ? q.quotationId
                  : `${q.quotationId}-${round.round}`;

                allQuotationRounds.push({
                  ...baseData,
                  key: `${q.quotationId}-${revisionIdentifier}`,
                  fullQuotationId,
                  roundIdentifier: revisionIdentifier,
                  roundStatus: isDraftRound ? "draft" : round.status,
                  roundDate: round.date,
                });
              });
            } else {
              allQuotationRounds.push({
                ...baseData,
                key: `${q.quotationId}-initial`,
                fullQuotationId: q.quotationId,
                roundIdentifier: "Initial",
                roundStatus: "draft",
                roundDate: q.customer.date || "",
              });
            }
          });
        });

        // Group and sort rounds (latest first per quotation)
        const groupedRounds = new Map();
        allQuotationRounds.forEach((round) => {
          const id = round.quotationId;
          if (!groupedRounds.has(id)) {
            groupedRounds.set(id, []);
          }
          groupedRounds.get(id).push(round);
        });

        let finalSortedRounds = [];
        groupedRounds.forEach((roundsArray) => {
          roundsArray.sort((a, b) => {
            const valA = getRoundSortValue(a.roundIdentifier);
            const valB = getRoundSortValue(b.roundIdentifier);
            return valB - valA;
          });
          finalSortedRounds.push(...roundsArray);
        });

        setQuotationRounds(finalSortedRounds);
      } catch (error) {
        console.error("Error fetching quotation rounds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotationRounds();
  }, []);

  const handleConvertToPO = (quotationId, roundIdentifier) => {
    const roundPart = roundIdentifier === "Initial" ? "initial" : roundIdentifier;
    navigate(`/po/new/${quotationId}/${roundPart}`);
  };

  const handleCreateRevision = (quotationId, roundIdentifier) => {
    navigate(`/quotations/${quotationId}/new-revision`);
  };

  // Filter & paginate
  const filteredRounds = quotationRounds.filter((r) => {
    const term = searchTerm.toLowerCase();
    const valuesToSearch = `${r.name} ${r.quotationId} ${r.fullQuotationId} ${r.roundIdentifier} ${r.roundDate} ${r.roundStatus}`.toLowerCase();
    return valuesToSearch.includes(term);
  });

  const indexOfLastRound = currentPage * roundsPerPage;
  const indexOfFirstRound = indexOfLastRound - roundsPerPage;
  const currentRounds = filteredRounds.slice(indexOfFirstRound, indexOfLastRound);
  const totalPages = Math.ceil(filteredRounds.length / roundsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header
              style={{
                backgroundColor: "#fff",
                borderBottom: "none",
              }}
            >
              <Row className="align-items-center">
                <Col className="d-flex align-items-center">
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    Quotation Rounds
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Search by Name, Quote No, Revision, Status..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="custom-searchbar-input nav-search"
                    style={{ width: "20vw" }}
                  />
                  <Button as={Link} to="/new-quotation" className="add-customer-btn btn btn-primary">
                    + Create Quotation
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Sr. no</th>
                      <th>Name</th>
                      <th>Quote No</th>
                      <th>Revision</th>
                      <th>Round Date</th>
                      <th>Status</th>
                      <th style={{ minWidth: "120px" }}>PO Action</th>
                      <th style={{ minWidth: "180px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center p-4">
                          Loading quotations...
                        </td>
                      </tr>
                    ) : currentRounds.length > 0 ? (
                      currentRounds.map((round, index) => {
                        const isLatest = isLatestIteration(
                          round.quotationId,
                          round.roundIdentifier,
                          quotationRounds
                        );
                        const showCreateRevision = isLatest && round.roundStatus === "revise";

                        return (
                          <tr key={round.key}>
                            <td>{indexOfFirstRound + index + 1}</td>
                            <td>{round.name}</td>
                            <td>{round.fullQuotationId}</td>
                            <td>
                              {round.roundIdentifier && round.roundIdentifier !== "Initial"
                                ? round.roundIdentifier
                                : "-"}
                            </td>
                            <td>{round.roundDate || "-"}</td>
                            <td>
                              <span
                                className={`badge ${
                                  round.roundStatus === "accepted"
                                    ? "bg-success"
                                    : round.roundStatus === "revise"
                                    ? "bg-warning"
                                    : round.roundStatus === "pending"
                                    ? "bg-info"
                                    : round.roundStatus === "draft"
                                    ? "bg-secondary"
                                    : "bg-secondary"
                                }`}
                              >
                                {round.roundStatus || "draft"}
                              </span>
                            </td>

                            {/* Convert to PO Button */}
                            <td data-label="PO Action">
                              {round.roundStatus === "accepted" && (
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() =>
                                    handleConvertToPO(round.quotationId, round.roundIdentifier)
                                  }
                                  style={{ padding: "0.3rem 0.6rem", fontSize: "0.85rem" }}
                                >
                                  Convert to PO
                                </Button>
                              )}
                            </td>

                            {/* Actions Column */}
                            <td data-label="Actions">
                              <div className="table-actions d-flex gap-3">
                                {/* View Quotation or Create Revision */}
                                {showCreateRevision ? (
                                  <button
                                    className="btn btn-sm btn-warning"
                                    style={{ padding: "0.3rem 0.5rem" }}
                                    onClick={() =>
                                      handleCreateRevision(round.quotationId, round.roundIdentifier)
                                    }
                                    title="Create Revision"
                                  >
                                    <FaEdit size={15} />
                                  </button>
                                ) : (
                                  <Link
                                    to={`/quotations/${round.quotationId}/${round.roundIdentifier || "initial"}?view=true`}
                                  >
                                    <button
                                      className="buttonEye"
                                      style={{ color: "white" }}
                                      title="View Quotation"
                                    >
                                      <FaEye size={15} />
                                    </button>
                                  </Link>
                                )}

                              

                                {/* Download PDF Button */}
                               {round.roundStatus === 'accepted' ? (
  <>

      <button
      className="btn btn-sm btn-outline-secondary"
      style={{ color: "red" }}
      title="Preview & Download Quotation"
      onClick={(e) => {
        e.stopPropagation();
        handleShowPDFPreview(round);
      }}
    >
      <FaDownload size={15} />
    </button>
   <button
  className="btn btn-sm btn-dark text-white"
  title={poData.some(p => 
    p.quotationId === round.quotationId && 
    p.quotationRound === (round.roundIdentifier === 'Initial' ? '' : round.roundIdentifier)
  ) 
    ? "Preview Purchase Order (PDF)" 
    : "View Client Details"}
  onClick={(e) => {
    e.stopPropagation();
    handleShowPDFClientPO(round.quotationId, round.roundIdentifier);
  }}
>
  <FaUser size={15} /> 
</button>


  
  </>
) : null}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center p-4">
                          No quotations found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card.Body>

            {/* Pagination */}
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
          </Card>
        </Col>
      </Row>

      {/* PDF Preview Modal */}
      <PDFPreview
        show={showPDFPreview}
        onHide={handleClosePDFPreview}
        quotationData={selectedQuotation}
      />

      <PDFClientPO
  show={showPDFClientPO}
  onHide={handleClosePDFClientPO}
  poData={selectedPO}
/>
    </Container>
  );
}