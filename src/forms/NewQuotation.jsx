import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom"; 
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { quotations as initialQuotations } from "../data/mockdata";
import { officeBranches } from "../data/mockdata";

// Standard Terms & Conditions
const standardTerms = `• GST 18% as actual
• Payment 50% advance with formal work order and 50% on readiness of material before dispatch.
• Transportation charges Extra.
• Unloading of material at clients end.
• The above rates does not include any MS/Aluminium substructure required.
• Safe storage for the material to be provided by you at site with a locked room.
• Providing & Fixing of Scaffolding should be at your end.
• Mode of Measurement: Measurements shall be wall to wall.
• Local transportation, loading & unloading of material from one area to another area on site at your end.
• Suitable accommodation for site Engineer & hutment for labour to be provided by the client along with lodging & boarding.
• Validity of Quotation: 30 days.
Hope you will find our offer most competitive and in order.`;

// Helper function to calculate totals
const calculateTotals = (itemGroups, secondCarItems, secondCarAdditionalDetails) => {
  const totalItemAmount = itemGroups.reduce((acc, group) => {
    const itemAmt = parseFloat(group.amount) || (parseFloat(group.quantity) || 0) * (parseFloat(group.rate) || 0);
    const instAmt = parseFloat(group.installationAmount) || (parseFloat(group.installationQuantity) || 0) * (parseFloat(group.installationRate) || 0);
    return acc + itemAmt + instAmt;
  }, 0);
  const totalSecondCar = [...secondCarItems, ...secondCarAdditionalDetails].reduce(
    (acc, item) => acc + (parseFloat(item.amount) || (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)),
    0
  );
  const subtotal = totalItemAmount + totalSecondCar;
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;
  return { 
    basicAmount: totalItemAmount + totalSecondCar,
    gst, 
    grandTotal 
  };
};

// Custom ID generation logic
const generateNewQuotationId = (quotations) => {
  const allQuotes = quotations.flat(); 
  const lastQuotation = allQuotes[allQuotes.length - 1];
  const lastId = lastQuotation ? parseInt(lastQuotation.quotationId.substring(5)) : 0;
  const newId = (lastId + 1).toString().padStart(3, '0');
  const year = new Date().getFullYear().toString().substring(2);
  return `Q-N${year}-${newId}`;
};

// --- DUMMY DATA FOR DROPDOWNS ---

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
  "Paint & Finishes"
];

const initialFormState = {
  quotationId: "",
  date: "",
  customerName: "",
  customerCity: "",
  officeBranch: officeBranches[0],
  termsAndConditions: standardTerms,
  itemGroups: [
    {
      id: `group-${Date.now()}`,
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      amount: "",
      material: materialOptions[0],
      installationDescription: "",
      installationUnit: "",
      installationQuantity: "",
      installationRate: "",
      installationAmount: "",
    },
  ],
  commercialTerms: {
    gst: "As applicable",
    supplyTerms: "",
    installationTerms: "",
  },
  secondCarItems: [ 
    { 
      id: `sc-item-${Date.now() + 1}`, 
      description: "",
      unit: "", 
      quantity: "", 
      rate: "", 
      amount: "", 
      material: materialOptions[0] 
    },
  ],
  secondCarAdditionalDetails: [ 
    { id: `sc-addl-${Date.now() + 2}`, description: "", unit: "", quantity: "", rate: "", amount: "" },
  ],
};

