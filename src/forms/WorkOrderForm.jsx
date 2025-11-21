// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { workOrders } from "../data/mockdata";

// // --- Helper function to find data ---
// const getWorkOrderDataById = (id) => {
//   return workOrders.find((wo) => wo.workOrderId === id);
// };

// // --- Initial State for a New Work Order ---
// const getInitialState = () => ({
//   // Header
//   workOrderId: "",
//   poNumber: "",
//   customerName: "",
//   projectName: "",
//   branch: "",        // ← Added
//   material: "",      // ← Added
//   woDate: new Date().toISOString().split("T")[0],
//   expectedDeliveryDate: "",

//   // Specification
//   specification: {
//     general: "",
//     deskFinish: "",
//     chairSpecs: "",
//     loungeSpecs: "",
//     colorScheme: "",
//     customRequirements: "",
//   },

//   // Site Condition
//   condition: {
//     siteReadiness: "",
//     accessConditions: "",
//     installationSpace: "",
//     specialRequirements: "",
//     clientPreparation: "",
//   },

//   // Payment
//   payment: {
//     terms: "",
//     advanceAmount: "",
//     advancePaid: false,
//     balanceAmount: "",
//   },

//   // Scrap Holding
//   scrapHolding: {
//     applicable: false,
//     estimatedScrapQuantity: "",
//     scrapType: "",
//     scrapValue: "",
//     scrapDisposalMethod: "",
//   },

//   // Machine
//   machine: {
//     required: false,
//     cncRequired: false,
//     cncHours: "",
//     edgeBandingRequired: false,
//     edgeBandingHours: "",
//     drillingRequired: false,
//     drillingHours: "",
//     polishingRequired: false,
//     polishingHours: "",
//     otherMachinery: "",
//   },

//   // Light
//   light: {
//     workshopLightingRequired: false,
//     installationLightingRequired: false,
//     qualityCheckLighting: "",
//     siteHasAdequateLighting: true,
//     lightingNotes: "",
//   },

//   // Power
//   power: {
//     workshopPowerRequired: false,
//     estimatedPowerConsumption: "",
//     heavyMachineryPower: false,
//     sitePowerAvailable: true,
//     sitePowerType: "",
//     powerPointsRequired: "",
//     generatorBackup: false,
//     powerNotes: "",
//   },

//   // Client Info
//   client: {
//     primaryContact: "",
//     primaryContactMobile: "",
//     primaryContactEmail: "",
//     siteContactPerson: "",
//     siteContactMobile: "",
//     siteAddress: "",
//     billingAddress: "",
//     gstNumber: "",
//     panNumber: "",
//     preferredCommunicationMode: "",
//     preferredVisitTime: "",
//     accessInstructions: "",
//     clientExpectations: "",
//     specialClientRequirements: "",
//   },

//   notes: "",
// });

// // --- DUMMY DATA FOR DROPDOWNS ---
// const officeBranches = [
//   "Select Office Branch",
//   "Kolkata",
//   "Mumbai",
//   "Delhi",
//   "Hyderabad",
//   "Nagpur",
//   "Chennai",
//   "Bangalore",
//   "Pune",
//   "Ahmedabad"
// ];

// const materialOptions = [
//   "Select Material",
//   "Plywood",
//   "MDF",
//   "HDF",
//   "Particle Board",
//   "Laminate Sheets",
//   "Veneer",
//   "Aluminium Foils",
//   "Acrylic Sheets",
//   "Glass",
//   "Stainless Steel",
//   "Hardware (Hinges, Handles)",
//   "Screws & Fasteners",
//   "Edge Banding",
//   "Paint & Finishes"
// ];

// const WorkOrderForm = () => {
//   const { workOrderId: idFromUrl } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Determine view context: "accounts" or "operations"
//   const { viewContext = "operations" } = location.state || {};
//   const isAccountsView = viewContext === "accounts";

//   const [formData, setFormData] = useState(getInitialState);
//   const isEditMode = !!idFromUrl;

