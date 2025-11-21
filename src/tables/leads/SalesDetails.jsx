// // import React, { useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import {
// //     Card,
// //     Row,
// //     Col,
// //     Form,
// //     Badge,
// //     Container,
// //     Button,
// //     Modal,
// // } from "react-bootstrap";
// // import {
// //     FaArrowLeft,
// //     FaMapMarkerAlt,
// //     FaCalendarAlt,
// //     FaUserTie,
// //     FaPlus,
// //     FaTimesCircle, // New icon for rejection
// // } from "react-icons/fa";

// // // 1. Import the centralized, robust leads data instead of using the local hardcoded mock.
// // import { customerInteractions, salespersons } from "../../data/mockdata";

// // // NOTE: The mockLeadsWithInteractions constant has been removed from here.

// // // --- New Component: QuotationRejectModal (For dedicated quotation rejection) ---

// // /**
// //  * Modal for dedicatedly rejecting a quotation.
// //  */
// // const QuotationRejectModal = ({ show, handleClose, quotationId, handleSubmit }) => {
// //     // State for rejection reason
// //     const [rejectionReason, setRejectionReason] = useState("");

// //     const onSubmit = (e) => {
// //         e.preventDefault();
// //         handleSubmit(quotationId, rejectionReason); // Pass the quotationId and reason
// //         setRejectionReason(""); // Reset form
// //         handleClose();
// //     };

// //     return (
// //         <Modal show={show} onHide={handleClose} size="md">
// //             <Modal.Header closeButton className="bg-danger text-white">
// //                 <Modal.Title>
// //                     <FaTimesCircle className="me-2" /> Confirm Quotation Rejection
// //                 </Modal.Title>
// //             </Modal.Header>
// //             <Form onSubmit={onSubmit}>
// //                 <Modal.Body>
// //                     <p>
// //                         Are you sure the customer has rejected this quotation? This action will mark
// //                         the quote <strong>{quotationId}</strong> as lost/rejected.
// //                     </p>
// //                     {/* The Quotation ID is the key information that pops up */}
// //                     <Form.Group className="mb-3">
// //                         <Form.Label style={{ fontWeight: "700" }}>Quotation ID to Reject:</Form.Label>
// //                         <Form.Control type="text" readOnly defaultValue={quotationId || "N/A"} className="text-danger fw-bold" />
// //                     </Form.Group>
// //                     <Form.Group className="mb-3" controlId="formRejectionReason">
// //                         <Form.Label>Reason for Rejection <span className="text-danger">*</span></Form.Label>
// //                         <Form.Control
// //                             as="textarea"
// //                             rows={3}
// //                             value={rejectionReason}
// //                             onChange={(e) => setRejectionReason(e.target.value)}
// //                             placeholder="Please provide a detailed reason for rejection (e.g., pricing, features missing, timeline mismatch)."
// //                             required
// //                         />
// //                     </Form.Group>
// //                 </Modal.Body>
// //                 <Modal.Footer>
// //                     <Button variant="secondary" onClick={handleClose}>
// //                         Cancel
// //                     </Button>
// //                     <Button type="submit" variant="danger">
// //                         Confirm Rejection
// //                     </Button>
// //                 </Modal.Footer>
// //             </Form>
// //         </Modal>
// //     );
// // };

// // // --- Updated Component: InteractionModal ---

// // /**
// //  * Modal for logging a new client interaction/meeting.
// //  * NOTE: The "Rejected" status is removed from this modal to enforce the separate QuotationRejectModal flow.
// //  */
// // const InteractionModal = ({ show, handleClose, handleSubmit }) => {
// //     // State for the new interaction form data
// //     const [newInteraction, setNewInteraction] = useState({
// //         date: new Date().toISOString().substring(0, 10), // Default to today's date
// //         mode: "",
// //         location: "",
// //         status: "",
// //         moms: "",
// //     });

// //     const handleChange = (e) => {
// //         setNewInteraction({ ...newInteraction, [e.target.name]: e.target.value });
// //     };

// //     const onSubmit = (e) => {
// //         e.preventDefault();
// //         handleSubmit(newInteraction); // Pass the new data to the parent handler
// //         setNewInteraction({ // Reset form after submission (optional, depending on flow)
// //             date: new Date().toISOString().substring(0, 10),
// //             mode: "",
// //             location: "",
// //             status: "",
// //             moms: "",
// //         });
// //         handleClose();
// //     };

// //     return (
// //         <Modal show={show} onHide={handleClose} size="lg">
// //             <Modal.Header closeButton className="bg-success text-white">
// //                 <Modal.Title>
// //                     <FaPlus className="me-2" /> Add Client Interaction
// //                 </Modal.Title>
// //             </Modal.Header>
// //             <Form onSubmit={onSubmit}>
// //                 <Modal.Body>
// //                     <Row>
// //                         <Col md={6}>
// //                             <Form.Group className="mb-3" controlId="formInteractionDate">
// //                                 <Form.Label>Date of Interaction <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Control
// //                                     type="date"
// //                                     name="date"
// //                                     value={newInteraction.date}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                             </Form.Group>
// //                         </Col>
// //                         <Col md={6}>
// //                             <Form.Group className="mb-3" controlId="formInteractionMode">
// //                                 <Form.Label>Mode</Form.Label>
// //                                 <Form.Select
// //                                     name="mode"
// //                                     value={newInteraction.mode}
// //                                     onChange={handleChange}
// //                                     required
// //                                 >
// //                                     <option value="">Select Interaction Mode</option>
// //                                     <option value="Initial Meeting">Initial Meeting</option>
// //                                     <option value="Virtual Meeting">Virtual Meeting</option>
// //                                     <option value="Client Site Visit">Client Site Visit</option>
// //                                     <option value="Phone Call">Phone Call</option>
// //                                     <option value="Email/Text">Email/Text</option>
// //                                 </Form.Select>
// //                             </Form.Group>
// //                         </Col>
// //                     </Row>
// //                     <Form.Group className="mb-3" controlId="formInteractionLocation">
// //                         <Form.Label>Location / Details </Form.Label>
// //                         <Form.Control
// //                             type="text"
// //                             name="location"
// //                             value={newInteraction.location}
// //                             onChange={handleChange}
// //                             placeholder="Enter location or specific details"
// //                         />
// //                     </Form.Group>
// //                     <Form.Group className="mb-3" controlId="formInteractionStatus">
// //                         <Form.Label>Status <span className="text-danger"></span></Form.Label>
// //                         <Form.Select
// //                             name="status"
// //                             value={newInteraction.status}
// //                             onChange={handleChange}
// //                             required
// //                         >
// //                             <option value="">Select Status</option>
// //                             {/* Key Interaction Stages */}
// //                             <option value="Requirement Gathering">revise</option>
// //                             <option value="Technical Discussion">accept</option>
                           
