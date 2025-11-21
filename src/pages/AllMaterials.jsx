// import React, { useMemo, useState } from 'react'; 
// import toast from 'react-hot-toast'; 
// import {
//   Card,
//   Container,
//   Row,
//   Col,
//   Button,
//   Table,
//   Pagination,
//   Modal,
//   Form,
// } from 'react-bootstrap';
// import { FaEdit, FaPlus } from 'react-icons/fa'; // Added FaPlus icon

// // NOTE: Inventory is renamed to INITIAL_INVENTORY_DATA for use with useState
// const INITIAL_INVENTORY_DATA = [
//   { description: "Aluminum Frames", unit: "sq. units", sqm_quantity: 12.50 },
//   { description: "Bamboo Desks", unit: "sq. units", sqm_quantity: 22.33 },
//   { description: "Breakroom Chairs", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Breakroom Table", unit: "sq. units", sqm_quantity: 22.33 },
//   { description: "Chairs", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Checkout Counter", unit: "sq. units", sqm_quantity: 5.00 },
//   { description: "Co-working Desks", unit: "sq. units", sqm_quantity: 22.33 },
//   { description: "Collaborative Seating", unit: "sq. units", sqm_quantity: 19.20 },
//   { description: "Conference Chair", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Conference Table", unit: "sq. units", sqm_quantity: 22.33 },
//   { description: "Custom Cafe Chairs", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Custom Cafe Tables", unit: "sq. units", sqm_quantity: 40.00 },
//   { description: "Display Shelves", unit: "sq. units", sqm_quantity: 21.00 },
//   { description: "Ergonomic Chair", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Executive Desk", unit: "sq. units", sqm_quantity: 22.33 },
//   { description: "Glass Partitions", unit: "sq. units", sqm_quantity: 18.58 },
//   { description: "Individual Workstations", unit: "sq. units", sqm_quantity: 65.00 },
//   { description: "Lobby Desk", unit: "sq. units", sqm_quantity: 5.00 },
//   { description: "Lobby Sofa", unit: "sq. units", sqm_quantity: 19.20 },
//   { description: "Lounge Seating", unit: "sq. units", sqm_quantity: 19.20 },
//   { description: "Meeting Table", unit: "sq. units", sqm_quantity: 5.00 },
//   { description: "Modular Workstations", unit: "sq. units", sqm_quantity: 65.00 },
//   { description: "Reception Desk", unit: "sq. units", sqm_quantity: 5.00 },
//   { description: "Recycled Plastic Chairs", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Sofa", unit: "sq. units", sqm_quantity: 19.20 },
//   { description: "Training Hall Desk", unit: "sq. units", sqm_quantity: 22.33 },
//   { description: "Visitor Chairs", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Waiting Lounge Seating", unit: "sq. units", sqm_quantity: 19.20 },
//   { description: "Waiting Room Chairs", unit: "sq. units", sqm_quantity: 16.75 },
//   { description: "Work Desks", unit: "sq. units", sqm_quantity: 22.33 },
//   { description: "Workstations", unit: "sq. units", sqm_quantity: 110.00 },
// ];


// export default function AllRawMaterials() { // Renamed function
//   // State to hold the mutable inventory list
//   const [inventory, setInventory] = useState(INITIAL_INVENTORY_DATA);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState(""); // State for search input
//   const itemsPerPage = 10; 

//   // State for the Edit Modal
//   const [editModal, setEditModal] = useState({
//     show: false,
//     material: null, // Stores the material object being edited
//     newQuantity: "",
//   });

//   // State for the Add Modal
//   const [addModal, setAddModal] = useState({
//     show: false,
//     description: "",
//     quantity: "",
//     unit: "sqm", // ⭐ ADDED: State for the unit, defaulting to 'sqm'
//   });


//   // Filter, then sort the inventory for display
//   const materials = useMemo(() => {
//     // 1. Filtering Logic
//     const searchTerm = search.toLowerCase();
//     const filtered = inventory.filter(item => 
//       item.description.toLowerCase().includes(searchTerm)
//     );

