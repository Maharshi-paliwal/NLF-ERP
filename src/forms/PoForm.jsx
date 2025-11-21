// PoForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { po as poData } from "../data/mockdata";

// Helper: Recalculate item amounts
const recalculateItemAmount = (quantity, rate) => {
  return ((parseFloat(quantity) || 0) * (parseFloat(rate) || 0)).toString();
};

const materialOptions = [
  "Select Material",
  "Ply",
  "Screws",
  "Aluminium Foils",
  "Laminates",
  "Service",
];

const initialFormState = {
  // ===== PO HEADER =====
  poId: "",
  poNumber: "",
  poDate: "",
  projectName: "",
  department: "",
  leadId: "",
  quotationId: "",
  quotationRound: "",
  leadType: "",

  // ===== CLIENT DETAILS =====
  clientName: "",
  contactPerson: "",
  contactPersonMobile: "",
  contactPersonEmail: "",
  companyName: "",
  siteAddress: "",
  billingAddress: "",
  gstNumber: "",
  panNumber: "",
  customerId: "",

  // ===== TIMELINE =====
  expectedDeliveryDate: "",
  actualDeliveryDate: "",
  completionDate: "",

  // ===== FINANCIALS =====
  quotedAmount: "",
  totalAmount: "",
  advancePaymentPercentage: "",
  advancePaymentAmount: "",
  balancePaymentPercentage: "",
  balancePaymentAmount: "",
  advancePaymentReceived: false,
  advancePaymentReceivedDate: "",
  advancePaymentMode: "",
  advanceTransactionRef: "",
  balancePaymentReceived: false,
  balancePaymentDate: "",
  balancePaymentMode: "",
  gstApplicable: true,
  gstPercentage: 18,
  gstAmount: "",
  tdsApplicable: false,
  tdsAmount: "",
  totalInvoiceAmount: "",
  currency: "INR",

  // ===== ITEMS =====
  items: [
    {
      id: `item-${Date.now()}-1`,
      itemId: "",
      material: materialOptions[0],
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      amount: "",
      specifications: {
        dimensions: "",
        material: "",
        finish: "",
        features: "",
        model: "",
        adjustments: "",
        loadCapacity: "",
        warranty: "",
        configuration: "",
        upholstery: "",
        deliveryScope: "",
      },
      deliveryStatus: "pending",
    },
  ],

  // ===== TERMS & CONDITIONS =====
  termsAndConditions: {
    paymentTerms: {
      description: "",
      advancePercentage: "",
      balancePercentage: "",
      paymentDueDate: "",
      balanceDueDate: "",
      paymentMethods: "",
      bankDetails: {
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      delayPenalty: "",
    },
    deliverySchedule: {
      expectedDeliveryDate: "",
      deliveryLocation: "",
      deliveryTimeSlot: "",
      deliveryTerms: "",
      freightCharges: "",
      packingCharges: "",
      deliveryNotes: "",
      advanceNotification: "",
      receivingInstructions: "",
    },
    liquidatedDamages: {
      applicable: false,
      description: "",
      ratePerWeek: "",
      calculationBasis: "",
      maxCapPercentage: "",
      maxCapAmount: "",
      example: "",
      applicableFrom: "",
      claimProcess: "",
      deductionMethod: "",
      exemptions: "",
    },
    defectLiabilityPeriod: {
      duration: "",
      startDate: "",
      endDate: "",
      description: "",
      coverageScope: "",
      claimProcess: {
        notificationPeriod: "",
        notificationMethod: "",
        inspectionPeriod: "",
        approvalPeriod: "",
        totalResolutionTime: "",
      },
      remedyType: "",
      exclusions: "",
      maintenanceObligation: "",
      warrantyItems: {
        chairs: { structural: "", upholstery: "", mechanisms: "" },
        desks: { structural: "", finish: "", joints: "" },
        lounge: { frame: "", upholstery: "", springs: "" },
      },
    },
    warranty: {
      period: "",
      coverageScope: "",
      limitations: "",
    },
    qualityAndInspection: {
      factoryInspection: "",
      onSiteInspection: "",
      inspectionAuthority: "",
      acceptanceCriteria: "",
      rejectionRights: "",
      defectiveItemReplacement: "",
    },
    installationAndCommissioning: {
      installationIncluded: false,
      installationScope: "",
      installationSchedule: "",
      installationDuration: "",
      clientResponsibilities: "",
      postInstallationSupport: "",
    },
    generalTerms: {
      orderAcceptance: "",
      modifications: "",
      cancellation: "",
      forceMajeure: "",
      disputes: "",
      jurisdiction: "",
      governingLaw: "",
      paymentOnCompletion: "",
      escalationClause: "",
    },
  },

  // ===== SPECIFICATIONS =====
  specifications: {
    general: "",
    deskFinish: "",
    chairSpecs: "",
    loungeSpecs: "",
    colorScheme: "",
    customRequirements: "",
    drawingsReference: "",
  },

  // ===== SITE CONDITIONS =====
  siteConditions: {
    siteReadiness: "",
    accessConditions: "",
    installationSpace: "",
    specialRequirements: "",
    clientPreparation: "",
    safetyRequirements: "",
  },

  // ===== SALESPERSON & APPROVAL =====
  salespersonId: "",
  salespersonName: "",
  salespersonEmail: "",
  salespersonMobile: "",
  approvalStatus: "",
  approvedBy: "",
  approvedDate: "",
  approvalRemarks: "",

  // ===== STATUS & METADATA =====
  poStatus: "",
  priority: "",
  notes: "",
};

export default function PoForm() {
  const { poId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);

  // Load PO data
  useEffect(() => {
    if (!poId) return;

    const poRecord = poData.find((p) => p.poId === poId);
    if (!poRecord) {
      console.warn("PO not found:", poId);
      return;
    }

    // Map items
    const mappedItems = poRecord.items.map((item, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      itemId: item.itemId || "",
      material: item.material || materialOptions[0],
      description: item.description || "",
      unit: item.unit || "",
      quantity: String(item.quantity || ""),
      rate: String(item.rate || ""),
      amount: String(item.total || ""),
      specifications: {
        dimensions: item.specifications?.dimensions || "",
        material: item.specifications?.material || "",
        finish: item.specifications?.finish || "",
        features: item.specifications?.features || "",
        model: item.specifications?.model || "",
        adjustments: item.specifications?.adjustments || "",
        loadCapacity: item.specifications?.loadCapacity || "",
        warranty: item.specifications?.warranty || "",
        configuration: item.specifications?.configuration || "",
        upholstery: item.specifications?.upholstery || "",
        deliveryScope: item.specifications?.deliveryScope || "",
      },
      deliveryStatus: item.deliveryStatus || "pending",
    }));

    setFormData({
      // PO Header
      poId: poRecord.poId || "",
      poNumber: poRecord.poNumber || "",
      poDate: poRecord.poDate || "",
      projectName: poRecord.projectName || "",
      department: poRecord.department || "",
      leadId: poRecord.leadId || "",
      quotationId: poRecord.quotationId || "",
      quotationRound: poRecord.quotationRound || "",
      leadType: poRecord.leadType || "",

      // Client
      clientName: poRecord.clientName || "",
      contactPerson: poRecord.contactPerson || "",
      contactPersonMobile: poRecord.contactPersonMobile || "",
      contactPersonEmail: poRecord.contactPersonEmail || "",
      companyName: poRecord.companyName || "",
      siteAddress: poRecord.siteAddress || "",
      billingAddress: poRecord.billingAddress || "",
      gstNumber: poRecord.gstNumber || "",
      panNumber: poRecord.panNumber || "",
      customerId: poRecord.customerId || "",

      // Timeline
      expectedDeliveryDate: poRecord.expectedDeliveryDate || "",
      actualDeliveryDate: poRecord.actualDeliveryDate || "",
      completionDate: poRecord.completionDate || "",

      // Financials
      quotedAmount: String(poRecord.quotedAmount || ""),
      totalAmount: String(poRecord.totalAmount || ""),
      advancePaymentPercentage: String(poRecord.advancePaymentPercentage || ""),
      advancePaymentAmount: String(poRecord.advancePaymentAmount || ""),
      balancePaymentPercentage: String(poRecord.balancePaymentPercentage || ""),
      balancePaymentAmount: String(poRecord.balancePaymentAmount || ""),
      advancePaymentReceived: poRecord.advancePaymentReceived || false,
      advancePaymentReceivedDate: poRecord.advancePaymentReceivedDate || "",
      advancePaymentMode: poRecord.advancePaymentMode || "",
      advanceTransactionRef: poRecord.advanceTransactionRef || "",
      balancePaymentReceived: poRecord.balancePaymentReceived || false,
      balancePaymentDate: poRecord.balancePaymentDate || "",
      balancePaymentMode: poRecord.balancePaymentMode || "",
      gstApplicable: poRecord.gstApplicable || false,
      gstPercentage: poRecord.gstPercentage || 18,
      gstAmount: String(poRecord.gstAmount || ""),
      tdsApplicable: poRecord.tdsApplicable || false,
      tdsAmount: String(poRecord.tdsAmount || ""),
      totalInvoiceAmount: String(poRecord.totalInvoiceAmount || ""),
      currency: poRecord.currency || "INR",

      // Items
      items: mappedItems,

      // Terms & Conditions
      termsAndConditions: {
        ...initialFormState.termsAndConditions,
        ...poRecord.termsAndConditions,
        liquidatedDamages: {
          ...initialFormState.termsAndConditions.liquidatedDamages,
          ...poRecord.termsAndConditions?.liquidatedDamages,
          exemptions: Array.isArray(poRecord.termsAndConditions?.liquidatedDamages?.exemptions)
            ? poRecord.termsAndConditions.liquidatedDamages.exemptions.join("; ")
            : "",
        },
        defectLiabilityPeriod: {
          ...initialFormState.termsAndConditions.defectLiabilityPeriod,
          ...poRecord.termsAndConditions?.defectLiabilityPeriod,
          coverageScope: Array.isArray(poRecord.termsAndConditions?.defectLiabilityPeriod?.coverageScope)
            ? poRecord.termsAndConditions.defectLiabilityPeriod.coverageScope.join("; ")
            : "",
          exclusions: Array.isArray(poRecord.termsAndConditions?.defectLiabilityPeriod?.exclusions)
            ? poRecord.termsAndConditions.defectLiabilityPeriod.exclusions.join("; ")
            : "",
        },
      },

      // Specifications
      specifications: {
        ...initialFormState.specifications,
        ...poRecord.specifications,
      },

      // Site Conditions
      siteConditions: {
        ...initialFormState.siteConditions,
        ...poRecord.siteConditions,
      },

      // Sales & Approval
      salespersonId: poRecord.salespersonId || "",
      salespersonName: poRecord.salespersonName || "",
      salespersonEmail: poRecord.salespersonEmail || "",
      salespersonMobile: poRecord.salespersonMobile || "",
      approvalStatus: poRecord.approvalStatus || "",
      approvedBy: poRecord.approvedBy || "",
      approvedDate: poRecord.approvedDate || "",
      approvalRemarks: poRecord.approvalRemarks || "",

      // Status & Notes
      poStatus: poRecord.poStatus || "",
      priority: poRecord.priority || "",
      notes: poRecord.notes || "",
    });
  }, [poId]);

  // === Handlers ===
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };

      // Auto-calculate amount if quantity or rate changes
      if (field === "quantity" || field === "rate") {
        newItems[index].amount = recalculateItemAmount(newItems[index].quantity, newItems[index].rate);
      }

      return { ...prev, items: newItems };
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}-${formData.items.length}`,
      itemId: "",
      material: materialOptions[0],
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      amount: "",
      specifications: {
        dimensions: "",
        material: "",
        finish: "",
        features: "",
        model: "",
        adjustments: "",
        loadCapacity: "",
        warranty: "",
        configuration: "",
        upholstery: "",
        deliveryScope: "",
      },
      deliveryStatus: "pending",
    };
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FULL PO DATA:", formData);
    alert("Purchase Order saved successfully!");
    navigate("/poList");
  };

  return (
    <Container fluid className="my-4">
      <Button
        className="mb-3"
        style={{ backgroundColor: "rgb(237, 49, 49)", border: "none" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </Button>

      <Form onSubmit={handleSubmit}>
        {/* ===== PO DETAILS ===== */}
        <Card className="mb-4">
          <Card.Header><h5>PO Details</h5></Card.Header>
          <Card.Body>
            <Row>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>PO Number</Form.Label>
                  <Form.Control name="poNumber" value={formData.poNumber} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="poDate" value={formData.poDate} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control name="projectName" value={formData.projectName} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control name="department" value={formData.department} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ===== CLIENT INFO ===== */}
        <Card className="mb-4">
          <Card.Header><h5>Client Information</h5></Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control name="clientName" value={formData.clientName} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Control name="companyName" value={formData.companyName} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Site Address</Form.Label>
                  <Form.Control as="textarea" rows={2} name="siteAddress" value={formData.siteAddress} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Billing Address</Form.Label>
                  <Form.Control as="textarea" rows={2} name="billingAddress" value={formData.billingAddress} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>GST Number</Form.Label>
                  <Form.Control name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>PAN Number</Form.Label>
                  <Form.Control name="panNumber" value={formData.panNumber} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ===== ITEMS ===== */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Items</Card.Title>
          </Card.Header>
          <Card.Body>
            {formData.items.map((item, idx) => (
              <div key={item.id} className="border rounded p-3 mb-3">
                <Row className="align-items-end">
                  <Col md="2">
                    <Form.Group>
                      <Form.Label>Material</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.material}
                        onChange={(e) => handleItemChange(idx, "material", e.target.value)}
                      >
                        {materialOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="1">
                    <Form.Group>
                      <Form.Label>Unit</Form.Label>
                      <Form.Control
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleItemChange(idx, "unit", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="1">
                    <Form.Group>
                      <Form.Label>Qty</Form.Label>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2">
                    <Form.Group>
                      <Form.Label>Rate</Form.Label>
                      <Form.Control
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2">
                    <Form.Group>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control type="number" value={item.amount || 0} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md="1">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem(idx)}
                    >
                      <FaMinus />
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}

            <Button variant="outline-primary" size="sm" onClick={handleAddItem}>
              <FaPlus /> Add Item
            </Button>
          </Card.Body>
        </Card>

        {/* ===== COMMERCIAL TERMS ===== */}
        <Card className="mb-4">
          <Card.Header><h5>Terms & Conditions</h5></Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Schedule</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.termsAndConditions.deliverySchedule.deliveryNotes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        termsAndConditions: {
                          ...prev.termsAndConditions,
                          deliverySchedule: {
                            ...prev.termsAndConditions.deliverySchedule,
                            deliveryNotes: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Liquidated Damages</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.termsAndConditions.liquidatedDamages.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        termsAndConditions: {
                          ...prev.termsAndConditions,
                          liquidatedDamages: {
                            ...prev.termsAndConditions.liquidatedDamages,
                            description: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Defect Liability Period</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.termsAndConditions.defectLiabilityPeriod.duration}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        termsAndConditions: {
                          ...prev.termsAndConditions,
                          defectLiabilityPeriod: {
                            ...prev.termsAndConditions.defectLiabilityPeriod,
                            duration: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Installation Scope</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.termsAndConditions.installationAndCommissioning.installationScope}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        termsAndConditions: {
                          ...prev.termsAndConditions,
                          installationAndCommissioning: {
                            ...prev.termsAndConditions.installationAndCommissioning,
                            installationScope: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ===== FINANCIALS ===== */}
        <Card className="mb-4">
          <Card.Header><h5>Financial Details</h5></Card.Header>
          <Card.Body>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Advance (%)</Form.Label>
                  <Form.Control name="advancePaymentPercentage" value={formData.advancePaymentPercentage} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Balance (%)</Form.Label>
                  <Form.Control name="balancePaymentPercentage" value={formData.balancePaymentPercentage} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>GST (%)</Form.Label>
                  <Form.Control name="gstPercentage" value={formData.gstPercentage} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ===== SAVE BUTTON ===== */}
        <Button variant="primary" type="submit" className="mt-3">
          Save Purchase Order
        </Button>
      </Form>
    </Container>
  );
}