// //                         </Form.Select>
// //                     </Form.Group>
// //                     <Form.Group className="mb-3" controlId="formInteractionMOMs">
// //                         <Form.Label>Minutes of Meeting (MOMs) / Notes <span className="text-danger">*</span></Form.Label>
// //                         <Form.Control
// //                             as="textarea"
// //                             rows={5}
// //                             name="moms"
// //                             value={newInteraction.moms}
// //                             onChange={handleChange}
// //                             placeholder="Summarize the discussion, next steps, and key decisions..."
// //                             required
// //                         />
// //                     </Form.Group>
// //                 </Modal.Body>
// //                 <Modal.Footer>
// //                     <Button variant="secondary" onClick={handleClose}>
// //                         Cancel
// //                     </Button>
// //                     <Button type="submit" variant="success">
// //                         Save Interaction Log
// //                     </Button>
// //                 </Modal.Footer>
// //             </Form>
// //         </Modal>
// //     );
// // };

// // // --- Existing Component: InteractionCard (Updated color logic to reflect status changes) ---

// // /**
// //  * Reusable Card component for a single Sales Interaction/Meeting.
// //  */
// // const InteractionCard = ({ interaction, lead }) => {
// //     const statusColor = (status) => {
// //         switch (status) {
// //             // Core Lead Statuses (as requested)
// //             case "Quotation Sent":
// //                 return "info";
// //             case "Revised":
// //                 return "secondary"; // Rework needed/intermediate step
// //             case "Accepted":
// //                 return "success"; // The best outcome/win
// //             case "Rejected": // Retain logic for past logs that might have this status
// //                 return "danger"; // The final loss

// //             // Other Interaction Statuses/Stages
// //             case "Requirement Gathering":
// //                 return "primary";
// //             case "Technical Discussion":
// //                 return "secondary";
// //             case "Follow-up":
// //                 return "warning"; // Action/Attention required
// //             case "Negotiation":
// //                 return "primary";
// //             case "Lost/Client Unresponsive":
// //                 return "danger";
// //             default:
// //                 return "secondary";
// //         }
// //     };

// //     return (
// //         <Card className="mb-4 shadow-sm">
// //             <Card.Header className="d-flex justify-content-between align-items-center bg-light">
// //                 <h5 className="mb-0 mt-0 card-title">
// //                     Interaction on {interaction.date}
// //                 </h5>
// //                 <Badge bg={statusColor(interaction.status)} className="px-3 py-2">
// //                     {interaction.status}
// //                 </Badge>
// //             </Card.Header>
// //             <Card.Body>
// //                 <Row className="mb-3">
// //                     <Col md={4} className="d-flex align-items-center">
// //                         <FaCalendarAlt className="me-2 text-primary" />
// //                         <strong>Date:</strong> {interaction.date}
// //                     </Col>
// //                     <Col md={4} className="d-flex align-items-center">
// //                         <FaMapMarkerAlt className="me-2 text-primary" />
// //                         <strong>Location/Mode:</strong> {interaction.location} (
// //                         {interaction.mode})
// //                     </Col>
// //                     <Col md={4} className="d-flex align-items-center">
// //                         <FaUserTie className="me-2 text-primary" />
// //                         <strong>Salesperson:</strong> {lead.salesperson?.name}
// //                     </Col>
// //                 </Row>
// //                 <hr />
// //                 <Form.Group className="mb-3">
// //                     <Form.Label style={{ fontWeight: "600" }}>
// //                         Minutes of Meeting (MOMs) / Notes
// //                     </Form.Label>
// //                     <Form.Control
// //                         as="textarea"
// //                         rows={4}
// //                         readOnly
// //                         defaultValue={
// //                             interaction.moms || "No minutes recorded for this meeting."
// //                         }
// //                         style={{ backgroundColor: "#f9f9f9" }}
// //                     />
// //                 </Form.Group>
// //             </Card.Body>
// //         </Card>
// //     );
// // };

// // // --- Main Component: SalesDetails (Updated with Quotation Rejection flow) ---

// // /**
// //  * Main component to display the lead/sales details and history.
// //  */
// // export default function SalesDetails() {
// //     const { leadId } = useParams();

// //     // 2. Initialize the state with the imported leadsWithInteractions array
// //     const [leads, setLeads] = useState(customerInteractions);

// //     // Use a temporary copy of leads to find and modify details without affecting the state source
// //     let leadDetails = leads.find((lead) => lead.leadId === leadId);

// //     // FIX: Inject mock data for missing fields if they are null/undefined/empty
// //     if (leadDetails) {
// //         // 1. Inject a mock requirement if it's missing (most common missing field)
// //         if (!leadDetails.requirement || leadDetails.requirement.trim() === "") {
// //             leadDetails.requirement = "New cloud infrastructure project, awaiting technical assessment.";
// //         }

// //         // 2. Defensively ensure the customer object and its details exist
// //         if (!leadDetails.customer) {
// //             leadDetails.customer = {};
// //         }

// //         // 3. Populate customer name/company if missing
// //         if (!leadDetails.customer.name || leadDetails.customer.name.trim() === "") {
// //             // Fallback logic for Client Name
// //             const mockName = leadDetails.leadId === 'LEAD-001' ? "Arjun Mehta" : "Client Contact (Fallback)";
// //             leadDetails.customer.name = mockName;
// //         }
// //         if (!leadDetails.customer.companyName || leadDetails.customer.companyName.trim() === "") {
// //             leadDetails.customer.companyName = "Unknown Corp (Fallback)";
// //         }

// //         // 4. Ensure a salesperson object exists for rendering the InteractionCard
// //         if (!leadDetails.salesperson) {
// //             leadDetails.salesperson = salespersons.find(sp => sp.id === leadDetails.salespersonId) || { name: "System Admin" };
// //         }

// //     }
// //     // ====================================================================

// //     // State for managing the Add Interaction modal
// //     const [showModal, setShowModal] = useState(false);
// //     const handleShowModal = () => setShowModal(true);
// //     const handleCloseModal = () => setShowModal(false);

// //     // --- New State for Quotation Rejection Modal ---
// //     const [showRejectModal, setShowRejectModal] = useState(false);
// //     const handleShowRejectModal = () => setShowRejectModal(true);
// //     const handleCloseRejectModal = () => setShowRejectModal(false);

// //     // *** MOCK: Generate a Quotation ID for the current lead for the rejection modal ***
// //     // In a real app, you would retrieve the latest Quotation ID associated with the lead.
// //     const quotationToRejectId = leadDetails ? `${leadDetails.leadId}-Q1` : null;
// //     // ---------------------------------------------------------------------------------