//   useEffect(() => {
//     if (isEditMode) {
//       const data = getWorkOrderDataById(idFromUrl);
//       if (data) {
//         setFormData((prevState) => ({
//           ...prevState,
//           ...data,
//           specification: { ...prevState.specification, ...data.specification },
//           condition: { ...prevState.condition, ...data.condition },
//           payment: { ...prevState.payment, ...data.payment },
//           scrapHolding: { ...prevState.scrapHolding, ...data.scrapHolding },
//           machine: { ...prevState.machine, ...data.machine },
//           light: { ...prevState.light, ...data.light },
//           power: { ...prevState.power, ...data.power },
//           client: { ...prevState.client, ...data.client },
//         }));
//       } else {
//         console.error(`Work Order with ID ${idFromUrl} not found.`);
//       }
//     } else {
//       setFormData(getInitialState());
//     }
//   }, [idFromUrl, isEditMode]);

//   const handleMainChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNestedChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value },
//     }));
//   };

//   const handleCheckboxChange = (section, field) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: !prev[section][field],
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Work Order Data:", formData);

//     if (isEditMode) {
//       alert(`Work Order ${formData.workOrderId} updated successfully!`);
//     } else {
//       alert("Work Order created successfully!");
//     }

//     navigate(-1);
//   };

//   const handleCancel = () => navigate(-1);

//   const cardTitle = isEditMode ? `Work Order: ${formData.workOrderId}` : "New Work Order";
//   const submitButtonText = isEditMode ? "Save Changes" : "Create Work Order";

//   return (
//     <Container fluid className="my-4">
//       <Button
//         className="mb-3"
//         style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
//         onClick={() => navigate(-1)}
//       >
//         <FaArrowLeft />
//       </Button>

//       <Form onSubmit={handleSubmit}>
//         {/* Header */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h4">{cardTitle}</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Row>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Work Order No</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="workOrderId"
//                     value={formData.workOrderId}
//                     onChange={handleMainChange}
//                     placeholder="e.g. WO-N25-002"
//                     required
//                     disabled={isEditMode}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="woDate"
//                     value={formData.woDate}
//                     onChange={handleMainChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Customer Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="customerName"
//                     value={formData.customerName}
//                     onChange={handleMainChange}
//                     placeholder="Enter customer name"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* ✅ NEW: Branch & Material Dropdowns */}
//             <Row>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Office Branch</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="branch"
//                     value={formData.branch}
//                     onChange={handleMainChange}
//                   >
//                     {officeBranches.map((branch) => (
//                       <option key={branch} value={branch}>
//                         {branch}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Material</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="material"
//                     value={formData.material}
//                     onChange={handleMainChange}
//                   >
//                     {materialOptions.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//                  <Col md="3">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Expected Delivery Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="expectedDeliveryDate"
//                     value={formData.expectedDeliveryDate}
//                     onChange={handleMainChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Project Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="projectName"
//                     value={formData.projectName}
//                     onChange={handleMainChange}
//                     placeholder="e.g. Office Setup – Bengaluru"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               {/* <Col md="3">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Expected Delivery Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="expectedDeliveryDate"
//                     value={formData.expectedDeliveryDate}
//                     onChange={handleMainChange}
//                   />
//                 </Form.Group>
//               </Col> */}
//             </Row>
//           </Card.Body>
//         </Card>

//         {/* Client Information */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h5">Client Information</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Row>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Primary Contact</Form.Label>
//                   <Form.Control
//                     value={formData.client.primaryContact}
//                     onChange={(e) =>
//                       handleNestedChange("client", "primaryContact", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile</Form.Label>
//                   <Form.Control
//                     value={formData.client.primaryContactMobile}
//                     onChange={(e) =>
//                       handleNestedChange("client", "primaryContactMobile", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={formData.client.primaryContactEmail}
//                     onChange={(e) =>
//                       handleNestedChange("client", "primaryContactEmail", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Site Address</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     value={formData.client.siteAddress}
//                     onChange={(e) =>
//                       handleNestedChange("client", "siteAddress", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Billing Address</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     value={formData.client.billingAddress}
//                     onChange={(e) =>
//                       handleNestedChange("client", "billingAddress", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>GST Number</Form.Label>
//                   <Form.Control
//                     value={formData.client.gstNumber}
//                     onChange={(e) =>
//                       handleNestedChange("client", "gstNumber", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>PAN Number</Form.Label>
//                   <Form.Control
//                     value={formData.client.panNumber}
//                     onChange={(e) =>
//                       handleNestedChange("client", "panNumber", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="4">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Preferred Visit Time</Form.Label>
//                   <Form.Control
//                     value={formData.client.preferredVisitTime}
//                     onChange={(e) =>
//                       handleNestedChange("client", "preferredVisitTime", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>