//     // 2. Sorting Logic
//     return filtered.sort((a, b) => a.description.localeCompare(b.description));
//   }, [inventory, search]);
//   

//   // Handler to open the EDIT modal and set the selected material data
//   const handleEditMaterial = (material) => {
//     setEditModal({
//       show: true,
//       material: material,
//       newQuantity: material.sqm_quantity.toFixed(2), // Pre-fill with current quantity
//     });
//   };

//   // Handler to save the updated quantity (EDIT)
//   const handleSaveQuantity = () => {
//     const quantity = parseFloat(editModal.newQuantity);

//     if (isNaN(quantity) || quantity < 0) {
//       toast.error("Please enter a valid positive quantity.");
//       return;
//     }

//     // Update the inventory state immutably
//     setInventory(prevInventory => 
//       prevInventory.map(item => 
//         item.description === editModal.material.description 
//           ? { ...item, sqm_quantity: quantity }
//           : item
//       )
//     );

//     toast.success(`${editModal.material.description} quantity updated to ${quantity.toFixed(2)} ${editModal.material.unit}!`);
//     setEditModal({ show: false, material: null, newQuantity: "" }); // Close and reset modal
//   };

//   // Handler to add a new raw material (ADD)
//   const handleAddItem = () => {
//     const description = addModal.description.trim();
//     const quantity = parseFloat(addModal.quantity);
//     const unit = addModal.unit.trim(); // ⭐ USED: Get the unit from state

//     // ⭐ UPDATED: Added 'unit' to validation
//     if (!description || !unit || isNaN(quantity) || quantity <= 0) {
//       toast.error("Please enter a valid material description, unit, and positive quantity.");
//       return;
//     }

//     // Check for duplicates
//     if (inventory.some(item => item.description.toLowerCase() === description.toLowerCase())) {
//         toast.error(`Raw Material "${description}" already exists.`);
//         return;
//     }

//     // Create the new item
//     const newItem = {
//       description: description,
//       unit: unit, // ⭐ USED: Use the input unit
//       sqm_quantity: quantity,
//     };

//     // Add the new item to the inventory state
//     setInventory(prevInventory => [newItem, ...prevInventory]);
//     
//     // Reset to the first page to ensure the new item is visible after the list re-sorts/filters
//     setCurrentPage(1);

//     toast.success(`Raw Material "${description}" added successfully with unit "${unit}"!`);
//     // ⭐ UPDATED: Reset addModal state including unit
//     setAddModal({ show: false, description: "", quantity: "", unit: "sqm" }); 
//   };