// //     /**
// //      * Placeholder function for submitting the new interaction log.
// //      */
// //     const handleAddInteraction = (newInteractionData) => {
// //         if (!leadDetails) return;

// //         // 1. Create a new interaction object with a mock ID
// //         const newInteraction = {
// //             id: new Date().getTime(), // Simple unique ID based on timestamp
// //             ...newInteractionData,
// //         };

// //         // 2. Find the lead index to update
// //         const leadIndex = leads.findIndex(lead => lead.leadId === leadId);

// //         if (leadIndex === -1) return;

// //         // 3. Update the lead's interactions in the mock data state
// //         const updatedLeads = [...leads];
// //         // Prepend the new interaction to the array (assuming most recent is first)
// //         updatedLeads[leadIndex].interactions = [
// //             newInteraction,
// //             ...(updatedLeads[leadIndex].interactions || []),
// //         ];

// //         // 4. Update the state to force a re-render
// //         setLeads(updatedLeads);

// //         console.log(`New Interaction Logged for ${leadId}:`, newInteraction);
// //     };

// //     /**
// //      * New function to handle the dedicated quotation rejection.
// //      */
// //     const handleRejectQuotation = (qId, reason) => {
// //         if (!leadDetails) return;

// //         // 1. Create a specific "Quotation Rejected" interaction log
// //         const rejectionInteraction = {
// //             id: new Date().getTime(),
// //             date: new Date().toISOString().substring(0, 10),
// //             mode: "System/Official", // Mark as an official status change event
// //             location: `Quotation ID: ${qId}`,
// //             status: "Rejected",
// //             moms: `QUOTATION ${qId} REJECTED: ${reason}. This action was initiated by the salesperson.`,
// //         };

// //         // 2. Find the lead index to update
// //         const leadIndex = leads.findIndex(lead => lead.leadId === leadId);

// //         if (leadIndex === -1) return;

// //         // 3. Update the lead's interactions AND update the lead status to "Rejected"
// //         const updatedLeads = [...leads];
// //         updatedLeads[leadIndex].interactions = [
// //             rejectionInteraction,
// //             ...(updatedLeads[leadIndex].interactions || []),
// //         ];
// //         updatedLeads[leadIndex].status = "Rejected"; // Update the main lead status

// //         // 4. Update the state
// //         setLeads(updatedLeads);

// //         console.log(`Quotation ${qId} Rejected for Lead ${leadId}. Reason: ${reason}`);
// //     };


// //     if (!leadDetails) {
// //         return (
// //             <Container className="p-4">
// //                 <div className="d-flex justify-content-between align-items-center mb-3">
// //                     <h4 className="m-0">Sales Interaction History</h4>
// //                 </div>
// //                 <Card>
// //                     <Card.Body>
// //                         No lead found for ID: <strong>{leadId}</strong>.
// //                     </Card.Body>
// //                 </Card>
// //             </Container>
// //         );
// //     }

// //     return (
// //         <Container fluid className="p-4">
// //             {/* Back Button and Header/Add Log Button */}
// //             <div className="d-flex justify-content-between align-items-center mb-3">
// //                 <div className="d-flex align-items-center">
// //                     <Button
// //                         as={Link}
// //                         to="/sales" // Assuming the previous page is /sales
// //                         className="btn-sm me-3"
// //                         style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
// //                     >
// //                         <FaArrowLeft />
// //                     </Button>
// //                     <h3 className="m-0" style={{ fontWeight: "700" }}>
// //                         Lead Interaction History
// //                     </h3>
// //                 </div>
// //                 {/* Action Buttons: Add Log (for general interaction) and Reject Quotation (for specific action) */}
// //                 <div>
// //                     {/* New Reject Quotation Button */}
// //                     <Button
// //                         variant="danger"
// //                         onClick={handleShowRejectModal}
// //                         className="me-3"
// //                         disabled={leadDetails.status === 'Rejected' || leadDetails.status === 'Accepted' || !quotationToRejectId}
// //                     >
// //                         <FaTimesCircle className="me-2" /> Reject
// //                     </Button>
// //                     {/* Original Add Log Button */}
// //                     <Button
// //                         variant="success"
// //                         onClick={handleShowModal}
// //                         className="add-customer-btn btn btn-primary btn btn-primary"
// //                     >
// //                         <FaPlus className="me-2" /> Add Log
// //                     </Button>
// //                 </div>
// //                 {/* ------------------------ */}
// //             </div>

// //             {/* Customer Info Card */}
// //             <Row className="mb-4">
// //                 <Col md={12}>
// //                     <Card className="shadow-sm">
// //                         <Card.Header className="bg-primary text-white">
// //                             <h5 className="mb-0 mt-0 card-title">Client & Lead Summary</h5>
// //                         </Card.Header>
// //                         <Card.Body>
// //                             <Row>
// //                                 <Col md={6}>
// //                                     <Form.Group className="mb-3">
// //                                         <Form.Label>Client Name (Contact)</Form.Label>
// //                                         <Form.Control
// //                                             readOnly
// //                                             defaultValue={leadDetails.clientName || "-"}
// //                                         />
// //                                     </Form.Group>
// //                                 </Col>
                                
// //                                 <Col md={6}>
// //                                     <Form.Group className="mb-3">
// //                                         <Form.Label>Salesperson</Form.Label>
// //                                         <Form.Control
// //                                             readOnly
// //                                             defaultValue={`${leadDetails.salesperson.name} `}
// //                                         />
// //                                     </Form.Group>
// //                                 </Col>
// //                                 <Col md={6}>
// //                                     <Form.Group className="mb-3">
// //                                         <Form.Label>Current Lead Status</Form.Label>
// //                                         <Form.Control
// //                                             readOnly
// //                                             defaultValue={leadDetails.status || "N/A"}
// //                                             className={
// //                                                 leadDetails.status === 'Rejected' ? 'text-danger fw-bold' :
// //                                                 leadDetails.status === 'Accepted' ? 'text-success fw-bold' : ''
// //                                             }
// //                                         />
// //                                     </Form.Group>
// //                                 </Col>
// //                                 <Col md={6}>
// //                                     <Form.Group className="mb-3">
// //                                         <Form.Label>Lead Requirement</Form.Label>
// //                                         <Form.Control
// //                                             as="textarea"
// //                                             rows={2}
// //                                             readOnly
// //                                             defaultValue={leadDetails.requirement || "N/A"}
// //                                         />
// //                                     </Form.Group>
// //                                 </Col>
// //                             </Row>
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>

