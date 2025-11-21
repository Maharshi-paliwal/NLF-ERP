import React, { useState, useMemo, useCallback } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Alert,
  Form,
} from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

// --- WORK ORDER WITH BOM ---
const workOrders = [
  {
    workOrderId: "WO-N25-001",
    projectName: "StartupHub Office Setup",
    customerName: "Arjun Mehta",
    quotationId: "Q-N25-001",
    status: "Design Initiated",
    items: [
      {
        description: "Executive Desk",
        unit: "nos",
        quantity: 5,
        bom: [
          { rawMaterial: "Plywood (18mm)", stockId: "RM-PLY-18", qtyPerUnit: 2.5 },
          { rawMaterial: "Walnut Laminate", stockId: "RM-LAM-WALNUT", qtyPerUnit: 2.5 },
          { rawMaterial: "MS Screws (2\")", stockId: "RM-SCREW-MS", qtyPerUnit: 20 }
        ]
      },
      {
        description: "Ergonomic Chair (Final Model)",
        unit: "nos",
        quantity: 50,
        bom: [
          { rawMaterial: "Mesh Fabric (Black)", stockId: "RM-MESH-BLK", qtyPerUnit: 1.2 },
          { rawMaterial: "HD Foam", stockId: "RM-FOAM-HD", qtyPerUnit: 1.0 },
          { rawMaterial: "Aluminum Base", stockId: "RM-ALU-BASE", qtyPerUnit: 1 }
        ]
      },
      {
        description: "Lounge Seating",
        unit: "set",
        quantity: 2,
        bom: [
          { rawMaterial: "Hardwood Frame", stockId: "RM-HDW-FRAME", qtyPerUnit: 8 },
          { rawMaterial: "Navy Fabric", stockId: "RM-FAB-NAVY", qtyPerUnit: 5 },
          { rawMaterial: "HD Foam", stockId: "RM-FOAM-HD", qtyPerUnit: 3 }
        ]
      }
    ]
  }
];

// --- GODOWN INVENTORY ---
const godownInventory = [
  { stockId: "RM-PLY-18", description: "Plywood 18mm Commercial", unit: "sq.ft", currentStock: 100 },
  { stockId: "RM-LAM-WALNUT", description: "Walnut Laminate Sheet", unit: "sq.ft", currentStock: 9 },
  { stockId: "RM-SCREW-MS", description: "MS Screws (2-inch)", unit: "nos", currentStock: 500 },
  { stockId: "RM-MESH-BLK", description: "Black Mesh Fabric", unit: "sq.ft", currentStock: 20 },
  { stockId: "RM-FOAM-HD", description: "High-Density Foam", unit: "kg", currentStock: 40 },
  { stockId: "RM-ALU-BASE", description: "Aluminum Chair Base", unit: "nos", currentStock: 30 },
  { stockId: "RM-HDW-FRAME", description: "Hardwood Frame (Teak)", unit: "ft", currentStock: 5 },
  { stockId: "RM-FAB-NAVY", description: "Navy Blue Upholstery Fabric", unit: "sq.ft", currentStock: 25 }
];