//         {/* Specification */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h5">Product Specification</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Row>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>General Design</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     value={formData.specification.general}
//                     onChange={(e) =>
//                       handleNestedChange("specification", "general", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Color Scheme</Form.Label>
//                   <Form.Control
//                     value={formData.specification.colorScheme}
//                     onChange={(e) =>
//                       handleNestedChange("specification", "colorScheme", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Custom Requirements</Form.Label>
//                   <Form.Control
//                     value={formData.specification.customRequirements}
//                     onChange={(e) =>
//                       handleNestedChange("specification", "customRequirements", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>

//         {/* Site Condition */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h5">Site Conditions</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Row>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Site Readiness</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={formData.condition.siteReadiness}
//                     onChange={(e) =>
//                       handleNestedChange("condition", "siteReadiness", e.target.value)
//                     }
//                   >
//                     <option value="">Select</option>
//                     <option value="Site ready for delivery">Ready</option>
//                     <option value="Under construction">Under Construction</option>
//                     <option value="Not ready">Not Ready</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Access Conditions</Form.Label>
//                   <Form.Control
//                     value={formData.condition.accessConditions}
//                     onChange={(e) =>
//                       handleNestedChange("condition", "accessConditions", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Special Requirements</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     value={formData.condition.specialRequirements}
//                     onChange={(e) =>
//                       handleNestedChange("condition", "specialRequirements", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Client Preparation</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     value={formData.condition.clientPreparation}
//                     onChange={(e) =>
//                       handleNestedChange("condition", "clientPreparation", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>

//         {/* ✅ Payment Section: ONLY shown in Accounts view */}
//         {(isAccountsView || !isEditMode) && (
//           <Card className="mb-4">
//             <Card.Header>
//               <Card.Title as="h5">Payment Details</Card.Title>
//             </Card.Header>
//             <Card.Body>
//               <Row>
//                 <Col md="6">
//                   <Form.Group className="mb-3">
//                     <Form.Label>Payment Terms</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={2}
//                       value={formData.payment.terms}
//                       onChange={(e) =>
//                         handleNestedChange("payment", "terms", e.target.value)
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md="3">
//                   <Form.Group className="mb-3">
//                     <Form.Label>Advance Amount (₹)</Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={formData.payment.advanceAmount}
//                       onChange={(e) =>
//                         handleNestedChange("payment", "advanceAmount", e.target.value)
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md="3">
//                   <Form.Group className="mb-3">
//                     <Form.Label>Balance Amount (₹)</Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={formData.payment.balanceAmount}
//                       onChange={(e) =>
//                         handleNestedChange("payment", "balanceAmount", e.target.value)
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <Form.Check
//                     type="checkbox"
//                     label="Advance Paid?"
//                     checked={formData.payment.advancePaid}
//                     onChange={() => handleCheckboxChange("payment", "advancePaid")}
//                   />
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         )}

//         {/* Scrap Holding */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h5">Scrap Holding</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Form.Check
//               type="checkbox"
//               label="Scrap Applicable?"
//               checked={formData.scrapHolding.applicable}
//               onChange={() => handleCheckboxChange("scrapHolding", "applicable")}
//               className="mb-3"
//             />
//             {formData.scrapHolding.applicable && (
//               <Row>
//                 <Col md="4">
//                   <Form.Group className="mb-3">
//                     <Form.Label>Estimated Quantity</Form.Label>
//                     <Form.Control
//                       value={formData.scrapHolding.estimatedScrapQuantity}
//                       onChange={(e) =>
//                         handleNestedChange("scrapHolding", "estimatedScrapQuantity", e.target.value)
//                       }
//                       placeholder="e.g. 50 kg"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md="4">
//                   <Form.Group className="mb-3">
//                     <Form.Label>Scrap Type</Form.Label>
//                     <Form.Control
//                       value={formData.scrapHolding.scrapType}
//                       onChange={(e) =>
//                         handleNestedChange("scrapHolding", "scrapType", e.target.value)
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 {/* ✅ Scrap Value: ONLY shown in Accounts view */}
//                 {(isAccountsView || !isEditMode) && (
//                   <Col md="4">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Scrap Value (₹)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={formData.scrapHolding.scrapValue || ""}
//                         onChange={(e) =>
//                           handleNestedChange("scrapHolding", "scrapValue", e.target.value)
//                         }
//                         placeholder="e.g. 2500"
//                       />
//                     </Form.Group>
//                   </Col>
//                 )}
//                 <Col md={isAccountsView ? "4" : "6"}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Disposal Method</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={formData.scrapHolding.scrapDisposalMethod}
//                       onChange={(e) =>
//                         handleNestedChange("scrapHolding", "scrapDisposalMethod", e.target.value)
//                       }
//                     >
//                       <option value="">Select</option>
//                       <option value="Recycle">Recycle</option>
//                       <option value="Sell">Sell</option>
//                       <option value="Dispose">Dispose</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             )}
//           </Card.Body>
//         </Card>