// //             {/* Interactions/Meetings History */}
// //             <Row>
// //                 <Col md={12}>
// //                     <h4 className="mb-3 mt-4">Meeting & Interaction Log</h4>

// //                     {leadDetails.interactions && leadDetails.interactions.length > 0 ? (
// //                         // Sort by date descending (most recent first)
// //                         [...leadDetails.interactions]
// //                             .sort((a, b) => new Date(b.date) - new Date(a.date))
// //                             .map((interaction) => (
// //                                 <InteractionCard
// //                                     key={interaction.id}
// //                                     interaction={interaction}
// //                                     // Pass leadDetails for salesperson info
// //                                     lead={leadDetails}
// //                                 />
// //                             ))
// //                     ) : (
// //                         <Card>
// //                             <Card.Body className="text-center p-4">
// //                                 No detailed interaction history recorded for this lead.
// //                             </Card.Body>
// //                         </Card>
// //                     )}
// //                 </Col>
// //             </Row>

// //             {/* Render the New Interaction Modal */}
// //             <InteractionModal
// //                 show={showModal}
// //                 handleClose={handleCloseModal}
// //                 handleSubmit={handleAddInteraction}
// //             />

// //             {/* Render the NEW Quotation Rejection Modal */}
// //             <QuotationRejectModal
// //                 show={showRejectModal}
// //                 handleClose={handleCloseRejectModal}
// //                 quotationId={quotationToRejectId}
// //                 handleSubmit={handleRejectQuotation}
// //             />
// //             {/* -------------------------------------- */}
// //         </Container>
// //     );
// // }


// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Card,
//   Row,
//   Col,
//   Form,
//   Badge,
//   Container,
//   Button,
//   Modal,
// } from "react-bootstrap";
// import {
//   FaArrowLeft,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaUserTie,
//   FaPlus,
//   FaTimesCircle,
// } from "react-icons/fa";
// import toast from "react-hot-toast";

// // Centralized mock data for lead header info
// import { customerInteractions, salespersons } from "../../data/mockdata";

// // --- API BASE URL ---
// const API_BASE = "http://localhost/cyberathon_admin/index.php/Api";
// // if you use IP instead, e.g.
// // const API_BASE = "http://192.168.162.141/cyberathon_admin/index.php/Api";

// const LEAD_STAGE_OPTIONS = ["civil", "finalised", "submit"];

// /* -------------------- Quotation Reject Modal -------------------- */

// const QuotationRejectModal = ({
//   show,
//   handleClose,
//   quotationId,
//   handleSubmit,
// }) => {
//   const [rejectionReason, setRejectionReason] = useState("");

//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(quotationId, rejectionReason);
//     setRejectionReason("");
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="md">
//       <Modal.Header closeButton className="bg-danger text-white">
//         <Modal.Title>
//           <FaTimesCircle className="me-2" /> Confirm Quotation Rejection
//         </Modal.Title>
//       </Modal.Header>
//       <Form onSubmit={onSubmit}>
//         <Modal.Body>
//           <p>
//             Are you sure the customer has rejected this quotation? This action
//             will mark the quote <strong>{quotationId}</strong> as lost/rejected.
//           </p>
//           <Form.Group className="mb-3">
//             <Form.Label style={{ fontWeight: "700" }}>
//               Quotation ID to Reject:
//             </Form.Label>
//             <Form.Control
//               type="text"
//               readOnly
//               defaultValue={quotationId || "N/A"}
//               className="text-danger fw-bold"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formRejectionReason">
//             <Form.Label>
//               Reason for Rejection <span className="text-danger">*</span>
//             </Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//               placeholder="Please provide a detailed reason for rejection (e.g., pricing, features missing, timeline mismatch)."
//               required
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button type="submit" variant="danger">
//             Confirm Rejection
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// /* -------------------- Add Interaction Modal -------------------- */

// const InteractionModal = ({ show, handleClose, handleSubmit }) => {
//   const [newInteraction, setNewInteraction] = useState({
//     date: new Date().toISOString().substring(0, 10),
//     mode: "",
//     location: "",
//     status: "",
//     moms: "",
//   });

//   const handleChange = (e) => {
//     setNewInteraction({ ...newInteraction, [e.target.name]: e.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(newInteraction);
//     setNewInteraction({
//       date: new Date().toISOString().substring(0, 10),
//       mode: "",
//       location: "",
//       status: "",
//       moms: "",
//     });
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg">
//       <Modal.Header closeButton className="bg-success text-white">
//         <Modal.Title>
//           <FaPlus className="me-2" /> Add Client Interaction
//         </Modal.Title>
//       </Modal.Header>
//       <Form onSubmit={onSubmit}>
//         <Modal.Body>
//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3" controlId="formInteractionDate">
//                 <Form.Label>
//                   Date of Interaction <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="date"
//                   value={newInteraction.date}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3" controlId="formInteractionMode">
//                 <Form.Label>Mode</Form.Label>
//                 <Form.Select
//                   name="mode"
//                   value={newInteraction.mode}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Interaction Mode</option>
//                   <option value="Initial Meeting">Initial Meeting</option>
//                   <option value="Virtual Meeting">Virtual Meeting</option>
//                   <option value="Client Site Visit">Client Site Visit</option>
//                   <option value="Phone Call">Phone Call</option>
//                   <option value="Email/Text">Email/Text</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Form.Group className="mb-3" controlId="formInteractionLocation">
//             <Form.Label>Location / Details </Form.Label>
//             <Form.Control
//               type="text"
//               name="location"
//               value={newInteraction.location}
//               onChange={handleChange}
//               placeholder="Enter location or specific details"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formInteractionStatus">
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               name="status"
//               value={newInteraction.status}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="Requirement Gathering">revise</option>
//               <option value="Technical Discussion">accept</option>
//             </Form.Select>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formInteractionMOMs">
//             <Form.Label>
//               Minutes of Meeting (MOMs) / Notes{" "}
//               <span className="text-danger">*</span>
//             </Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={5}
//               name="moms"
//               value={newInteraction.moms}
//               onChange={handleChange}
//               placeholder="Summarize the discussion, next steps, and key decisions..."
//               required
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button type="submit" variant="success">
//             Save Interaction Log
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// /* -------------------- Interaction Card -------------------- */

// const InteractionCard = ({ interaction, lead }) => {
//   const statusColor = (status) => {
//     switch (status) {
//       case "Quotation Sent":
//         return "info";
//       case "Revised":
//         return "secondary";
//       case "Accepted":
//         return "success";
//       case "Rejected":
//         return "danger";
//       case "Requirement Gathering":
//         return "primary";
//       case "Technical Discussion":
//         return "secondary";
//       case "Follow-up":
//         return "warning";
//       case "Negotiation":
//         return "primary";
//       case "Lost/Client Unresponsive":
//         return "danger";
//       default:
//         return "secondary";
//     }
//   };