export default function StoreSubpage() {
  const navigate = useNavigate();
  const { workOrderId } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const initialWorkOrder = workOrders.find((wo) => wo.workOrderId === workOrderId);
  const [currentWorkOrder, setCurrentWorkOrder] = useState(initialWorkOrder);
  const workOrder = useMemo(() => currentWorkOrder, [currentWorkOrder]);

  if (!workOrder) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <FaExclamationTriangle className="me-2" /> Work Order <strong>{workOrderId}</strong> not found.
        </Alert>
        <Button as={Link} to="/design" variant="secondary">
          <FaArrowLeft className="me-2" /> Back to Design List
        </Button>
      </Container>
    );
  }

  // Step 1: Calculate total required per raw material
  const materialRequirements = useMemo(() => {
    const map = new Map();
    workOrder.items.forEach(item => {
      item.bom?.forEach(bomItem => {
        const key = bomItem.stockId;
        const total = bomItem.qtyPerUnit * item.quantity;
        map.set(key, (map.get(key) || 0) + total);
      });
    });
    return Array.from(map.entries()).map(([stockId, totalRequired]) => {
      const inv = godownInventory.find(i => i.stockId === stockId);
      return {
        stockId,
        rawMaterial: inv?.description || stockId,
        unit: inv?.unit || 'unit',
        totalRequired,
        availableStock: inv?.currentStock || 0
      };
    });
  }, [workOrder.items]);

  // Step 2: Manage allocated quantities (editable)
  const [allocated, setAllocated] = useState(() => {
    const initial = {};
    materialRequirements.forEach(mat => {
      initial[mat.stockId] = 0;
    });
    return initial;
  });

  // Step 3: Compute net requirement, lock status, and max allocatable
  const calculatedMaterials = useMemo(() => {
    return materialRequirements.map(mat => {
      const alloc = allocated[mat.stockId] || 0;
      const maxAllocatable = Math.min(mat.totalRequired, mat.availableStock);
      const isLocked = alloc >= maxAllocatable;
      const netRequired = mat.totalRequired - alloc; // Still based on full need
      const isValid = alloc <= mat.availableStock; // Redundant now, but kept for clarity

      return {
        ...mat,
        allocated: alloc,
        netRequired,
        isLocked,
        isValid,
        maxAllocatable // useful for debugging or future use
      };
    });
  }, [materialRequirements, allocated]);

  // ✅ Step 4: Handle allocation with dual-limit clamping (requirement + stock)
  const handleAllocationChange = (stockId, value) => {
    const rawValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(rawValue)) return;

    const material = materialRequirements.find(m => m.stockId === stockId);
    if (!material) return;

    // 🔒 Cap at the lesser of required or available
    const maxAllowed = Math.min(material.totalRequired, material.availableStock);
    const clampedValue = Math.max(0, Math.min(rawValue, maxAllowed));

    setAllocated(prev => ({ ...prev, [stockId]: clampedValue }));
  };

  // Step 5: Check if all materials are "locked" (i.e., fully allocated up to possible limit)
  const isFullyAllocated = calculatedMaterials.every(mat => mat.isLocked);

  // Step 6: Release to Planning
  const handleReleaseToPlanning = useCallback(() => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedWo = {
        ...workOrder,
        status: "In Planning",
        materialRequirementPlan: {
          mrpId: `MRP-${workOrder.workOrderId.split('-')[1]}`,
          allocations: calculatedMaterials.map(m => ({
            stockId: m.stockId,
            description: m.rawMaterial,
            required: m.totalRequired,
            allocated: m.allocated,
            unit: m.unit
          }))
        }
      };
      setCurrentWorkOrder(updatedWo);
      toast.success(`WO ${workOrderId} sent to Planning.`);
      setIsProcessing(false);
    }, 1200);
  }, [workOrderId, workOrder, calculatedMaterials]);



  return (
    
    <Container fluid className="p-4">
      <Button  className="add-customer-btn mb-4" onClick={() => navigate(-1)}>
        <FaArrowLeft /> 
      </Button>

      <Row>
        <Col md={12}>
          <Card className="mb-4 shadow-sm">
            <Row className="p-4">
              <Col>
                <h2 className="mt-1">Store Team: {workOrder.projectName}</h2>
                <p className="text-muted">Work Order No: <strong>{workOrder.workOrderId}</strong></p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary fw-bold">
              Material Requirement Plan (Manual Allocation)
            </Card.Header>
            <Card.Body>
              {statusMessage && (
                <Alert variant={statusMessage.type} className="mb-3">
                  {statusMessage.message}
                </Alert>
              )}
              <Table bordered hover responsive size="sm" className="strpied-tabled-with-hover">
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Raw Material</th>
                    <th>Required</th>
                    <th>Available</th>
                    <th>Allocate</th>
                    <th>Net Required</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {calculatedMaterials.map((mat, index) => (
                    <tr key={mat.stockId}>
                      <td>{index + 1}</td>
                      <td className="text-start">{mat.rawMaterial}</td>
                      <td>{mat.totalRequired.toFixed(2)} {mat.unit}</td>
                      <td>{mat.availableStock} {mat.unit}</td>
                      <td style={{display:"flex", justifyContent:"center"}}>
                        <Form.Control
                          type="number"
                          min="0"
                          step="0.5"
                          value={mat.allocated === 0 ? '' : mat.allocated}
                          onChange={(e) => handleAllocationChange(mat.stockId, e.target.value)}
                          disabled={mat.isLocked || isProcessing}
                          isInvalid={mat.allocated > mat.availableStock}
                          className="text-center"
                          style={{ maxWidth: '100px' }}
                        />
                        {mat.allocated > mat.availableStock && (
                          <Form.Text className="text-danger">
                            Exceeds stock! Max: {mat.availableStock} {mat.unit}
                          </Form.Text>
                        )}
                      </td>
                      <td className={mat.netRequired > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                        {mat.netRequired.toFixed(2)} {mat.unit}
                      </td>
                      <td>
                        {mat.isLocked ? (
                          <Badge bg="success">Alloted</Badge>
                        ) : mat.allocated > 0 ? (
                          <Badge bg="warning">Partial</Badge>
                        ) : (
                          <Badge bg="secondary">Pending</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
              <Button
                variant="success"
                onClick={handleReleaseToPlanning}
                disabled={isProcessing || !isFullyAllocated || workOrder.status === "In Planning"}
              >
                {isProcessing ? (
                  <>Processing…</>
                ) : (
                  <>Release MRP to Planning</>
                )}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}