//         {/* Machine Requirements */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h5">Machine Requirements</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Form.Check
//               type="checkbox"
//               label="Machinery Required?"
//               checked={formData.machine.required}
//               onChange={() => handleCheckboxChange("machine", "required")}
//               className="mb-3"
//             />
//             {formData.machine.required && (
//               <>
//                 <Row>
//                   <Col md="3">
//                     <Form.Check
//                       type="checkbox"
//                       label="CNC Required"
//                       checked={formData.machine.cncRequired}
//                       onChange={() => handleCheckboxChange("machine", "cncRequired")}
//                     />
//                   </Col>
//                   {formData.machine.cncRequired && (
//                     <Col md="3">
//                       <Form.Group>
//                         <Form.Label>CNC Hours</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={formData.machine.cncHours}
//                           onChange={(e) =>
//                             handleNestedChange("machine", "cncHours", e.target.value)
//                           }
//                         />
//                       </Form.Group>
//                     </Col>
//                   )}
//                 </Row>

//                 <Row className="mt-2">
//                   <Col md="3">
//                     <Form.Check
//                       type="checkbox"
//                       label="Edge Banding"
//                       checked={formData.machine.edgeBandingRequired}
//                       onChange={() => handleCheckboxChange("machine", "edgeBandingRequired")}
//                     />
//                   </Col>
//                   {formData.machine.edgeBandingRequired && (
//                     <Col md="3">
//                       <Form.Group>
//                         <Form.Label>Hours</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={formData.machine.edgeBandingHours}
//                           onChange={(e) =>
//                             handleNestedChange("machine", "edgeBandingHours", e.target.value)
//                           }
//                         />
//                       </Form.Group>
//                     </Col>
//                   )}
//                 </Row>

//                 <Row className="mt-2">
//                   <Col md="6">
//                     <Form.Group>
//                       <Form.Label>Other Machinery</Form.Label>
//                       <Form.Control
//                         value={formData.machine.otherMachinery}
//                         onChange={(e) =>
//                           handleNestedChange("machine", "otherMachinery", e.target.value)
//                         }
//                         placeholder="e.g. Panel Saw, Lamination Press"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </>
//             )}
//           </Card.Body>
//         </Card>

//         {/* Light & Power */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h5">Light & Power Requirements</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Row>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Quality Check Lighting</Form.Label>
//                   <Form.Control
//                     value={formData.light.qualityCheckLighting}
//                     onChange={(e) =>
//                       handleNestedChange("light", "qualityCheckLighting", e.target.value)
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Check
//                   type="checkbox"
//                   label="Workshop Lighting Required"
//                   checked={formData.light.workshopLightingRequired}
//                   onChange={() => handleCheckboxChange("light", "workshopLightingRequired")}
//                   className="mb-2"
//                 />
//                 <Form.Check
//                   type="checkbox"
//                   label="Site has Adequate Lighting"
//                   checked={formData.light.siteHasAdequateLighting}
//                   onChange={() => handleCheckboxChange("light", "siteHasAdequateLighting")}
//                 />
//               </Col>
//               <Col md="6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Estimated Power Consumption</Form.Label>
//                   <Form.Control
//                     value={formData.power.estimatedPowerConsumption}
//                     onChange={(e) =>
//                       handleNestedChange("power", "estimatedPowerConsumption", e.target.value)
//                     }
//                     placeholder="e.g. 350 kWh"
//                   />
//                 </Form.Group>
//                 <Form.Check
//                   type="checkbox"
//                   label="Heavy Machinery Power (3-Phase)"
//                   checked={formData.power.heavyMachineryPower}
//                   onChange={() => handleCheckboxChange("power", "heavyMachineryPower")}
//                   className="mb-2"
//                 />
//                 <Form.Check
//                   type="checkbox"
//                   label="Site Power Available"
//                   checked={formData.power.sitePowerAvailable}
//                   onChange={() => handleCheckboxChange("power", "sitePowerAvailable")}
//                 />
//                 <Form.Group className="mt-2">
//                   <Form.Label>Site Power Type</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={formData.power.sitePowerType}
//                     onChange={(e) =>
//                       handleNestedChange("power", "sitePowerType", e.target.value)
//                     }
//                   >
//                     <option value="">Select</option>
//                     <option value="Single Phase">Single Phase</option>
//                     <option value="Three Phase">Three Phase</option>
//                     <option value="Generator">Generator</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>