//   return (
//     <Card className="mb-4 shadow-sm">
//       <Card.Header className="d-flex justify-content-between align-items-center bg-light">
//         <h5 className="mb-0 mt-0 card-title">
//           Interaction on {interaction.date}
//         </h5>
//         <Badge bg={statusColor(interaction.status)} className="px-3 py-2">
//           {interaction.status}
//         </Badge>
//       </Card.Header>
//       <Card.Body>
//         <Row className="mb-3">
//           <Col md={4} className="d-flex align-items-center">
//             <FaCalendarAlt className="me-2 text-primary" />
//             <strong>Date:</strong> {interaction.date}
//           </Col>
//           <Col md={4} className="d-flex align-items-center">
//             <FaMapMarkerAlt className="me-2 text-primary" />
//             <strong>Location/Mode:</strong> {interaction.location} (
//             {interaction.mode})
//           </Col>
//           <Col md={4} className="d-flex align-items-center">
//             <FaUserTie className="me-2 text-primary" />
//             <strong>Salesperson:</strong> {lead.salesperson?.name}
//           </Col>
//         </Row>
//         <hr />
//         <Form.Group className="mb-3">
//           <Form.Label style={{ fontWeight: "600" }}>
//             Minutes of Meeting (MOMs) / Notes
//           </Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             readOnly
//             defaultValue={
//               interaction.moms || "No minutes recorded for this meeting."
//             }
//             style={{ backgroundColor: "#f9f9f9" }}
//           />
//         </Form.Group>
//       </Card.Body>
//     </Card>
//   );
// };

// /* -------------------- Main SalesDetails Component -------------------- */

// export default function SalesDetails() {
//   const { leadId } = useParams();

//   // Base lead info from mock data (client name, salesperson, etc.)
//   const [leads, setLeads] = useState(customerInteractions);

//   // Sales logs from backend
//   const [salesLogs, setSalesLogs] = useState([]);
//   const [loadingLogs, setLoadingLogs] = useState(false);

//   // Modals
//   const [showModal, setShowModal] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const handleShowRejectModal = () => setShowRejectModal(true);
//   const handleCloseRejectModal = () => setShowRejectModal(false);

//   // Find lead details from mock list
//   let leadDetails = leads.find((lead) => lead.leadId === leadId);

//   // Patch missing fields in mock for safety
//   if (leadDetails) {
//     if (!leadDetails.requirement || leadDetails.requirement.trim() === "") {
//       leadDetails.requirement =
//         "New cloud infrastructure project, awaiting technical assessment.";
//     }

//     if (!leadDetails.customer) {
//       leadDetails.customer = {};
//     }

//     if (!leadDetails.customer.name || leadDetails.customer.name.trim() === "") {
//       const mockName =
//         leadDetails.leadId === "LEAD-001"
//           ? "Arjun Mehta"
//           : "Client Contact (Fallback)";
//       leadDetails.customer.name = mockName;
//     }

//     if (
//       !leadDetails.customer.companyName ||
//       leadDetails.customer.companyName.trim() === ""
//     ) {
//       leadDetails.customer.companyName = "Unknown Corp (Fallback)";
//     }

//     if (!leadDetails.salesperson) {
//       leadDetails.salesperson =
//         salespersons.find((sp) => sp.id === leadDetails.salespersonId) || {
//           name: "System Admin",
//         };
//     }
//   }

//   // Mock quotation ID (in real app, this comes from backend)
//   const quotationToRejectId = leadDetails ? `${leadDetails.leadId}-Q1` : null;

//   /* --------- API calls for Sales Log --------- */

//   // LIST SALES LOG
//   const fetchSalesLogs = async () => {
//     if (!leadId) return;
//     setLoadingLogs(true);
//     try {
//       const res = await fetch(`${API_BASE}/list_sales_log`, {
//         method: "POST", // or "GET" if your backend expects it
//         headers: { "Content-Type": "application/json" },
//         // If backend supports filtering by lead_id, send it:
//         body: JSON.stringify({ lead_id: leadId }),
//       });

//       const data = await res.json();

//       if (data.status && data.success === "1" && Array.isArray(data.data)) {
//         const mapped = data.data.map((log) => ({
//           id: log.id,
//           date: log.curr_date,
//           mode: log.mode,
//           location: log.address,
//           status: log.status,
//           moms: log.mom,
//         }));
//         setSalesLogs(mapped);
//       } else {
//         toast.error(data.message || "Failed to load sales logs.");
//       }
//     } catch (err) {
//       console.error("Error fetching sales logs:", err);
//       toast.error("Something went wrong while loading sales logs.");
//     } finally {
//       setLoadingLogs(false);
//     }
//   };

//   useEffect(() => {
//     fetchSalesLogs();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [leadId]);

//   // ADD SALES LOG (called from Add Log modal)
//   const handleAddInteraction = async (newInteractionData) => {
//     if (!leadDetails) return;

//     const payload = {
//       curr_date: newInteractionData.date,
//       mode: newInteractionData.mode,
//       address: newInteractionData.location,
//       status: newInteractionData.status,
//       mom: newInteractionData.moms,
//       lead_id: leadId, // optional, if backend supports it
//     };

//     try {
//       const res = await fetch(`${API_BASE}/add_sales_log`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (data.status && data.success === "1") {
//         const inserted = {
//           id: data.id || new Date().getTime(),
//           date: payload.curr_date,
//           mode: payload.mode,
//           location: payload.address,
//           status: payload.status,
//           moms: payload.mom,
//         };
//         setSalesLogs((prev) => [inserted, ...prev]);
//         toast.success(data.message || "Sales log added successfully.");
//       } else {
//         toast.error(data.message || "Failed to add sales log.");
//       }
//     } catch (err) {
//       console.error("Error adding sales log:", err);
//       toast.error("Something went wrong while adding sales log.");
//     }
//   };

//   // UPDATE SALES LOG (helper – not wired to UI yet)
//   const updateSalesLog = async (id, updatedFields) => {
//     const log = salesLogs.find((l) => l.id === id);
//     if (!log) return;

//     const payload = {
//       id,
//       curr_date: updatedFields.date || log.date,
//       mode: updatedFields.mode || log.mode,
//       address: updatedFields.location || log.location,
//       status: updatedFields.status || log.status,
//       mom: updatedFields.moms || log.moms,
//       lead_id: leadId,
//     };

