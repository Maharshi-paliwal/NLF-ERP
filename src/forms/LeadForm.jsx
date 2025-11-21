import React, { useState, useEffect } from "react";
// 1. UPDATED: Destructure roundIdentifier from useParams
import { useParams, useNavigate, Link, useLocation } from "react-router-dom"; 
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { quotations as initialQuotations } from "../data/mockdata";

// Helper function to calculate totals
// UPDATED: Now accepts two sets of items and additional details
const calculateTotals = (car1Items, car1AdditionalDetails, car2Items, car2AdditionalDetails) => {
  
  // 1. Calculate the total amount for all main items (Car 1 Items + Car 2 Items)
  const totalItemAmount = [car1Items, car2Items].flat().reduce(
    (acc, item) => acc + (parseFloat(item.amount) || (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)),
    0
  );

  // 2. Calculate the total amount for all additional/installation details
  const totalAdditionalAmount = [car1AdditionalDetails, car2AdditionalDetails].flat().reduce(
    (acc, item) => acc + (parseFloat(item.amount) || (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)),
    0
  );
  
  // Subtotal is the sum of all quoted items/services before tax
  const subtotal = totalItemAmount + totalAdditionalAmount; 
  const gst = subtotal * 0.18; // 18% GST as an example
  const grandTotal = subtotal + gst;

  // The JSX currently displays 'Basic Amount' which is the total for all Item Descriptions.
  return { 
    basicAmount: totalItemAmount, // This is the sum of all item descriptions (Car 1 + Car 2)
    gst, 
    grandTotal 
  };
};

// Custom ID generation logic
const generateNewQuotationId = (quotations) => {
  // NOTE: The mockdata file provided is an array containing an array of quotes: `export const quotations = [ [ { ... } ] ]`
  // This helper must be more robust to handle that structure if it still exists.
  const allQuotes = quotations.flat(); 
  const lastQuotation = allQuotes[allQuotes.length - 1];
  const lastId = lastQuotation ? parseInt(lastQuotation.quotationId.substring(5)) : 0;
  const newId = (lastId + 1).toString().padStart(3, '0');
  const year = new Date().getFullYear().toString().substring(2);
  return `Q-N${year}-${newId}`;
};

// --- DUMMY DATA FOR DROPDOWN ---
const materialOptions = [
  "Select Material",
  "Ply",
  "Screws",
  "Aluminium Foils",
  "Laminates",
];
// --- END DUMMY DATA ---

// Initial state for form fields
// UPDATED: Added secondCarItems and secondCarAdditionalDetails
const initialFormState = {
  quotationId: "",
  date: "",
  customerName: "",
  customerCity: "",
  items: [
    { id: `item-${Date.now()}`, description: "", unit: "", quantity: "", rate: "", amount: "", material: materialOptions[0] }, // Added 'amount' and 'material'
  ],
  additionalDetails: [
    { id: `addl-${Date.now()}`, description: "", unit: "", quantity: "", rate: "", amount: "" }, // Added 'amount'
  ],
  commercialTerms: {
    gst: "As applicable",
    supplyTerms: "",
    installationTerms: "",
  },
  // --- NEW FIELDS FOR SECOND CAR ---
  secondCarItems: [ 
    { id: `sc-item-${Date.now() + 1}`, description: "", unit: "", quantity: "", rate: "", amount: "", material: materialOptions[0] }, 
  ],
  secondCarAdditionalDetails: [ 
    { id: `sc-addl-${Date.now() + 2}`, description: "", unit: "", quantity: "", rate: "", amount: "" },
  ],
  // ----------------------------------
};