//         {/* Notes */}
//         <Card className="mb-4">
//           <Card.Header>
//             <Card.Title as="h5">Notes</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Form.Group>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={formData.notes}
//                 onChange={(e) => handleMainChange(e)}
//                 name="notes"
//                 placeholder="Any additional notes..."
//               />
//             </Form.Group>
//           </Card.Body>
//         </Card>

//         {/* Submit */}
//         <div className="d-flex justify-content-end gap-3">
//           <Button variant="secondary" onClick={handleCancel} style={{ height: "40px" }}>
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             style={{ backgroundColor: "#ed3131", border: "none", height: "40px" }}
//           >
//             {submitButtonText}
//           </Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default WorkOrderForm;
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { workOrders } from "../data/mockdata";

// --- Helper function to find data ---
const getWorkOrderDataById = (id) => {
  return workOrders.find((wo) => wo.workOrderId === id);
};

// --- Initial State for a New Work Order ---
const getInitialState = () => ({
  // Header
  workOrderId: "",
  poNumber: "",
  customerName: "",
  projectName: "",
  branch: "",
  material: "",
  woDate: new Date().toISOString().split("T")[0],
  expectedDeliveryDate: "",
  // Specification
  specification: {
    general: "",
    deskFinish: "",
    chairSpecs: "",
    loungeSpecs: "",
    colorScheme: "",
    customRequirements: "",
  },
  // Site Condition
  condition: {
    siteReadiness: "",
    accessConditions: "",
    installationSpace: "",
    specialRequirements: "",
    clientPreparation: "",
  },
  // Payment
  payment: {
    terms: "",
    advanceAmount: "",
    advancePaid: false,
    balanceAmount: "",
  },
  // Scrap Holding
  scrapHolding: {
    applicable: false,
    estimatedScrapQuantity: "",
    scrapType: "",
    scrapValue: "",
    scrapDisposalMethod: "",
  },
  // Machine
  machine: {
    required: false,
    cncRequired: false,
    cncHours: "",
    edgeBandingRequired: false,
    edgeBandingHours: "",
    drillingRequired: false,
    drillingHours: "",
    polishingRequired: false,
    polishingHours: "",
    otherMachinery: "",
  },
  // Light
  light: {
    workshopLightingRequired: false,
    installationLightingRequired: false,
    qualityCheckLighting: "",
    siteHasAdequateLighting: true,
    lightingNotes: "",
  },
  // Power
  power: {
    workshopPowerRequired: false,
    estimatedPowerConsumption: "",
    heavyMachineryPower: false,
    sitePowerAvailable: true,
    sitePowerType: "",
    powerPointsRequired: "",
    generatorBackup: false,
    powerNotes: "",
  },
  // Client Info
  client: {
    primaryContact: "",
    primaryContactMobile: "",
    primaryContactEmail: "",
    siteContactPerson: "",
    siteContactMobile: "",
    siteAddress: "",
    billingAddress: "",
    gstNumber: "",
    panNumber: "",
    preferredCommunicationMode: "",
    preferredVisitTime: "",
    accessInstructions: "",
    clientExpectations: "",
    specialClientRequirements: "",
  },
  notes: "",
});

// --- DUMMY DATA FOR DROPDOWNS ---
const officeBranches = [
  "Select Office Branch",
  "Kolkata",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Nagpur",
  "Chennai",
  "Bangalore",
  "Pune",
  "Ahmedabad",
];