//     try {
//       const res = await fetch(`${API_BASE}/update_sales_log`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (data.status && data.success === "1") {
//         setSalesLogs((prev) =>
//           prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l))
//         );
//         toast.success(data.message || "Sales log updated.");
//       } else {
//         toast.error(data.message || "Failed to update sales log.");
//       }
//     } catch (err) {
//       console.error("Error updating sales log:", err);
//       toast.error("Something went wrong while updating.");
//     }
//   };

//   // DELETE SALES LOG (helper – not wired to UI yet)
//   const deleteSalesLog = async (id) => {
//     try {
//       const res = await fetch(`${API_BASE}/delete_sales_log`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       const data = await res.json();
//       if (data.status && data.success === "1") {
//         setSalesLogs((prev) => prev.filter((l) => l.id !== id));
//         toast.success(data.message || "Sales log deleted.");
//       } else {
//         toast.error(data.message || "Failed to delete sales log.");
//       }
//     } catch (err) {
//       console.error("Error deleting sales log:", err);
//       toast.error("Something went wrong while deleting.");
//     }
//   };

//   // REJECT QUOTATION → also logs a “Rejected” sales log
//   const handleRejectQuotation = async (qId, reason) => {
//     if (!leadDetails) return;

//     const today = new Date().toISOString().substring(0, 10);

//     const payload = {
//       curr_date: today,
//       mode: "System/Official",
//       address: `Quotation ID: ${qId}`,
//       status: "Rejected",
//       mom: `QUOTATION ${qId} REJECTED: ${reason}. This action was initiated by the salesperson.`,
//       lead_id: leadId,
//     };

//     try {
//       const res = await fetch(`${API_BASE}/add_sales_log`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (data.status && data.success === "1") {
//         const newLog = {
//           id: data.id || new Date().getTime(),
//           date: payload.curr_date,
//           mode: payload.mode,
//           location: payload.address,
//           status: payload.status,
//           moms: payload.mom,
//         };
//         setSalesLogs((prev) => [newLog, ...prev]);

//         // Also update local lead status to "Rejected" in mock state
//         setLeads((prev) => {
//           const updated = [...prev];
//           const idx = updated.findIndex((l) => l.leadId === leadId);
//           if (idx !== -1) {
//             updated[idx] = { ...updated[idx], status: "Rejected" };
//           }
//           return updated;
//         });

//         toast.success(data.message || `Quotation ${qId} marked as rejected.`);
//       } else {
//         toast.error(data.message || "Failed to reject quotation.");
//       }
//     } catch (err) {
//       console.error("Error rejecting quotation:", err);
//       toast.error("Something went wrong while rejecting quotation.");
//     }
//   };

//   /* --------- RENDER --------- */

//   if (!leadDetails) {
//     return (
//       <Container className="p-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h4 className="m-0">Sales Interaction History</h4>
//         </div>
//         <Card>
//           <Card.Body>
//             No lead found for ID: <strong>{leadId}</strong>.
//           </Card.Body>
//         </Card>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="p-4">
//       {/* Header & Buttons */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex align-items-center">
//           <Button
//             as={Link}
//             to="/sales"
//             className="btn-sm me-3"
//             style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
//           >
//             <FaArrowLeft />
//           </Button>
//           <h3 className="m-0" style={{ fontWeight: "700" }}>
//             Lead Interaction History
//           </h3>
//         </div>
//         <div>
//           <Button
//             variant="danger"
//             onClick={handleShowRejectModal}
//             className="me-3"
//             disabled={
//               leadDetails.status === "Rejected" ||
//               leadDetails.status === "Accepted" ||
//               !quotationToRejectId
//             }
//           >
//             <FaTimesCircle className="me-2" /> Reject
//           </Button>
//           <Button
//             variant="success"
//             onClick={handleShowModal}
//             className="add-customer-btn btn btn-primary"
//           >
//             <FaPlus className="me-2" /> Add Log
//           </Button>
//         </div>
//       </div>

//       {/* Client & Lead Summary */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-primary text-white">
//               <h5 className="mb-0 mt-0 card-title">Client & Lead Summary</h5>
//             </Card.Header>
//             <Card.Body>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Client Name (Contact)</Form.Label>
//                     <Form.Control
//                       readOnly
//                       defaultValue={leadDetails.clientName || "-"}
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Salesperson</Form.Label>
//                     <Form.Control
//                       readOnly
//                       defaultValue={`${leadDetails.salesperson.name} `}
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Current Lead Status</Form.Label>
//                     <Form.Control
//                       readOnly
//                       defaultValue={leadDetails.status || "N/A"}
//                       className={
//                         leadDetails.status === "Rejected"
//                           ? "text-danger fw-bold"
//                           : leadDetails.status === "Accepted"
//                           ? "text-success fw-bold"
//                           : ""
//                       }
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Lead Requirement</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={2}
//                       readOnly
//                       defaultValue={leadDetails.requirement || "N/A"}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Sales Log / Interaction History */}
//       <Row>
//         <Col md={12}>
//           <h4 className="mb-3 mt-4">Meeting & Interaction Log</h4>

//           {loadingLogs ? (
//             <Card>
//               <Card.Body className="text-center p-4">
//                 Loading interactions...
//               </Card.Body>
//             </Card>
//           ) : salesLogs.length > 0 ? (
//             [...salesLogs]
//               .sort((a, b) => new Date(b.date) - new Date(a.date))
//               .map((interaction) => (
//                 <InteractionCard
//                   key={interaction.id}
//                   interaction={interaction}
//                   lead={leadDetails}
//                 />
//               ))
//           ) : (
//             <Card>
//               <Card.Body className="text-center p-4">
//                 No detailed interaction history recorded for this lead.
//               </Card.Body>
//             </Card>
//           )}
//         </Col>
//       </Row>

//       {/* Add Interaction Modal */}
//       <InteractionModal
//         show={showModal}
//         handleClose={handleCloseModal}
//         handleSubmit={handleAddInteraction}
//       />

//       {/* Reject Quotation Modal */}
//       <QuotationRejectModal
//         show={showRejectModal}
//         handleClose={handleCloseRejectModal}
//         quotationId={quotationToRejectId}
//         handleSubmit={handleRejectQuotation}
//       />
//     </Container>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Form,
  Badge,
  Container,
  Button,
  Modal,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserTie,
  FaPlus,
  FaTimesCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

// Centralized mock data for lead header info
import { customerInteractions, salespersons } from "../../data/mockdata";

// --- API BASE URL ---
const API_BASE = "http:///192.168.162.141/cyberathon_admin/index.php/Api";
// if you use IP instead, e.g.
// const API_BASE = "http://192.168.162.141/cyberathon_admin/index.php/Api";