export default function NewQuotation() {
  // 1. CHANGE: Destructure both quotationId and roundIdentifier from the URL
  const { quotationId, roundIdentifier } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();

  // Check if coming from ClientLead page or for revision
  const isNewQuotation = !quotationId;
  
  // Check if we are in "Read-Only except Rate" mode (i.e., we are viewing an existing quote)
  // When quotationId is present, assume it's an existing quote being viewed/edited
  const isRateOnlyEditable = !isNewQuotation; 

  const [formData, setFormData] = useState(initialFormState);
  const [totals, setTotals] = useState({
    basicAmount: 0,
    gst: 0,
    grandTotal: 0,
  });

  const isFullyReadOnly = isViewMode;


  // Calculate totals whenever items or additional details change
  // UPDATED: Added dependencies for the new item lists
  useEffect(() => {
    const newTotals = calculateTotals(
      formData.items,
      formData.additionalDetails,
      formData.secondCarItems,
      formData.secondCarAdditionalDetails
    );
    setTotals(newTotals);
  }, [formData.items, formData.additionalDetails, formData.secondCarItems, formData.secondCarAdditionalDetails]);

  // 2. REPLACED: Load data for revisions, viewing a specific round, or generate new ID
  // UPDATED: Logic includes mapping of new `secondCarItems` and `secondCarAdditionalDetails`
  useEffect(() => {
    // Check if we are loading an existing quotation (viewing a specific round or creating a revision)
    if (quotationId) {
      const quotationBase = initialQuotations.flat().find( // Using .flat() for robustness against mockdata structure
        (q) => q.quotationId === quotationId
      );

      if (quotationBase) {
        let targetRound;

        if (roundIdentifier) {
          // Case 1: Specific round requested (e.g., R1, Initial) via eye button
          if (roundIdentifier === "Initial" || !quotationBase.rounds?.length) {
            // "Initial" case: use base quote details (assuming no explicit round object exists yet)
            targetRound = {
              items: quotationBase.items || [], // Use items if stored at base level
              additionalDetails: quotationBase.additionalDetails || [],
              commercialTerms: quotationBase.commercialTerms || {},
              date: quotationBase.customer.date || new Date().toISOString().split('T')[0]
            };
            // Fallback check: If "Initial" is requested, check if the first round has an empty/null round name (as seen in mockdata)
            if(quotationBase.rounds && quotationBase.rounds[0] && !quotationBase.rounds[0].round) {
                targetRound = quotationBase.rounds[0];
            }
            
          } else {
            // Find the specific round (R1, R2, etc.) that matches the URL parameter
            targetRound = quotationBase.rounds?.find(
              (r) => r.round === roundIdentifier
            );
          }
        } else {
          // Case 2: No specific round is requested (e.g., coming from "Create Revision" button), load the latest round.
          if (quotationBase.rounds && quotationBase.rounds.length > 0) {
            // Find the latest round for revision
            targetRound = [...quotationBase.rounds].sort(
              // Use a robust sort value, assuming non-R# is 0 for correct ordering
              (a, b) => parseInt(b.round?.substring(1) || 0) - parseInt(a.round?.substring(1) || 0) 
            )[0];
          } else {
            // If no rounds exist, treat the base quote as the latest (initial) round
            targetRound = {
              items: quotationBase.items || [], 
              additionalDetails: quotationBase.additionalDetails || [], 
              commercialTerms: quotationBase.commercialTerms || {},
              date: quotationBase.customer.date || new Date().toISOString().split('T')[0]
            };
          }
        }

        if (targetRound) {
          // Map data to the new form structure
          setFormData({
            quotationId: quotationBase.quotationId, 
            date: targetRound.date || new Date().toISOString().split('T')[0],
            customerName: quotationBase.customer.name,
            customerCity: quotationBase.customer.address?.split(',').slice(-2, -1).join(',').trim() || quotationBase.customer.city || "",
            
            // Map items from the specific targetRound
            items: targetRound.items && targetRound.items.length
              ? targetRound.items.map((item, index) => ({ 
                  ...item, 
                  id: `item-${Date.now()}-${index}`,
                  amount: item.amount || (item.quantity * item.rate) || "", // Calculate if missing
                  material: item.material || materialOptions[0] // Set a default if missing
                }))
              : initialFormState.items,
            
            // Map additional details from the specific targetRound
            additionalDetails: targetRound.additionalDetails && targetRound.additionalDetails.length
              ? targetRound.additionalDetails.map((item, index) => ({ 
                  ...item, 
                  id: `addl-${Date.now()}-${index}`,
                  amount: item.amount || (item.quantity * item.rate) || "" // Calculate if missing
                }))
              : initialFormState.additionalDetails, 
            
            // --- NEW: Map Second Car Items ---
            secondCarItems: targetRound.secondCarItems && targetRound.secondCarItems.length
              ? targetRound.secondCarItems.map((item, index) => ({ 
                  ...item, 
                  id: `sc-item-${Date.now()}-${index}`,
                  amount: item.amount || (item.quantity * item.rate) || "",
                  material: item.material || materialOptions[0]
                }))
              : initialFormState.secondCarItems,
            
            // --- NEW: Map Second Car Additional Details ---
            secondCarAdditionalDetails: targetRound.secondCarAdditionalDetails && targetRound.secondCarAdditionalDetails.length
              ? targetRound.secondCarAdditionalDetails.map((item, index) => ({ 
                  ...item, 
                  id: `sc-addl-${Date.now()}-${index}`,
                  amount: item.amount || (item.quantity * item.rate) || ""
                }))
              : initialFormState.secondCarAdditionalDetails,

            commercialTerms: {
              gst: targetRound.commercialTerms?.gst || "As applicable",
              supplyTerms: targetRound.commercialTerms?.supplyTerms || "",
              installationTerms: targetRound.commercialTerms?.installationTerms || "",
            },
          });
        } else {
          console.error("Specific round not found:", roundIdentifier);
          navigate("/new-quotation");
        }
      } else {
        console.error("Quotation not found:", quotationId);
        navigate("/new-quotation");
      }
    } else {
      // For a new quotation, generate a unique ID and set the date
      setFormData((prev) => ({
        ...prev,
        quotationId: generateNewQuotationId(initialQuotations),
        date: new Date().toISOString().split('T')[0],
      }));
    }
  }, [quotationId, roundIdentifier, navigate]); // 3. CHANGE: Added roundIdentifier to dependency array

  // Handle changes for top-level form fields
  const handleMainFormChange = (e) => {
    const { name, value } = e.target;
    // Block changes if we are in rate-only edit mode
    if (isRateOnlyEditable) return; 

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for dynamic item fields
  const handleItemChange = (itemId, field, value, section) => {
    // Block changes if we are in rate-only edit mode AND the field is NOT 'rate'
    if (isRateOnlyEditable && field !== "rate") {
      // Stop here if it's an existing quote and the field is not 'rate'
      return; 
    }

    setFormData((prev) => {
      const updatedSection = prev[section].map((item) => {
        if (item.id === itemId) {
          const newItem = { ...item, [field]: value };

          // Logic to update 'amount' if 'quantity' or 'rate' changes
          // NOTE: This logic is CRITICAL for 'rate' updates to flow to 'amount'.
          if (field === "quantity" || field === "rate") {
            const quantity = parseFloat(newItem.quantity) || 0;
            const rate = parseFloat(newItem.rate) || 0;
            // Recalculate and set 'amount' when quantity or rate changes
            newItem.amount = (quantity * rate).toString(); 
          }
          
          return newItem;
        }
        return item;
      });
      return { ...prev, [section]: updatedSection };
    });
  };

  // Handle changes for commercial terms
  const handleCommercialTermsChange = (e) => {
    // Block changes if we are in rate-only edit mode
    if (isRateOnlyEditable) return;

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      commercialTerms: {
        ...prev.commercialTerms,
        [name]: value,
      },
    }));
  };

  // Add a new row to a dynamic section
  const handleAddItem = (section) => {
    // Block adding new items if we are in rate-only edit mode
    if (isRateOnlyEditable) return;

    // Determine the initial item structure based on the section
    let newItem = { id: `${section}-${Date.now()}`, description: "", unit: "", quantity: "", rate: "", amount: "" };
    // UPDATED: Check for both original 'items' and new 'secondCarItems'
    if (section === "items" || section === "secondCarItems") { 
      newItem.material = materialOptions[0]; // Add material field for main items
    }

    setFormData((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        newItem,
      ],
    }));
  };

  // Remove a row from a dynamic section
  const handleRemoveItem = (itemId, section) => {
    // Block removing items if we are in rate-only edit mode
    if (isRateOnlyEditable) return;

    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== itemId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Quotation Data:", { ...formData, ...totals });
    
    // Determine the save message based on the mode
    const message = isRateOnlyEditable 
      ? "Quotation rates updated successfully!" 
      : "Quotation saved successfully!";
      
    alert(message);
    navigate("/new-quotation"); // Redirect to the quotations list after saving
  };
  
  const handleCancel = () => {
    navigate("/new-quotation");
  };

  return (
    <Container fluid className="my-4">
  <Link to="/leadgeneration">
    <Button className=" mb-3 btn btn-primary"  style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}>
        <FaArrowLeft />
        </Button>