const materialOptions = [
  "Select Product",
  "Plywood",
  "MDF",
  "HDF",
  "Particle Board",
  "Laminate Sheets",
  "Veneer",
  "Aluminium Foils",
  "Acrylic Sheets",
  "Glass",
  "Stainless Steel",
  "Hardware (Hinges, Handles)",
  "Screws & Fasteners",
  "Edge Banding",
  "Paint & Finishes",
];

const WorkOrderForm = () => {
  const { workOrderId: idFromUrl } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { viewContext = "operations" } = location.state || {};
  const isAccountsView = viewContext === "accounts";

  const [formData, setFormData] = useState(getInitialState);
  const isEditMode = !!idFromUrl;

  useEffect(() => {
    if (isEditMode) {
      const data = getWorkOrderDataById(idFromUrl);
      if (data) {
        setFormData((prevState) => ({
          ...prevState,
          ...data,
          specification: { ...prevState.specification, ...data.specification },
          condition: { ...prevState.condition, ...data.condition },
          payment: { ...prevState.payment, ...data.payment },
          scrapHolding: { ...prevState.scrapHolding, ...data.scrapHolding },
          machine: { ...prevState.machine, ...data.machine },
          light: { ...prevState.light, ...data.light },
          power: { ...prevState.power, ...data.power },
          client: { ...prevState.client, ...data.client },
        }));
      } else {
        console.error(`Work Order with ID ${idFromUrl} not found.`);
      }
    } else {
      setFormData(getInitialState());
    }
  }, [idFromUrl, isEditMode]);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleCheckboxChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Work Order Data:", formData);
    if (isEditMode) {
      alert(`Work Order ${formData.workOrderId} updated successfully!`);
    } else {
      alert("Work Order created successfully!");
    }
    navigate(-1);
  };

  const handleCancel = () => navigate(-1);

  const cardTitle = isEditMode
    ? `Work Order: ${formData.workOrderId}`
    : "New Work Order";
  const submitButtonText = isEditMode ? "Save Changes" : "Create Work Order";

  return (
    <Container fluid className="my-4">
      <Button
        className="mb-3"
        style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </Button>

      <Form onSubmit={handleSubmit}>
        {/* Header Card */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h4">{cardTitle}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Work Order No</Form.Label>
                  <Form.Control
                    type="text"
                    name="workOrderId"
                    value={formData.workOrderId}
                    onChange={handleMainChange}
                    placeholder="e.g. WO-N25-002"
                    required
                    disabled={isEditMode}
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="woDate"
                    value={formData.woDate}
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleMainChange}
                    placeholder="Enter customer name"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Branch & Material Dropdowns */}
            <Row>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Office Branch</Form.Label>
                  <Form.Control
                    as="select"
                    name="branch"
                    value={formData.branch}
                    onChange={handleMainChange}
                  >
                    {officeBranches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    as="select"
                    name="material"
                    value={formData.material}
                    onChange={handleMainChange}
                  >
                    {materialOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Expected Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expectedDeliveryDate"
                    value={formData.expectedDeliveryDate}
                    onChange={handleMainChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleMainChange}
                    placeholder="e.g. Office Setup – Bengaluru"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Tab Layout */}
        <Card className="striped-tabled-with-hover">
        <Tabs defaultActiveKey="product" id="approval-tabs" >
          {/* Product Details Tab */}
          <Tab eventKey="product" title="Product Details">
            {/* Specification */}
            <Card className="mb-4 ">
              <Card.Header>
                <Card.Title as="h5">Product Specification</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>General Design</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formData.specification.general}
                        onChange={(e) =>
                          handleNestedChange("specification", "general", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Color Scheme</Form.Label>
                      <Form.Control
                        value={formData.specification.colorScheme}
                        onChange={(e) =>
                          handleNestedChange("specification", "colorScheme", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Custom Requirements</Form.Label>
                      <Form.Control
                        value={formData.specification.customRequirements}
                        onChange={(e) =>
                          handleNestedChange("specification", "customRequirements", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Site Condition */}
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Site Conditions</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Site Readiness</Form.Label>
                      <Form.Control
                        as="select"
                        value={formData.condition.siteReadiness}
                        onChange={(e) =>
                          handleNestedChange("condition", "siteReadiness", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Site ready for delivery">Ready</option>
                        <option value="Under construction">Under Construction</option>
                        <option value="Not ready">Not Ready</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Access Conditions</Form.Label>
                      <Form.Control
                        value={formData.condition.accessConditions}
                        onChange={(e) =>
                          handleNestedChange("condition", "accessConditions", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Special Requirements</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formData.condition.specialRequirements}
                        onChange={(e) =>
                          handleNestedChange("condition", "specialRequirements", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Client Preparation</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formData.condition.clientPreparation}
                        onChange={(e) =>
                          handleNestedChange("condition", "clientPreparation", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Payment Section */}
            {(isAccountsView || !isEditMode) && (
              <Card className="mb-4">
                <Card.Header>
                  <Card.Title as="h5">Payment Details</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <Form.Label>Payment Terms</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={formData.payment.terms}
                          onChange={(e) =>
                            handleNestedChange("payment", "terms", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="3">
                      <Form.Group className="mb-3">
                        <Form.Label>Advance Amount (₹)</Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.payment.advanceAmount}
                          onChange={(e) =>
                            handleNestedChange("payment", "advanceAmount", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="3">
                      <Form.Group className="mb-3">
                        <Form.Label>Balance Amount (₹)</Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.payment.balanceAmount}
                          onChange={(e) =>
                            handleNestedChange("payment", "balanceAmount", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Advance Paid?"
                        checked={formData.payment.advancePaid}
                        onChange={() => handleCheckboxChange("payment", "advancePaid")}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}

            {/* Scrap Holding */}
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Scrap Holding</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Check
                  type="checkbox"
                  label="Scrap Applicable?"
                  checked={formData.scrapHolding.applicable}
                  onChange={() => handleCheckboxChange("scrapHolding", "applicable")}
                  className="mb-3"
                />
                {formData.scrapHolding.applicable && (
                  <Row>
                    <Col md="4">
                      <Form.Group className="mb-3">
                        <Form.Label>Estimated Quantity</Form.Label>
                        <Form.Control
                          value={formData.scrapHolding.estimatedScrapQuantity}
                          onChange={(e) =>
                            handleNestedChange("scrapHolding", "estimatedScrapQuantity", e.target.value)
                          }
                          placeholder="e.g. 50 kg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group className="mb-3">
                        <Form.Label>Scrap Type</Form.Label>
                        <Form.Control
                          value={formData.scrapHolding.scrapType}
                          onChange={(e) =>
                            handleNestedChange("scrapHolding", "scrapType", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    {(isAccountsView || !isEditMode) && (
                      <Col md="4">
                        <Form.Group className="mb-3">
                          <Form.Label>Scrap Value (₹)</Form.Label>
                          <Form.Control
                            type="number"
                            value={formData.scrapHolding.scrapValue || ""}
                            onChange={(e) =>
                              handleNestedChange("scrapHolding", "scrapValue", e.target.value)
                            }
                            placeholder="e.g. 2500"
                          />
                        </Form.Group>
                      </Col>
                    )}
                    <Col md={isAccountsView ? "4" : "6"}>
                      <Form.Group className="mb-3">
                        <Form.Label>Disposal Method</Form.Label>
                        <Form.Control
                          as="select"
                          value={formData.scrapHolding.scrapDisposalMethod}
                          onChange={(e) =>
                            handleNestedChange("scrapHolding", "scrapDisposalMethod", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Recycle">Recycle</option>
                          <option value="Sell">Sell</option>
                          <option value="Dispose">Dispose</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>

            {/* Machine Requirements */}
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Machine Requirements</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Check
                  type="checkbox"
                  label="Machinery Required?"
                  checked={formData.machine.required}
                  onChange={() => handleCheckboxChange("machine", "required")}
                  className="mb-3"
                />
                {formData.machine.required && (
                  <>
                    <Row>
                      <Col md="3">
                        <Form.Check
                          type="checkbox"
                          label="CNC Required"
                          checked={formData.machine.cncRequired}
                          onChange={() => handleCheckboxChange("machine", "cncRequired")}
                        />
                      </Col>
                      {formData.machine.cncRequired && (
                        <Col md="3">
                          <Form.Group>
                            <Form.Label>CNC Hours</Form.Label>
                            <Form.Control
                              type="number"
                              value={formData.machine.cncHours}
                              onChange={(e) =>
                                handleNestedChange("machine", "cncHours", e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      )}
                    </Row>
                    <Row className="mt-2">
                      <Col md="3">
                        <Form.Check
                          type="checkbox"
                          label="Edge Banding"
                          checked={formData.machine.edgeBandingRequired}
                          onChange={() =>
                            handleCheckboxChange("machine", "edgeBandingRequired")
                          }
                        />
                      </Col>
                      {formData.machine.edgeBandingRequired && (
                        <Col md="3">
                          <Form.Group>
                            <Form.Label>Hours</Form.Label>
                            <Form.Control
                              type="number"
                              value={formData.machine.edgeBandingHours}
                              onChange={(e) =>
                                handleNestedChange("machine", "edgeBandingHours", e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      )}
                    </Row>
                    <Row className="mt-2">
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Other Machinery</Form.Label>
                          <Form.Control
                            value={formData.machine.otherMachinery}
                            onChange={(e) =>
                              handleNestedChange("machine", "otherMachinery", e.target.value)
                            }
                            placeholder="e.g. Panel Saw, Lamination Press"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>

            {/* Light & Power */}
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Light & Power Requirements</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Quality Check Lighting</Form.Label>
                      <Form.Control
                        value={formData.light.qualityCheckLighting}
                        onChange={(e) =>
                          handleNestedChange("light", "qualityCheckLighting", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Workshop Lighting Required"
                      checked={formData.light.workshopLightingRequired}
                      onChange={() => handleCheckboxChange("light", "workshopLightingRequired")}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Site has Adequate Lighting"
                      checked={formData.light.siteHasAdequateLighting}
                      onChange={() => handleCheckboxChange("light", "siteHasAdequateLighting")}
                    />
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Estimated Power Consumption</Form.Label>
                      <Form.Control
                        value={formData.power.estimatedPowerConsumption}
                        onChange={(e) =>
                          handleNestedChange("power", "estimatedPowerConsumption", e.target.value)
                        }
                        placeholder="e.g. 350 kWh"
                      />
                    </Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Heavy Machinery Power (3-Phase)"
                      checked={formData.power.heavyMachineryPower}
                      onChange={() => handleCheckboxChange("power", "heavyMachineryPower")}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Site Power Available"
                      checked={formData.power.sitePowerAvailable}
                      onChange={() => handleCheckboxChange("power", "sitePowerAvailable")}
                    />
                    <Form.Group className="mt-2">
                      <Form.Label>Site Power Type</Form.Label>
                      <Form.Control
                        as="select"
                        value={formData.power.sitePowerType}
                        onChange={(e) =>
                          handleNestedChange("power", "sitePowerType", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Single Phase">Single Phase</option>
                        <option value="Three Phase">Three Phase</option>
                        <option value="Generator">Generator</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Notes */}
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Notes</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.notes}
                    onChange={handleMainChange}
                    name="notes"
                    placeholder="Any additional notes..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Client Details Tab */}

           <Tab eventKey="client" title="Client Details">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Client Information</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Primary Contact</Form.Label>
                      <Form.Control
                        value={formData.client.primaryContact}
                        onChange={(e) =>
                          handleNestedChange("client", "primaryContact", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        value={formData.client.primaryContactMobile}
                        onChange={(e) =>
                          handleNestedChange("client", "primaryContactMobile", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.client.primaryContactEmail}
                        onChange={(e) =>
                          handleNestedChange("client", "primaryContactEmail", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Site Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formData.client.siteAddress}
                        onChange={(e) =>
                          handleNestedChange("client", "siteAddress", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Billing Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formData.client.billingAddress}
                        onChange={(e) =>
                          handleNestedChange("client", "billingAddress", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>GST Number</Form.Label>
                      <Form.Control
                        value={formData.client.gstNumber}
                        onChange={(e) =>
                          handleNestedChange("client", "gstNumber", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>PAN Number</Form.Label>
                      <Form.Control
                        value={formData.client.panNumber}
                        onChange={(e) =>
                          handleNestedChange("client", "panNumber", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Preferred Visit Time</Form.Label>
                      <Form.Control
                        value={formData.client.preferredVisitTime}
                        onChange={(e) =>
                          handleNestedChange("client", "preferredVisitTime", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
        </Card>
        

        {/* Submit Buttons */}
        <div className="d-flex justify-content-end gap-3">
          <Button variant="secondary" onClick={handleCancel} style={{ height: "40px" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: "#ed3131", border: "none", height: "40px" }}
          >
            {submitButtonText}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default WorkOrderForm;