//   // --- PAGINATION LOGIC ---
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMaterials = materials.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(materials.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
//   // --- END PAGINATION LOGIC ---

//   return (
//     <Container fluid>
//       <Row>
//         <Col md="12">
//           <Card className="strpied-tabled-with-hover">
//             <Card.Header
//               style={{
//                 backgroundColor: "#fff",
//                 borderBottom: "none",
//               }}
//             >
//               <Row className="align-items-center">
//                 <Col>
//                   <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
//                     Materials{/* Updated Title */}
//                   </Card.Title>
//                 </Col>
//                 <Col className="d-flex justify-content-end align-items-center gap-2">
//                   <Form.Control
//                     type="text"
//                     placeholder="Search by Material Description..."
//                     value={search}
//                     onChange={(e) => {
//                       setSearch(e.target.value);
//                       setCurrentPage(1); // Reset page on search
//                     }}
//                     className="custom-searchbar-input nav-search"
//                     style={{ width: "20vw" }}
//                   />
//                   <Button 
//                      // Reusing this class for styling
//                     onClick={() => setAddModal({ show: true, description: "", quantity: "", unit: "sqm" })} // ⭐ UPDATED: Reset unit when opening modal
//                     className="add-customer-btn btn btn-primary" // Blue color for Add Button
//                   >
//                     <FaPlus size={15} style={{ marginRight: '5px' }} /> Add Material
//                   </Button>
//                 </Col>
//               </Row>
//             </Card.Header>

//             <Card.Body className="table-full-width table-responsive d-flex justify-content-center align-items-center">
//               <div className="table-responsive">
//                 <Table striped hover>
//                   <thead>
//                     <tr>
//                       <th>Sr. no</th>
//                       <th>Material</th> {/* Updated Header */}
//                       <th>Quantity</th>
//                       <th>Unit</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentMaterials.length > 0 ? (
//                       currentMaterials.map((material, index) => (
//                         <tr key={material.description}>
//                           <td>{indexOfFirstItem + index + 1}</td>
//                           <td>{material.description}</td>
//                           <td>
//                             {material.sqm_quantity.toFixed(2)}
//                           </td>
//                           <td>{material.unit}</td> {/* ⭐ UPDATED: Now uses material.unit */}
//                           <td data-label="Actions">
//                             <div className="table-actions d-flex gap-3">
//                               <Button 
//                                 className="buttonEye"  
//                                 size="sm"
//                                  // Green color for Edit
//                                 onClick={() => handleEditMaterial(material)} 
//                               >
//                                 <FaEdit size={15} />
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="text-center p-4">
//                           No materials found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>

//            {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="d-flex justify-content-center p-3">
//                 <Pagination>
//                   <Pagination.First
//                     onClick={() => handlePageChange(1)}
//                     disabled={currentPage === 1}
//                   />
//                   <Pagination.Prev
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   />
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <Pagination.Item
//                       key={i + 1}
//                       active={i + 1 === currentPage}
//                       onClick={() => handlePageChange(i + 1)}
//                     >
//                       {i + 1}
//                     </Pagination.Item>
//                   ))}
//                   <Pagination.Next
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   />
//                   <Pagination.Last
//                     onClick={() => handlePageChange(totalPages)}
//                     disabled={currentPage === totalPages}
//                   />
//                 </Pagination>
//               </div>
//             )}
//           </Card>
//         </Col>
//       </Row>

//       {/* --- Material Quantity Edit Modal --- */}
//       <Modal
//         show={editModal.show}
//         onHide={() => setEditModal({ show: false, material: null, newQuantity: "" })}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Update Material Quantity</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             **Material:** {editModal.material?.description}
//           </p>
//           <Form.Group controlId="formNewQuantity">
//             <Form.Label>New Quantity ({editModal.material?.unit})</Form.Label>
//             <Form.Control
//               type="number"
//               step="0.01"
//               placeholder={`Enter new quantity in ${editModal.material?.unit}`}
//               value={editModal.newQuantity}
//               onChange={(e) =>
//                 setEditModal((prev) => ({ ...prev, newQuantity: e.target.value }))
//               }
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setEditModal({ show: false, material: null, newQuantity: "" })}
//           >
//             Close
//           </Button>
//           <Button 
//             className='add-customer-btn'
//             onClick={handleSaveQuantity}
//             disabled={!editModal.newQuantity}
//           >
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* --- Add New Raw Material Modal --- */}
//       <Modal
//         // ⭐ UPDATED: Reset unit when closing/hiding modal
//         show={addModal.show}
//         onHide={() => setAddModal({ show: false, description: "", quantity: "", unit: "sqm" })}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Material</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formMaterialDescription">
//               <Form.Label>Material Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="e.g., Pine Wood Planks, Steel Tubes"
//                 value={addModal.description}
//                 onChange={(e) =>
//                   setAddModal((prev) => ({ ...prev, description: e.target.value }))
//                 }
//               />
//             </Form.Group>
            
//             {/* ⭐ ADDED: Unit Input Field */}
//             <Form.Group className="mb-3" controlId="formMaterialUnit">
//               <Form.Label>Unit</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="e.g., sqm, nos, rolls"
//                 value={addModal.unit}
//                 onChange={(e) =>
//                   setAddModal((prev) => ({ ...prev, unit: e.target.value }))
//                 }
//               />
//             </Form.Group>