</Link>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Card 1: Quotation Details */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">
                  {quotationId ? (roundIdentifier ? `Revision: ${roundIdentifier}` : "Create Revision") : "New Quotation"}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Quote No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="quotationId"
                        value={formData.quotationId}
                        readOnly // Always read-only for new or existing
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleMainFormChange}
                        readOnly={isRateOnlyEditable} // ⬅️ ADDED readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label> Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleMainFormChange}
                        readOnly={isRateOnlyEditable} // ⬅️ ADDED readOnly
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="customerCity"
                        value={formData.customerCity}
                        onChange={handleMainFormChange}
                        readOnly={isRateOnlyEditable} // ⬅️ ADDED readOnly
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: Quotation Items (Car 1/Unit 1) */}
            <Col md="12">
                      <Card className="mb-4">
                        <Card.Header>
                          <Card.Title as="h4">Item Description</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          {formData.items.map((item) => (
                            <Row key={item.id} className="align-items-center mb-3" style={{ minHeight: '60px' }}>
                              <Col md="2">
                                <Form.Group>
                                  <Form.Label>Material</Form.Label>
                                  <Form.Control
                                    as="select"
                                    value={item.material}
                                    onChange={(e) => handleItemChange(item.id, "material", e.target.value, "items")}
                                    disabled={isRateOnlyEditable || isFullyReadOnly}
                                  >
                                    {materialOptions.map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </Form.Control>
                                </Form.Group>
                              </Col>
                              <Col md="3">
                                <Form.Group>
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={item.description}
                                    onChange={(e) => handleItemChange(item.id, "description", e.target.value, "items")}
                                    readOnly={isRateOnlyEditable || isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="1">
                                <Form.Group>
                                  <Form.Label>Unit</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={item.unit}
                                    onChange={(e) => handleItemChange(item.id, "unit", e.target.value, "items")}
                                    readOnly={isRateOnlyEditable || isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="1">
                                <Form.Group>
                                  <Form.Label>Quantity</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(item.id, "quantity", e.target.value, "items")}
                                    readOnly={isRateOnlyEditable || isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="2">
                                <Form.Group>
                                  <Form.Label>Rate</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => handleItemChange(item.id, "rate", e.target.value, "items")}
                                    readOnly={isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="2">
                                <Form.Group>
                                  <Form.Label>Amount</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={item.amount || (parseFloat(item.quantity) * parseFloat(item.rate)) || 0}
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="1">
                                {!isRateOnlyEditable && !isFullyReadOnly && formData.items.length > 1 && (
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="mt-4"
                                    onClick={() => handleRemoveItem(item.id, "items")}
                                  >
                                    <FaMinus />
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          ))}
                          {!isRateOnlyEditable && !isFullyReadOnly && (
                            <div className="d-flex justify-content-start">
                              <Button variant="primary" size="sm" onClick={() => handleAddItem("items")}>
                                <FaPlus /> Add Item
                              </Button>
                            </div>
                          )}
                        </Card.Body>
          
                        <Card.Header>
                          <Card.Title as="h4">Installation Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          {formData.additionalDetails.map((item) => (
                            <Row key={item.id} className="align-items-center mb-3" style={{ minHeight: '60px' }}>
                              <Col md="5">
                                <Form.Group>
                                  <Form.Label>Installation</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={item.description}
                                    onChange={(e) => handleItemChange(item.id, "description", e.target.value, "additionalDetails")}
                                    readOnly={isRateOnlyEditable || isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="1">
                                <Form.Group>
                                  <Form.Label>Unit</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={item.unit}
                                    onChange={(e) => handleItemChange(item.id, "unit", e.target.value, "additionalDetails")}
                                    readOnly={isRateOnlyEditable || isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="1">
                                <Form.Group>
                                  <Form.Label>Quantity</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(item.id, "quantity", e.target.value, "additionalDetails")}
                                    readOnly={isRateOnlyEditable || isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="2">
                                <Form.Group>
                                  <Form.Label>Rate</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => handleItemChange(item.id, "rate", e.target.value, "additionalDetails")}
                                    readOnly={isFullyReadOnly}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="2">
                                <Form.Group>
                                  <Form.Label>Amount</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={item.amount || (parseFloat(item.quantity) * parseFloat(item.rate)) || 0}
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="1">
                                {!isRateOnlyEditable && !isFullyReadOnly && formData.additionalDetails.length > 1 && (
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="mt-4"
                                    onClick={() => handleRemoveItem(item.id, "additionalDetails")}
                                  >
                                    <FaMinus />
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          ))}
                          {!isRateOnlyEditable && !isFullyReadOnly && (
                            <div className="d-flex justify-content-start">
                              <Button variant="primary" size="sm" onClick={() => handleAddItem("additionalDetails")}>
                                <FaPlus /> Add Additional Item
                              </Button>
                            </div>
                          )}
          
                          <Col md="12">
                            <div className="d-flex justify-content-end">
                              <Card style={{ width: "20rem" }}>
                                <Card.Body>
                                  <div className="d-flex justify-content-between mb-2">
                                    <strong>Basic Amount:</strong>
                                    <span>₹{totals.basicAmount.toLocaleString()}</span>
                                  </div>
                                  <div className="d-flex justify-content-between mb-2">
                                    <strong>GST (18%):</strong>
                                    <span>₹{totals.gst.toLocaleString()}</span>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <h4>Total:</h4>
                                    <h6>₹{totals.grandTotal.toLocaleString()}</h6>
                                  </div>
                                  <div className="d-flex justify-content-end mt-5 gap-3">
                                    {!isFullyReadOnly && (
                                      <Button
                                        className="btn"
                                        type="submit"
                                        style={{ backgroundColor: "#ed3131", border: "none", height: "40px" }}
                                      >
                                        {isRevisionMode ? "Update Quotation" : "Save Quotation"}
                                      </Button>
                                    )}
                                    <Button
                                      className="btn me-2"
                                      type="button"
                                      onClick={handleCancel}
                                      style={{ backgroundColor: "#adb5bd", border: "none", height: "40px" }}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          </Col>
          
                          
                        </Card.Body>
                      </Card>
                    </Col>
        
          {/* --- NEW: Card 3: Second Car/Unit Details --- */}
          
          {/* --- END NEW: Card 3: Second Car/Unit Details --- */}
          
          <Col md="12" >
            <div className="d-flex justify-content-end">
              <Card style={{ width: "20rem"}}>
                <Card.Body >
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Basic Amount:</strong>
                    <span>₹{totals.basicAmount.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>GST (18%):</strong>
                    <span>₹{totals.gst.toLocaleString()}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <h4>Total:</h4>
                    <h6>₹{totals.grandTotal.toLocaleString()}</h6>
                  </div>
                  <div className="d-flex justify-content-end mt-5 gap-3">
                    
                    <Button className="btn" type="submit" style={{backgroundColor:"#ed3131", border:"none", height:"40px"}}>
                      {quotationId ? "Update Quotation" : "Save Quotation"}
                    </Button>

                      <Button 
                        className="btn me-2" 
                        type="button" 
                        onClick={handleCancel}
                        style={{backgroundColor:"#adb5bd", border:"none", height:"40px"}}
                      >
                        Cancel
                      </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        
          {/* Conditionally render Commercial Terms - Hide for new quotes when coming from ClientLead.jsx but keep them readonly for existing quotes */}
          {/* NOTE: The original component had this check: location.pathname === '/new-quotation' && !quotationId. This is too specific.
            The logic has been simplified to only check if it is a new quotation */}
          {isRateOnlyEditable && (
            <Col md="12">
              <Card className="mb-4">
                <Card.Header>
                  <Card.Title as="h4" style={{ fontWeight: "600" }}>
                    Commercial Terms
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  {/* GST */}
                  <div className="mb-3">
                    <h6 style={{ fontWeight: "600" }}>GST</h6>
                    <Form.Control
                      type="text"
                      name="gst"
                      value={formData.commercialTerms.gst}
                      onChange={handleCommercialTermsChange}
                      readOnly={isRateOnlyEditable} // ⬅️ ADDED readOnly
                    />
                  </div>

                  {/* Supply Terms */}
                  <div className="mb-3">
                    <h6 style={{ fontWeight: "600" }}>Supply Terms</h6>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="supplyTerms"
                      value={formData.commercialTerms.supplyTerms}
                      onChange={handleCommercialTermsChange}
                      readOnly={isRateOnlyEditable} // ⬅️ ADDED readOnly
                    />
                  </div>

                  {/* Installation Terms */}
                  <div className="mb-3">
                    <h6 style={{ fontWeight: "600" }}>Installation Terms</h6>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="installationTerms"
                      value={formData.commercialTerms.installationTerms}
                      onChange={handleCommercialTermsChange}
                      readOnly={isRateOnlyEditable} // ⬅️ ADDED readOnly
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}

        </Row>
      </Form>
    </Container>
  );
}