export default function NewQuotation() {
  const { quotationId, roundIdentifier } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // === MODE DETECTION ===
  const isNewQuotation = !quotationId;
  const isCreatingRevision = Boolean(quotationId && roundIdentifier === 'new-revision');
  const isViewOnly = searchParams.get('view') === 'true';
  const isEditingExistingRound = Boolean(quotationId && roundIdentifier && roundIdentifier !== 'new-revision' && !isViewOnly);

  // Editability rules
  const isFullyEditable = isNewQuotation || isCreatingRevision;
  const isRateOnlyEditable = isEditingExistingRound; // Only rates editable for old rounds (if ever used)

  const [formData, setFormData] = useState(initialFormState);
  const [totals, setTotals] = useState({
    basicAmount: 0,
    gst: 0,
    grandTotal: 0,
  });

  // Recalculate totals
  useEffect(() => {
    const newTotals = calculateTotals(
      formData.itemGroups,
      formData.secondCarItems,
      formData.secondCarAdditionalDetails
    );
    setTotals(newTotals);
  }, [formData.itemGroups, formData.secondCarItems, formData.secondCarAdditionalDetails]);

  // Load data based on mode
  useEffect(() => {
    if (isNewQuotation) {
      setFormData((prev) => ({
        ...prev,
        quotationId: generateNewQuotationId(initialQuotations),
        date: new Date().toISOString().split('T')[0],
        officeBranch: officeBranches[0],
      }));
    } else {
      const quotationBase = initialQuotations.flat().find((q) => q.quotationId === quotationId);
      if (!quotationBase) {
        console.error("Quotation not found:", quotationId);
        navigate("/new-quotation");
        return;
      }

      if (isCreatingRevision) {
        // Load latest round to use as base for new revision
        let sourceRound = null;
        if (quotationBase.rounds?.length > 0) {
          sourceRound = [...quotationBase.rounds].sort(
            (a, b) => {
              const aVal = a.round ? parseInt(a.round.replace('R', '')) : 0;
              const bVal = b.round ? parseInt(b.round.replace('R', '')) : 0;
              return bVal - aVal;
            }
          )[0];
        }

        // Fallback to initial if no rounds
        const fallback = {
          items: quotationBase.items || [],
          additionalDetails: quotationBase.additionalDetails || [],
          secondCarItems: quotationBase.secondCarItems || [],
          secondCarAdditionalDetails: quotationBase.secondCarAdditionalDetails || [],
          commercialTerms: quotationBase.commercialTerms || {},
          date: new Date().toISOString().split('T')[0],
          termsAndConditions: quotationBase.termsAndConditions || standardTerms,
        };

        const roundToUse = sourceRound || fallback;

        // Map items
        const items = roundToUse.items || [];
        const additionalDetails = roundToUse.additionalDetails || [];
        const maxLen = Math.max(items.length, additionalDetails.length);
        const itemGroups = [];
        for (let i = 0; i < maxLen; i++) {
          const item = items[i] || {};
          const inst = additionalDetails[i] || {};
          itemGroups.push({
            id: `group-${Date.now()}-${i}`,
            description: item.description || "",
            unit: item.unit || "",
            quantity: item.quantity || "",
            rate: item.rate || "",
            amount: item.amount || (item.quantity * item.rate) || "",
            material: item.material || materialOptions[0],
            installationDescription: inst.description || "",
            installationUnit: inst.unit || "",
            installationQuantity: inst.quantity || "",
            installationRate: inst.rate || "",
            installationAmount: inst.amount || (inst.quantity * inst.rate) || "",
          });
        }

        setFormData({
          quotationId: quotationBase.quotationId,
          date: new Date().toISOString().split('T')[0], // NEW date for revision
          customerName: quotationBase.customer.name,
          customerCity: quotationBase.customer.address?.split(',').slice(-2, -1).join(',').trim() || quotationBase.customer.city || "",
          officeBranch: quotationBase.officeBranch || officeBranches[0],
          termsAndConditions: roundToUse.termsAndConditions || standardTerms,
          itemGroups: itemGroups.length > 0 ? itemGroups : [initialFormState.itemGroups[0]],
          secondCarItems: roundToUse.secondCarItems && roundToUse.secondCarItems.length
            ? roundToUse.secondCarItems.map((item, index) => ({ 
                ...item, 
                id: `sc-item-${Date.now()}-${index}`,
                amount: item.amount || (item.quantity * item.rate) || "",
                material: item.material || materialOptions[0]
              }))
            : initialFormState.secondCarItems,
          secondCarAdditionalDetails: roundToUse.secondCarAdditionalDetails && roundToUse.secondCarAdditionalDetails.length
            ? roundToUse.secondCarAdditionalDetails.map((item, index) => ({ 
                ...item, 
                id: `sc-addl-${Date.now()}-${index}`,
                amount: item.amount || (item.quantity * item.rate) || ""
              }))
            : initialFormState.secondCarAdditionalDetails,
          commercialTerms: {
            gst: roundToUse.commercialTerms?.gst || "As applicable",
            supplyTerms: roundToUse.commercialTerms?.supplyTerms || "",
            installationTerms: roundToUse.commercialTerms?.installationTerms || "",
          },
        });
      } else {
        // View or edit specific round
        let targetRound = null;
        if (roundIdentifier === "Initial" || !quotationBase.rounds?.length) {
          targetRound = {
            items: quotationBase.items || [],
            additionalDetails: quotationBase.additionalDetails || [],
            secondCarItems: quotationBase.secondCarItems || [],
            secondCarAdditionalDetails: quotationBase.secondCarAdditionalDetails || [],
            commercialTerms: quotationBase.commercialTerms || {},
            date: quotationBase.customer.date || new Date().toISOString().split('T')[0],
            termsAndConditions: quotationBase.termsAndConditions || standardTerms
          };
          if (quotationBase.rounds?.[0] && !quotationBase.rounds[0].round) {
            targetRound = quotationBase.rounds[0];
          }
        } else {
          targetRound = quotationBase.rounds?.find((r) => r.round === roundIdentifier);
        }

        if (!targetRound) {
          console.error("Round not found:", roundIdentifier);
          navigate("/new-quotation");
          return;
        }

        const items = targetRound.items || [];
        const additionalDetails = targetRound.additionalDetails || [];
        const maxLen = Math.max(items.length, additionalDetails.length);
        const itemGroups = [];
        for (let i = 0; i < maxLen; i++) {
          const item = items[i] || {};
          const inst = additionalDetails[i] || {};
          itemGroups.push({
            id: `group-${Date.now()}-${i}`,
            description: item.description || "",
            unit: item.unit || "",
            quantity: item.quantity || "",
            rate: item.rate || "",
            amount: item.amount || (item.quantity * item.rate) || "",
            material: item.material || materialOptions[0],
            installationDescription: inst.description || "",
            installationUnit: inst.unit || "",
            installationQuantity: inst.quantity || "",
            installationRate: inst.rate || "",
            installationAmount: inst.amount || (inst.quantity * inst.rate) || "",
          });
        }

        setFormData({
          quotationId: quotationBase.quotationId,
          date: targetRound.date || new Date().toISOString().split('T')[0],
          customerName: quotationBase.customer.name,
          customerCity: quotationBase.customer.address?.split(',').slice(-2, -1).join(',').trim() || quotationBase.customer.city || "",
          officeBranch: quotationBase.officeBranch || officeBranches[0],
          termsAndConditions: targetRound.termsAndConditions || standardTerms,
          itemGroups: itemGroups.length > 0 ? itemGroups : [initialFormState.itemGroups[0]],
          secondCarItems: targetRound.secondCarItems && targetRound.secondCarItems.length
            ? targetRound.secondCarItems.map((item, index) => ({ 
                ...item, 
                id: `sc-item-${Date.now()}-${index}`,
                amount: item.amount || (item.quantity * item.rate) || "",
                material: item.material || materialOptions[0]
              }))
            : initialFormState.secondCarItems,
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
      }
    }
  }, [quotationId, roundIdentifier, navigate, isNewQuotation, isCreatingRevision]);

  // === Handlers ===
  const handleMainFormChange = (e) => {
    if (!isFullyEditable) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (groupId, field, value) => {
    if (!isFullyEditable) return;
    setFormData((prev) => {
      const updatedGroups = prev.itemGroups.map((group) => {
        if (group.id === groupId) {
          const newItem = { ...group, [field]: value };
          if (field === "quantity" || field === "rate") {
            const q = parseFloat(newItem.quantity) || 0;
            const r = parseFloat(newItem.rate) || 0;
            newItem.amount = (q * r).toString();
            
            // Auto-match unit and quantity to installation fields
            if (field === "unit") {
              newItem.installationUnit = value;
            }
            if (field === "quantity") {
              newItem.installationQuantity = value;
            }
          }
          if (field === "unit") {
            newItem.installationUnit = value;
          }
          if (field === "installationQuantity" || field === "installationRate") {
            const q = parseFloat(newItem.installationQuantity) || 0;
            const r = parseFloat(newItem.installationRate) || 0;
            newItem.installationAmount = (q * r).toString();
          }
          return newItem;
        }
        return group;
      });
      return { ...prev, itemGroups: updatedGroups };
    });
  };

  const handleCommercialTermsChange = (e) => {
    if (!isFullyEditable) return;
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      commercialTerms: {
        ...prev.commercialTerms,
        [name]: value,
      },
    }));
  };

  const handleAddItemGroup = () => {
    if (!isFullyEditable) return;
    const newGroup = {
      id: `group-${Date.now()}`,
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      amount: "",
      material: materialOptions[0],
      installationDescription: "",
      installationUnit: "",
      installationQuantity: "",
      installationRate: "",
      installationAmount: "",
    };
    setFormData((prev) => ({
      ...prev,
      itemGroups: [...prev.itemGroups, newGroup],
    }));
  };

  const handleRemoveItemGroup = (groupId) => {
    if (!isFullyEditable || formData.itemGroups.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      itemGroups: prev.itemGroups.filter(g => g.id !== groupId),
    }));
  };

  const handleSecondCarItemChange = (itemId, field, value, section) => {
    if (!isFullyEditable) return;
    setFormData((prev) => {
      const updatedSection = prev[section].map((item) => {
        if (item.id === itemId) {
          const newItem = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") {
            const quantity = parseFloat(newItem.quantity) || 0;
            const rate = parseFloat(newItem.rate) || 0;
            newItem.amount = (quantity * rate).toString(); 
          }
          return newItem;
        }
        return item;
      });
      return { ...prev, [section]: updatedSection };
    });
  };

  const handleAddSecondCarItem = (section) => {
    if (!isFullyEditable) return;
    let newItem;
    if (section === "secondCarItems") {
      newItem = { 
        id: `${section}-${Date.now()}`, 
        description: "", 
        unit: "", 
        quantity: "", 
        rate: "", 
        amount: "", 
        material: materialOptions[0] 
      };
    } else {
      newItem = { 
        id: `${section}-${Date.now()}`, 
        description: "", 
        unit: "", 
        quantity: "", 
        rate: "", 
        amount: "" 
      };
    }
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const handleRemoveSecondCarItem = (itemId, section) => {
    if (!isFullyEditable) return;
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== itemId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Quotation Data:", { ...formData, ...totals });
    const message = isCreatingRevision
      ? "New revision created successfully!"
      : isNewQuotation
      ? "Quotation saved successfully!"
      : "Quotation updated successfully!";
    alert(message);
    navigate("/leadgeneration");
  };

  const handleCancel = () => {
    navigate("/leadgeneration");
  };

  // === UI Title ===
  let pageTitle = "New Quotation";
  if (isCreatingRevision) {
    pageTitle = "Create New Revision";
  } else if (quotationId) {
    pageTitle = isViewOnly ? `Revision: ${roundIdentifier}` : "Edit Quotation";
  }

  return (
    <Container fluid className="my-4">
      <Link to="/clients">
        <Button className="mb-3 btn btn-primary" style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}>
          <FaArrowLeft />
        </Button>
      </Link>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Card 1: Quotation Details */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">{pageTitle}</Card.Title>
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
                        readOnly
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
                        readOnly={!isFullyEditable}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleMainFormChange}
                        readOnly={!isFullyEditable}
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
                        readOnly={!isFullyEditable}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Branch</Form.Label>
                      <Form.Control
                        as="select"
                        name="officeBranch"
                        value={formData.officeBranch}
                        onChange={handleMainFormChange}
                        disabled={!isFullyEditable}
                      >
                        {officeBranches.map((branch) => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: Grouped Items */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">Quotation Items</Card.Title>
              </Card.Header>
              <Card.Body>
                {formData.itemGroups.map((group) => (
                  <div key={group.id} className="border rounded p-3 mb-4">
                    <Row className="align-items-start mb-3">
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Product</Form.Label>
                          <Form.Control
                            as="select"
                            value={group.material}
                            onChange={(e) => handleItemChange(group.id, "material", e.target.value)}
                            disabled={!isFullyEditable}
                          >
                            {materialOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md="9">
                        <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={group.description}
                            onChange={(e) => handleItemChange(group.id, "description", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Unit</Form.Label>
                          <Form.Control
                            type="text"
                            value={group.unit}
                            onChange={(e) => handleItemChange(group.id, "unit", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            value={group.quantity}
                            onChange={(e) => handleItemChange(group.id, "quantity", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Rate</Form.Label>
                          <Form.Control
                            type="number"
                            value={group.rate}
                            onChange={(e) => handleItemChange(group.id, "rate", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Amount</Form.Label>
                          <Form.Control
                            type="number"
                            value={group.amount || 0}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 pt-3 border-top">
                      <Card.Title className="mb-4">
                        Installation
                      </Card.Title>
                      {/* <Col md="4"> */}
                        {/* <Form.Group>
                          <Form.Label>Installation Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            value={group.installationDescription}
                            onChange={(e) => handleItemChange(group.id, "installationDescription", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group> */}
                      {/* </Col> */}
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Unit</Form.Label>
                          <Form.Control
                            type="text"
                            value={group.installationUnit}
                            onChange={(e) => handleItemChange(group.id, "installationUnit", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            value={group.installationQuantity}
                            onChange={(e) => handleItemChange(group.id, "installationQuantity", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Rate</Form.Label>
                          <Form.Control
                            type="number"
                            value={group.installationRate}
                            onChange={(e) => handleItemChange(group.id, "installationRate", e.target.value)}
                            readOnly={!isFullyEditable}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Amount</Form.Label>
                          <Form.Control
                            type="number"
                            value={group.installationAmount || 0}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        {isFullyEditable && formData.itemGroups.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveItemGroup(group.id)}
                          >
                            <FaMinus /> Remove Item + Installation
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </div>
                ))}
                {isFullyEditable && (
                  <div className="d-flex justify-content-start">
                    <Button variant="primary" size="sm" onClick={handleAddItemGroup}>
                      <FaPlus /> Add Item
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Terms & Conditions */}
          <Col md="12">
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h4">Terms & Conditions</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={12}
                    value={formData.termsAndConditions || ''}
                    onChange={(e) => {
                      if (isFullyEditable) {
                        setFormData(prev => ({ ...prev, termsAndConditions: e.target.value }));
                      }
                    }}
                    readOnly={!isFullyEditable}
                    style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Totals & Submit */}
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
                    {!isViewOnly && (
                      <Button
                        className="btn"
                        type="submit"
                        style={{ backgroundColor: "#ed3131", border: "none", height: "40px" }}
                      >
                        {isCreatingRevision ? "Create Revision" : isNewQuotation ? "Save Quotation" : "Update Quotation"}
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
        </Row>
      </Form>
    </Container>
  ); 
}