//             <Form.Group controlId="formNewQuantity">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control
//                 type="number"
//                 step="0.01"
//                 placeholder="Enter initial quantity"
//                 value={addModal.quantity}
//                 onChange={(e) =>
//                   setAddModal((prev) => ({ ...prev, quantity: e.target.value }))
//                 }
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             
//             // ⭐ UPDATED: Reset unit when closing/hiding modal
//             onClick={() => setAddModal({ show: false, description: "", quantity: "", unit: "sqm" })}
//           >
//             Close
//           </Button>
//           <Button 
//            className='add-customer-btn'
//             onClick={handleAddItem}
//             // ⭐ UPDATED: Disabled check now includes unit
//             disabled={!addModal.description.trim() || !addModal.quantity || !addModal.unit.trim()}
//           >
//             <FaPlus size={15} style={{ marginRight: '5px' }} /> Add Material
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

import React, { useMemo, useState } from 'react'; 
import toast from 'react-hot-toast'; 
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Table,
  Pagination,
  Modal,
  Form,
} from 'react-bootstrap';
import { FaEdit, FaPlus } from 'react-icons/fa'; // Added FaPlus icon

// NOTE: Inventory is renamed to INITIAL_INVENTORY_DATA for use with useState
const INITIAL_INVENTORY_DATA = [
  { description: "Aluminum Frames", unit: "sq. units", sqm_quantity: 12.50 },
  { description: "Bamboo Desks", unit: "sq. units", sqm_quantity: 22.33 },
  { description: "Breakroom Chairs", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Breakroom Table", unit: "sq. units", sqm_quantity: 22.33 },
  { description: "Chairs", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Checkout Counter", unit: "sq. units", sqm_quantity: 5.00 },
  { description: "Co-working Desks", unit: "sq. units", sqm_quantity: 22.33 },
  { description: "Collaborative Seating", unit: "sq. units", sqm_quantity: 19.20 },
  { description: "Conference Chair", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Conference Table", unit: "sq. units", sqm_quantity: 22.33 },
  { description: "Custom Cafe Chairs", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Custom Cafe Tables", unit: "sq. units", sqm_quantity: 40.00 },
  { description: "Display Shelves", unit: "sq. units", sqm_quantity: 21.00 },
  { description: "Ergonomic Chair", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Executive Desk", unit: "sq. units", sqm_quantity: 22.33 },
  { description: "Glass Partitions", unit: "sq. units", sqm_quantity: 18.58 },
  { description: "Individual Workstations", unit: "sq. units", sqm_quantity: 65.00 },
  { description: "Lobby Desk", unit: "sq. units", sqm_quantity: 5.00 },
  { description: "Lobby Sofa", unit: "sq. units", sqm_quantity: 19.20 },
  { description: "Lounge Seating", unit: "sq. units", sqm_quantity: 19.20 },
  { description: "Meeting Table", unit: "sq. units", sqm_quantity: 5.00 },
  { description: "Modular Workstations", unit: "sq. units", sqm_quantity: 65.00 },
  { description: "Reception Desk", unit: "sq. units", sqm_quantity: 5.00 },
  { description: "Recycled Plastic Chairs", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Sofa", unit: "sq. units", sqm_quantity: 19.20 },
  { description: "Training Hall Desk", unit: "sq. units", sqm_quantity: 22.33 },
  { description: "Visitor Chairs", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Waiting Lounge Seating", unit: "sq. units", sqm_quantity: 19.20 },
  { description: "Waiting Room Chairs", unit: "sq. units", sqm_quantity: 16.75 },
  { description: "Work Desks", unit: "sq. units", sqm_quantity: 22.33 },
  { description: "Workstations", unit: "sq. units", sqm_quantity: 110.00 },
];


export default function AllRawMaterials() { // Renamed function
  // State to hold the mutable inventory list
  const [inventory, setInventory] = useState(INITIAL_INVENTORY_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(""); // State for search input
  const itemsPerPage = 10; 

  // State for the Edit Modal
  const [editModal, setEditModal] = useState({
    show: false,
    material: null, // Stores the material object being edited
    newQuantity: "",
  });

  // State for the Add Modal
  const [addModal, setAddModal] = useState({
    show: false,
    description: "",
    quantity: "",
    unit: "sqm", // ⭐ ADDED: State for the unit, defaulting to 'sqm'
  });
  
  // ⭐ NEW STATE: for the success dialog box
  const [successModal, setSuccessModal] = useState({
    show: false,
    message: "",
  });


  // Filter, then sort the inventory for display
  const materials = useMemo(() => {
    // 1. Filtering Logic
    const searchTerm = search.toLowerCase();
    const filtered = inventory.filter(item => 
      item.description.toLowerCase().includes(searchTerm)
    );

    // 2. Sorting Logic
    return filtered.sort((a, b) => a.description.localeCompare(b.description));
  }, [inventory, search]);
  

  // Handler to open the EDIT modal and set the selected material data
  const handleEditMaterial = (material) => {
    setEditModal({
      show: true,
      material: material,
      newQuantity: material.sqm_quantity.toFixed(2), // Pre-fill with current quantity
    });
  };

  // Handler to save the updated quantity (EDIT)
  const handleSaveQuantity = () => {
    const quantity = parseFloat(editModal.newQuantity);

    if (isNaN(quantity) || quantity < 0) {
      toast.error("Please enter a valid positive quantity.");
      return;
    }

    // Update the inventory state immutably
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.description === editModal.material.description 
          ? { ...item, sqm_quantity: quantity }
          : item
      )
    );

    // Close the edit modal
    setEditModal({ show: false, material: null, newQuantity: "" }); 
    
    // ⭐ UPDATED: Display Success Modal instead of just a toast
    const successMessage = `${editModal.material.description} quantity updated to ${quantity.toFixed(2)} ${editModal.material.unit}!`;
    setSuccessModal({ show: true, message: successMessage });
    // You can still keep the toast, but the requirement was for a 'dialogue box'
    // toast.success(successMessage); 
  };

  // Handler to add a new raw material (ADD)
  const handleAddItem = () => {
    const description = addModal.description.trim();
    const quantity = parseFloat(addModal.quantity);
    const unit = addModal.unit.trim(); // ⭐ USED: Get the unit from state

    // ⭐ UPDATED: Added 'unit' to validation
    if (!description || !unit || isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid material description, unit, and positive quantity.");
      return;
    }

    // Check for duplicates
    if (inventory.some(item => item.description.toLowerCase() === description.toLowerCase())) {
        toast.error(`Raw Material "${description}" already exists.`);
        return;
    }

    // Create the new item
    const newItem = {
      description: description,
      unit: unit, // ⭐ USED: Use the input unit
      sqm_quantity: quantity,
    };

    // Add the new item to the inventory state
    setInventory(prevInventory => [newItem, ...prevInventory]);
    
    // Reset to the first page to ensure the new item is visible after the list re-sorts/filters
    setCurrentPage(1);

    // Close and reset the add modal
    setAddModal({ show: false, description: "", quantity: "", unit: "sqm" }); 
    
    // ⭐ UPDATED: Display Success Modal instead of just a toast
    const successMessage = `Raw Material "${description}" added successfully with unit "${unit}"!`;
    setSuccessModal({ show: true, message: successMessage });
    // You can still keep the toast, but the requirement was for a 'dialogue box'
    // toast.success(successMessage); 
  };


  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMaterials = materials.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(materials.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  // --- END PAGINATION LOGIC ---

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
                <Col>
                  <Card.Title style={{ marginTop: "2rem", fontWeight: "700" }}>
                    Materials{/* Updated Title */}
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Search by Material Description..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1); // Reset page on search
                    }}
                    className="custom-searchbar-input nav-search"
                    style={{ width: "20vw" }}
                  />
                  <Button 
                      // Reusing this class for styling
                    onClick={() => setAddModal({ show: true, description: "", quantity: "", unit: "sqm" })} // ⭐ UPDATED: Reset unit when opening modal
                    className="add-customer-btn btn btn-primary" // Blue color for Add Button
                  >
                    <FaPlus size={15} style={{ marginRight: '5px' }} /> Add Material
                  </Button>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive d-flex justify-content-center align-items-center">
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Sr. no</th>
                      <th>Material</th> {/* Updated Header */}
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMaterials.length > 0 ? (
                      currentMaterials.map((material, index) => (
                        <tr key={material.description}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{material.description}</td>
                          <td>
                            {material.sqm_quantity.toFixed(2)}
                          </td>
                          <td>{material.unit}</td> {/* ⭐ UPDATED: Now uses material.unit */}
                          <td data-label="Actions">
                            <div className="table-actions d-flex gap-3">
                              <Button 
                                className="buttonEye"  
                                size="sm"
                                  // Green color for Edit
                                onClick={() => handleEditMaterial(material)} 
                              >
                                <FaEdit size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center p-4">
                          No materials found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center p-3">
                <Pagination>
                  <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* --- Material Quantity Edit Modal --- */}
      <Modal
        show={editModal.show}
        onHide={() => setEditModal({ show: false, material: null, newQuantity: "" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Material Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            **Material:** {editModal.material?.description}
          </p>
          <Form.Group controlId="formNewQuantity">
            <Form.Label>New Quantity ({editModal.material?.unit})</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder={`Enter new quantity in ${editModal.material?.unit}`}
              value={editModal.newQuantity}
              onChange={(e) =>
                setEditModal((prev) => ({ ...prev, newQuantity: e.target.value }))
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setEditModal({ show: false, material: null, newQuantity: "" })}
          >
            Close
          </Button>
          <Button 
            className='add-customer-btn'
            onClick={handleSaveQuantity}
            disabled={!editModal.newQuantity}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --- Add New Raw Material Modal --- */}
      <Modal
        // ⭐ UPDATED: Reset unit when closing/hiding modal
        show={addModal.show}
        onHide={() => setAddModal({ show: false, description: "", quantity: "", unit: "sqm" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formMaterialDescription">
              <Form.Label>Material Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Pine Wood Planks, Steel Tubes"
                value={addModal.description}
                onChange={(e) =>
                  setAddModal((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </Form.Group>
            
            {/* ⭐ ADDED: Unit Input Field */}
            <Form.Group className="mb-3" controlId="formMaterialUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., sqm, nos, rolls"
                value={addModal.unit}
                onChange={(e) =>
                  setAddModal((prev) => ({ ...prev, unit: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group controlId="formNewQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter initial quantity"
                value={addModal.quantity}
                onChange={(e) =>
                  setAddModal((prev) => ({ ...prev, quantity: e.target.value }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            // ⭐ UPDATED: Reset unit when closing/hiding modal
            onClick={() => setAddModal({ show: false, description: "", quantity: "", unit: "sqm" })}
          >
            Close
          </Button>
          <Button 
            className='add-customer-btn'
            onClick={handleAddItem}
            // ⭐ UPDATED: Disabled check now includes unit
            disabled={!addModal.description.trim() || !addModal.quantity || !addModal.unit.trim()}
          >
            <FaPlus size={15} style={{ marginRight: '5px' }} /> Add Material
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --- ⭐ NEW: Success Confirmation Modal --- */}
      <Modal
        show={successModal.show}
        onHide={() => setSuccessModal({ show: false, message: "" })}
        centered
      >
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Success! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead text-success text-center">
            {successModal.message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => setSuccessModal({ show: false, message: "" })}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}