const LEAD_STAGE_OPTIONS = ["civil", "finalised", "submit"];

/* -------------------- Quotation Reject Modal -------------------- */

const QuotationRejectModal = ({
  show,
  handleClose,
  quotationId,
  handleSubmit,
}) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(quotationId, rejectionReason);
    setRejectionReason("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <FaTimesCircle className="me-2" /> Confirm Quotation Rejection
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <p>
            Are you sure the customer has rejected this quotation? This action
            will mark the quote <strong>{quotationId}</strong> as lost/rejected.
          </p>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "700" }}>
              Quotation ID to Reject:
            </Form.Label>
            <Form.Control
              type="text"
              readOnly
              defaultValue={quotationId || "N/A"}
              className="text-danger fw-bold"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRejectionReason">
            <Form.Label>
              Reason for Rejection <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a detailed reason for rejection (e.g., pricing, features missing, timeline mismatch)."
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="danger">
            Confirm Rejection
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

/* -------------------- Add Interaction Modal -------------------- */

const InteractionModal = ({ show, handleClose, handleSubmit }) => {
  const [newInteraction, setNewInteraction] = useState({
    date: new Date().toISOString().substring(0, 10),
    mode: "",
    location: "",
    status: "",
    moms: "",
  });

  const handleChange = (e) => {
    setNewInteraction({ ...newInteraction, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newInteraction);
    setNewInteraction({
      date: new Date().toISOString().substring(0, 10),
      mode: "",
      location: "",
      status: "",
      moms: "",
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>
          <FaPlus className="me-2" /> Add Client Interaction
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formInteractionDate">
                <Form.Label>
                  Date of Interaction <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newInteraction.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formInteractionMode">
                <Form.Label>Mode</Form.Label>
                <Form.Select
                  name="mode"
                  value={newInteraction.mode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Interaction Mode</option>
                  <option value="Initial Meeting">Initial Meeting</option>
                  <option value="Virtual Meeting">Virtual Meeting</option>
                  <option value="Client Site Visit">Client Site Visit</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Email/Text">Email/Text</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formInteractionLocation">
            <Form.Label>Location / Details </Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={newInteraction.location}
              onChange={handleChange}
              placeholder="Enter location or specific details"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInteractionStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={newInteraction.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Requirement Gathering">revise</option>
              <option value="Technical Discussion">accept</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInteractionMOMs">
            <Form.Label>
              Minutes of Meeting (MOMs) / Notes{" "}
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="moms"
              value={newInteraction.moms}
              onChange={handleChange}
              placeholder="Summarize the discussion, next steps, and key decisions..."
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Save Interaction Log
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

/* -------------------- Interaction Card -------------------- */

const InteractionCard = ({ interaction, lead }) => {
  const statusColor = (status) => {
    switch (status) {
      case "Quotation Sent":
        return "info";
      case "Revised":
        return "secondary";
      case "Accepted":
        return "success";
      case "Rejected":
        return "danger";
      case "Requirement Gathering":
        return "primary";
      case "Technical Discussion":
        return "secondary";
      case "Follow-up":
        return "warning";
      case "Negotiation":
        return "primary";
      case "Lost/Client Unresponsive":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center bg-light">
        <h5 className="mb-0 mt-0 card-title">
          Interaction on {interaction.date}
        </h5>
        <Badge bg={statusColor(interaction.status)} className="px-3 py-2">
          {interaction.status}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={4} className="d-flex align-items-center">
            <FaCalendarAlt className="me-2 text-primary" />
            <strong>Date:</strong> {interaction.date}
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <FaMapMarkerAlt className="me-2 text-primary" />
            <strong>Location/Mode:</strong> {interaction.location} (
            {interaction.mode})
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <FaUserTie className="me-2 text-primary" />
            <strong>Salesperson:</strong> {lead.salesperson?.name}
          </Col>
        </Row>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>
            Minutes of Meeting (MOMs) / Notes
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            readOnly
            defaultValue={
              interaction.moms || "No minutes recorded for this meeting."
            }
            style={{ backgroundColor: "#f9f9f9" }}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

/* -------------------- Main SalesDetails Component -------------------- */

export default function SalesDetails() {
  const { leadId } = useParams();

  // Base lead info from mock data (client name, salesperson, etc.)
  const [leads, setLeads] = useState(customerInteractions);

  // Sales logs from backend
  const [salesLogs, setSalesLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowRejectModal = () => setShowRejectModal(true);
  const handleCloseRejectModal = () => setShowRejectModal(false);

  // Find lead details from mock list
  let leadDetails = leads.find((lead) => lead.leadId === leadId);

  // Patch missing fields in mock for safety
  if (leadDetails) {
    if (!leadDetails.requirement || leadDetails.requirement.trim() === "") {
      leadDetails.requirement =
        "New cloud infrastructure project, awaiting technical assessment.";
    }

    if (!leadDetails.customer) {
      leadDetails.customer = {};
    }

    if (!leadDetails.customer.name || leadDetails.customer.name.trim() === "") {
      const mockName =
        leadDetails.leadId === "LEAD-001"
          ? "Arjun Mehta"
          : "Client Contact (Fallback)";
      leadDetails.customer.name = mockName;
    }

    if (
      !leadDetails.customer.companyName ||
      leadDetails.customer.companyName.trim() === ""
    ) {
      leadDetails.customer.companyName = "Unknown Corp (Fallback)";
    }

    if (!leadDetails.salesperson) {
      leadDetails.salesperson =
        salespersons.find((sp) => sp.id === leadDetails.salespersonId) || {
          name: "System Admin",
        };
    }
  }

  // Mock quotation ID (in real app, this comes from backend)
  const quotationToRejectId = leadDetails ? `${leadDetails.leadId}-Q1` : null;

  /* --------- API calls for Sales Log --------- */

  // LIST SALES LOG
  const fetchSalesLogs = async () => {
    if (!leadId) return;
    setLoadingLogs(true);
    try {
      const res = await fetch(`${API_BASE}/list_sales_log`, {
        method: "POST", // or "GET" if your backend expects it
        headers: { "Content-Type": "application/json" },
        // If backend supports filtering by lead_id, send it:
        body: JSON.stringify({ lead_id: leadId }),
      });

      const data = await res.json();

      if (data.status && data.success === "1" && Array.isArray(data.data)) {
        const mapped = data.data.map((log) => ({
          id: log.id,
          date: log.curr_date,
          mode: log.mode,
          location: log.address,
          status: log.status,
          moms: log.mom,
        }));
        setSalesLogs(mapped);
      } else {
        toast.error(data.message || "Failed to load sales logs.");
      }
    } catch (err) {
      console.error("Error fetching sales logs:", err);
      toast.error("Something went wrong while loading sales logs.");
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchSalesLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  // ADD SALES LOG (called from Add Log modal)
  const handleAddInteraction = async (newInteractionData) => {
    if (!leadDetails) return;

    const payload = {
      curr_date: newInteractionData.date,
      mode: newInteractionData.mode,
      address: newInteractionData.location,
      status: newInteractionData.status,
      mom: newInteractionData.moms,
      lead_id: leadId, // optional, if backend supports it
    };

    try {
      const res = await fetch(`${API_BASE}/add_sales_log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status && data.success === "1") {
        const inserted = {
          id: data.id || new Date().getTime(),
          date: payload.curr_date,
          mode: payload.mode,
          location: payload.address,
          status: payload.status,
          moms: payload.mom,
        };
        setSalesLogs((prev) => [inserted, ...prev]);
        toast.success(data.message || "Sales log added successfully.");
      } else {
        toast.error(data.message || "Failed to add sales log.");
      }
    } catch (err) {
      console.error("Error adding sales log:", err);
      toast.error("Something went wrong while adding sales log.");
    }
  };

  // UPDATE SALES LOG (helper – not wired to UI yet)
  const updateSalesLog = async (id, updatedFields) => {
    const log = salesLogs.find((l) => l.id === id);
    if (!log) return;

    const payload = {
      id,
      curr_date: updatedFields.date || log.date,
      mode: updatedFields.mode || log.mode,
      address: updatedFields.location || log.location,
      status: updatedFields.status || log.status,
      mom: updatedFields.moms || log.moms,
      lead_id: leadId,
    };

    try {
      const res = await fetch(`${API_BASE}/update_sales_log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.status && data.success === "1") {
        setSalesLogs((prev) =>
          prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l))
        );
        toast.success(data.message || "Sales log updated.");
      } else {
        toast.error(data.message || "Failed to update sales log.");
      }
    } catch (err) {
      console.error("Error updating sales log:", err);
      toast.error("Something went wrong while updating.");
    }
  };

  // DELETE SALES LOG (helper – not wired to UI yet)
  const deleteSalesLog = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/delete_sales_log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.status && data.success === "1") {
        setSalesLogs((prev) => prev.filter((l) => l.id !== id));
        toast.success(data.message || "Sales log deleted.");
      } else {
        toast.error(data.message || "Failed to delete sales log.");
      }
    } catch (err) {
      console.error("Error deleting sales log:", err);
      toast.error("Something went wrong while deleting.");
    }
  };

  // REJECT QUOTATION → also logs a “Rejected” sales log
  const handleRejectQuotation = async (qId, reason) => {
    if (!leadDetails) return;

    const today = new Date().toISOString().substring(0, 10);

    const payload = {
      curr_date: today,
      mode: "System/Official",
      address: `Quotation ID: ${qId}`,
      status: "Rejected",
      mom: `QUOTATION ${qId} REJECTED: ${reason}. This action was initiated by the salesperson.`,
      lead_id: leadId,
    };

    try {
      const res = await fetch(`${API_BASE}/add_sales_log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status && data.success === "1") {
        const newLog = {
          id: data.id || new Date().getTime(),
          date: payload.curr_date,
          mode: payload.mode,
          location: payload.address,
          status: payload.status,
          moms: payload.mom,
        };
        setSalesLogs((prev) => [newLog, ...prev]);

        // Also update local lead status to "Rejected" in mock state
        setLeads((prev) => {
          const updated = [...prev];
          const idx = updated.findIndex((l) => l.leadId === leadId);
          if (idx !== -1) {
            updated[idx] = { ...updated[idx], status: "Rejected" };
          }
          return updated;
        });

        toast.success(data.message || `Quotation ${qId} marked as rejected.`);
      } else {
        toast.error(data.message || "Failed to reject quotation.");
      }
    } catch (err) {
      console.error("Error rejecting quotation:", err);
      toast.error("Something went wrong while rejecting quotation.");
    }
  };

  /* --------- RENDER --------- */

  if (!leadDetails) {
    return (
      <Container className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Sales Interaction History</h4>
        </div>
        <Card>
          <Card.Body>
            No lead found for ID: <strong>{leadId}</strong>.
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      {/* Header & Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <Button
            as={Link}
            to="/sales"
            className="btn-sm me-3"
            style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
          >
            <FaArrowLeft />
          </Button>
          <h3 className="m-0" style={{ fontWeight: "700" }}>
            Lead Interaction History
          </h3>
        </div>
        <div>
          <Button
            variant="danger"
            onClick={handleShowRejectModal}
            className="me-3"
            disabled={
              leadDetails.status === "Rejected" ||
              leadDetails.status === "Accepted" ||
              !quotationToRejectId
            }
          >
            <FaTimesCircle className="me-2" /> Reject
          </Button>
          <Button
            variant="success"
            onClick={handleShowModal}
            className="add-customer-btn btn btn-primary"
          >
            <FaPlus className="me-2" /> Add Log
          </Button>
        </div>
      </div>

      {/* Client & Lead Summary */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0 mt-0 card-title">Client & Lead Summary</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Client Name (Contact)</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={leadDetails.clientName || "-"}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Salesperson</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={`${leadDetails.salesperson.name} `}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Lead Status</Form.Label>
                    <Form.Control
                      readOnly
                      defaultValue={leadDetails.status || "N/A"}
                      className={
                        leadDetails.status === "Rejected"
                          ? "text-danger fw-bold"
                          : leadDetails.status === "Accepted"
                          ? "text-success fw-bold"
                          : ""
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Lead Requirement</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      readOnly
                      defaultValue={leadDetails.requirement || "N/A"}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sales Log / Interaction History */}
      <Row>
        <Col md={12}>
          <h4 className="mb-3 mt-4">Meeting & Interaction Log</h4>

          {loadingLogs ? (
            <Card>
              <Card.Body className="text-center p-4">
                Loading interactions...
              </Card.Body>
            </Card>
          ) : salesLogs.length > 0 ? (
            [...salesLogs]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((interaction) => (
                <InteractionCard
                  key={interaction.id}
                  interaction={interaction}
                  lead={leadDetails}
                />
              ))
          ) : (
            <Card>
              <Card.Body className="text-center p-4">
                No detailed interaction history recorded for this lead.
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Add Interaction Modal */}
      <InteractionModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleAddInteraction}
      />

      {/* Reject Quotation Modal */}
      <QuotationRejectModal
        show={showRejectModal}
        handleClose={handleCloseRejectModal}
        quotationId={quotationToRejectId}
        handleSubmit={handleRejectQuotation}
      />
    </Container>
  );
}
