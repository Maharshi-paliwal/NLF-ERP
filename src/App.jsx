// // src/App.jsx
// import { Container } from "react-bootstrap";
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import "./App.css";
// import LoginForm from "./LoginForm";

// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";
// import Dashboard from "./pages/Dashboard";
// import LeadGeneration from "./pages/LeadGeneration";
// import NewCustomer from "./forms/NewCustomer";
// import RecordQuotations from "./tables/quotations/RecordQuotations";
// import AdminApproval from "./pages/AdminApproval";
// import NewQuotation from "./forms/NewQuotation";
// import TendersAll from "./tables/leads/TenderAll";
// import LeadForm from "./forms/LeadForm";
// import ClientLead from "./pages/ClientLead";
// import RequisitionForm from "./forms/RequisitonForm";
// // import OrderConfirmation from "./pages/OrderConfirmation";
// import Accounts from "./pages/Accounts";
// import WorkOrder from "./pages/WorkOrder";
// import TenderDetail from "./forms/TenderDetail";
// import ApprovedQuotes from "./tables/Order confirmation/ApprovedQuotes";
// import ApprovedForm from "./forms/ApprovedForm";
// import AllMaterials from "./pages/AllMaterials";
// import PoForm from "./forms/PoForm";
// import SalesPerson from "./tables/leads/SalesPerson";
// import SalesDetails from "./tables/leads/SalesDetails";
// import ViewLeads from "./forms/ViewLeads";
// import NewLead from "./forms/NewLead";
// import WorkOrderForm from "./forms/WorkOrderForm";
// import Ordertable from "./pages/ordertable";
// import Design from "./pages/Design";
// import Store from "./pages/Store";
// import Planning from "./pages/Planning";
// import DesignSubpage from "./forms/DesignSubpage";
// import StoreSubpage from "./pages/StoreSubpage";
// import PlanningSubpage from "./forms/PlanningSubpage";
// import Vendor from "./forms/Vendor";
// import NewVendor from "./forms/Vendor";
// import Requisition from "./pages/Requisiton";
// import POVendor from "./tables/POvendor";
// import NewVendorPO from "./forms/NewVendorpo";
// import AnnextureViewer from "./tables/AnnextureViewer";
// import PendingLeave from "./tables/PendingLeave";
// import AnnextureForm from "./forms/AnnextureForm ";
// import Dispatch from "./pages/Dispatch";
// import DispatchForm from "./forms/DispatchForm";
// import HR from "./hr module/HR";
// import RecruitmentProcess from "./hr module/RecruitmentProcess";
// import AddEmployee from "./hr module/AddEmployee";
// import Employees from "./hr module/Employees";
// import EmployeeClaim from "./hr module/EmployeeClaim";
// import NewClaim from "./hr module/NewClaim";
// import Attendance from "./hr module/Attendance ";
// import AddAttendance from "./hr module/AddAttendance";
// import Report from "./hr module/Report";
// import QuotationReportList from "./hr module/QuotationReportList";
// import PurchaseOrderReportList from "./hr module/PurchaseOrderReportList";
// import SiteManagement from "./pages/SiteManagement";
// import ViewSiteManagement from "./forms/ViewSiteManagement";

// // 🔐 Helper: Check if user is "logged in"
// const isAuthenticated = () => {
//   return localStorage.getItem("isLoggedIn") === "true";
// };

// // 🔐 Protected Layout Wrapper
// const ProtectedLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   if (!isAuthenticated()) {
//     return <Navigate to="/" replace />;
//   }

//     return (
//     <div className="d-flex vh-100">
//       <div className={`sidebar-container ${sidebarOpen ? "show" : ""}`}>
//         <Sidebar collapsed={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       </div>
//       <div className="main-content flex-grow-1 d-flex flex-column">
//         <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
//         <Container fluid className="p-3 content-area flex-grow-1">
//           {children}
//         </Container>
//       </div>
//     </div>
//   );
// };

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar stays full height */}
//         <div className={`sidebar-container ${sidebarOpen ? "show" : ""}`}>
//           <Sidebar collapsed={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//         </div>

//         {/* Main content area */}
//         <div className="main-content flex-grow-1 d-flex flex-column">
//           <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
//           <Container fluid className="p-3 content-area flex-grow-1">
//             <Routes>
//               {/* Default redirect to dashboard */}
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />

//               {/* Pages */}
//               <Route path="/dashboard" element={<Dashboard />} />

//               <Route path="/new-customer" element={<NewCustomer />} />
//               <Route path="/leadgeneration" element={<LeadGeneration />} />
//               <Route path="/create-revision" element={<NewQuotation />} />
//               <Route path="/new-quotation/:quotationId" element={<NewQuotation />} />
//               <Route path="/new-quotation" element={<NewQuotation />} />
//               <Route path="/new-quotation/:quotationId/:roundIdentifier" element={<NewQuotation />} />
//               <Route path="/new-quotation/from-lead/:leadId" element={<NewQuotation />} />
//               <Route path="/tenders" element={<TendersAll />} />
//               <Route path="/lead-form" element={<LeadForm />} />
//               <Route path="/sales" element={<SalesPerson />} />
//               <Route path="/new-customer/:id" element={<NewCustomer />} />
//               {/* <Route path="/quotationsAll" element={<QuotationsAll />} /> */}
//               {/* <Route path="/order-confirmations" element={<OrderConfirmation />} /> */}
//               {/* 2. DYNAMIC ROUTE: The `:leadId` parameter allows the LeadForm component to fetch specific data */}
//               <Route path="/lead-form/:leadId" element={<LeadForm />} />
//               {/* *** NEW ROUTE FOR SALES DETAILS *** */}
//               {/* The :leadId ensures the URL parameter is captured */}
//               <Route path="/sales-details/:clientName" element={<SalesDetails />} />
//               <Route path="/newlead" element={<NewLead />} />
//               <Route path="/workorderform" element={<WorkOrderForm />} />
//               {/* <Route path="/view-leads/:projectName" element={<ViewLeads />} />              <Route
//                 path="/order-confirmations/:orderConfirmationId"
//                 element={<OrderConfirmForm />}
//               />
//               <Route path="/tenders/:tenderId" element={<TenderDetail />} />
//               <Route path="/new-order-confirmation" element={<OrderConfirmForm />} /> */}

//               <Route path="/clients" element={<ClientLead />} />

//               <Route path="/requisitionForm" element={<RequisitionForm />} />
//               <Route path="/accounts" element={<Accounts />} />

//               {/* Existing route for base ID view */}
//               <Route path="quotations/records/:quotationId" element={<RecordQuotations />} />

//               {/* ⭐ NEW ROUTE: Fixes the error by matching the exact path used in ClientLead.jsx's View link. */}
//               {/* This route uses two dynamic parameters: quotationId and roundIdentifier. */}
//               <Route
//                 path="/quotations/:quotationId/:roundIdentifier"
//                 element={<NewQuotation />}
//               />
//               <Route path="/view-leads/:projectName" element={<ViewLeads />} />
//               <Route path="/create-revision/:quotationId" element={<NewQuotation />} />
//               <Route path="/admin-approval" element={<AdminApproval />} />
//               <Route path="/workorder" element={<WorkOrder />} />
//               <Route path="/workorderform/:workOrderId" element={<WorkOrderForm />} />
//               <Route path="/workorderformaccounts/:workOrderId" element={<WorkOrderForm />} />
//               <Route path="/designworkorderform/:workOrderId" element={<WorkOrderForm />} />

//               <Route path="/storeworkorderform/:workOrderId" element={<WorkOrderForm />} />

//               <Route path="/planworkorderform/:workOrderId" element={<WorkOrderForm />} />



//               {/* module 2 */}
//               <Route path="/ordertable" element={<Ordertable />} />
//               <Route path="/design" element={<Design />} />

//               <Route path="/workorderform/:workOrderId?" element={<WorkOrderForm />} />

//               <Route path="/design/approved" element={<Ordertable type="design" />} />
//               <Route path="/store/approved" element={<Ordertable type="store" />} />


//               <Route path="/planning" element={<Ordertable type="planning" />} />
//               <Route
//                 path="/approved-quotes/:section/details/:quotationId"
//                 element={<ApprovedForm />} // Pass the :section parameter as a prop
//               />
//               <Route
//                 path="/povendor"
//                 element={<POVendor />} // Pass the :section parameter as a prop
//               />
//               <Route path="/design" element={<Design />} />
//               <Route path="/designsubpage/:workOrderId" element={<DesignSubpage />} />
//               <Route path="/plannings" element={<Planning />} />
//               <Route path="/planningsubpage/:workOrderId" element={<PlanningSubpage />} />
//               <Route path="/store" element={<Store />} />
//               <Route path="/storesubpage/:workOrderId" element={<StoreSubpage />} />

//               <Route
//                 path="/AllMaterials"
//                 element={<AllMaterials />} // Pass the :section parameter as a prop
//               />
//               <Route
//                 path="/po/new/:quotationId/:roundId"
//                 element={<PoForm />}
//               />
//               <Route path="/newvendorpo" element={<NewVendorPO />} />

//               <Route path="/povendor/:poId" element={<Vendor />} />

//               <Route path="/annextureviewer/:workOrderId" element={<AnnextureViewer />} />



//               <Route path="/hr" element={<HR />} />




//               <Route
//                 path="/designnewvendor"
//                 element={<NewVendorPO />}
//               />



//               <Route
//                 path="/storenewvendor"
//                 element={<NewVendorPO />}
//               />



//               <Route
//                 path="/plannewvendor"
//                 element={<NewVendorPO />}
//               />

//               <Route
//                 path="/pendingleaves"
//                 element={<PendingLeave />}
//               />
//               <Route
//                 path="/annextureform"
//                 element={<AnnextureForm />}
//               />

//               <Route path="/dispatch" element={<Dispatch />} />

//               <Route path="/dispatchform" element={<DispatchForm />} />
//               <Route path="/dispatchform/edit/:shipmentId" element={<DispatchForm />} />
//               <Route path="/dispatchform/view/:shipmentId" element={<DispatchForm />} />

//               {/* HR MODULE ROUTING */}

//               <Route path="/hr/recruitment" element={<RecruitmentProcess />} />
//               <Route path="/hr/add-employee" element={<AddEmployee />} />
//               <Route path="/hr/employees" element={<Employees />} />
//               <Route path="/hr/employee-claim" element={<EmployeeClaim />} />
//               <Route path="/hr/new-claim" element={<NewClaim />} />
//               <Route path="/hr/attendance" element={<Attendance />} />
//               <Route path="/hr/add-attendance" element={<AddAttendance />} />
//               <Route path="/reports" element={<Report />} />
//               <Route path="/quotations/reports" element={<QuotationReportList />} />
//               <Route path="/purchase-orders/reports" element={<PurchaseOrderReportList />} />
//               <Route path="/sitemanagement" element={<SiteManagement />} />

//               {/* site management module */}

//               <Route path="/site-management/view/:id" element={<ViewSiteManagement />} />

//             </Routes>
//           </Container>
//         </div>
//       </div>
//     </Router>
//   );
// }




// export default App;


// src/App.jsx
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import LeadGeneration from "./pages/LeadGeneration";
import NewCustomer from "./forms/NewCustomer";
import RecordQuotations from "./tables/quotations/RecordQuotations";
import AdminApproval from "./pages/AdminApproval";
import NewQuotation from "./forms/NewQuotation";
import TendersAll from "./tables/leads/TenderAll";
import LeadForm from "./forms/LeadForm";
import ClientLead from "./pages/ClientLead";
import RequisitionForm from "./forms/RequisitonForm";
import Accounts from "./pages/Accounts";
import WorkOrder from "./pages/WorkOrder";
import TenderDetail from "./forms/TenderDetail";
import ApprovedQuotes from "./tables/Order confirmation/ApprovedQuotes";
import ApprovedForm from "./forms/ApprovedForm";
import AllMaterials from "./pages/AllMaterials";
import PoForm from "./forms/PoForm";
import SalesPerson from "./tables/leads/SalesPerson";
import SalesDetails from "./tables/leads/SalesDetails";
import ViewLeads from "./forms/ViewLeads";
import NewLead from "./forms/NewLead";
import WorkOrderForm from "./forms/WorkOrderForm";
import Ordertable from "./pages/ordertable";
import Design from "./pages/Design";
import Store from "./pages/Store";
import Planning from "./pages/Planning";
import DesignSubpage from "./forms/DesignSubpage";
import StoreSubpage from "./pages/StoreSubpage";
import PlanningSubpage from "./forms/PlanningSubpage";
import Vendor from "./forms/Vendor";
import Requisition from "./pages/Requisiton";
import POVendor from "./tables/POvendor";
import NewVendorPO from "./forms/NewVendorpo";
import AnnextureViewer from "./tables/AnnextureViewer";
import PendingLeave from "./tables/PendingLeave";
import AnnextureForm from "./forms/AnnextureForm ";
import Dispatch from "./pages/Dispatch";
import DispatchForm from "./forms/DispatchForm";
import HR from "./hr module/HR";
import RecruitmentProcess from "./hr module/RecruitmentProcess";
import AddEmployee from "./hr module/AddEmployee";
import Employees from "./hr module/Employees";
import EmployeeClaim from "./hr module/EmployeeClaim";
import NewClaim from "./hr module/NewClaim";
import Attendance from "./hr module/Attendance ";
import AddAttendance from "./hr module/AddAttendance";
import Report from "./hr module/Report";
import QuotationReportList from "./hr module/QuotationReportList";
import PurchaseOrderReportList from "./hr module/PurchaseOrderReportList";
import SiteManagement from "./pages/SiteManagement";
import ViewSiteManagement from "./forms/ViewSiteManagement";

// 🔐 Helper: Check if user is "logged in"
const isAuthenticated = () => {
  return sessionStorage.getItem("isLoggedIn") === "true";
};

// 🔐 Protected Layout Wrapper
const ProtectedLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex vh-100">
      <div className={`sidebar-container ${sidebarOpen ? "show" : ""}`}>
        <Sidebar collapsed={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="main-content flex-grow-1 d-flex flex-column">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
        <Container fluid className="p-3 content-area flex-grow-1">
          {children}
        </Container>
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check authentication status on app load
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userRole");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="d-flex vh-100">
          {/* Sidebar stays full height */}
          <div className={`sidebar-container ${sidebarOpen ? "show" : ""}`}>
            <Sidebar 
              collapsed={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              onLogout={handleLogout}
            />
          </div>

          {/* Main content area */}
          <div className="main-content flex-grow-1 d-flex flex-column">
            <Topbar 
              onToggleSidebar={() => setSidebarOpen(true)}
              onLogout={handleLogout}
            />
            <Container fluid className="p-3 content-area flex-grow-1">
              <Routes>
                {/* Default redirect to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Pages */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-customer" element={<NewCustomer />} />
                <Route path="/leadgeneration" element={<LeadGeneration />} />
                <Route path="/create-revision" element={<NewQuotation />} />
                <Route path="/new-quotation/:quotationId" element={<NewQuotation />} />
                <Route path="/new-quotation" element={<NewQuotation />} />
                <Route path="/new-quotation/:quotationId/:roundIdentifier" element={<NewQuotation />} />
                <Route path="/new-quotation/from-lead/:leadId" element={<NewQuotation />} />
                <Route path="/tenders" element={<TendersAll />} />
                <Route path="/lead-form" element={<LeadForm />} />
                <Route path="/sales" element={<SalesPerson />} />
                <Route path="/new-customer/:id" element={<NewCustomer />} />
                <Route path="/lead-form/:leadId" element={<LeadForm />} />
                <Route path="/sales-details/:clientName" element={<SalesDetails />} />
                <Route path="/newlead" element={<NewLead />} />
                <Route path="/workorderform" element={<WorkOrderForm />} />
                <Route path="/clients" element={<ClientLead />} />
                <Route path="/requisitionForm" element={<RequisitionForm />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="quotations/records/:quotationId" element={<RecordQuotations />} />
                <Route
                  path="/quotations/:quotationId/:roundIdentifier"
                  element={<NewQuotation />}
                />
                <Route path="/view-leads/:projectName" element={<ViewLeads />} />
                <Route path="/create-revision/:quotationId" element={<NewQuotation />} />
                <Route path="/admin-approval" element={<AdminApproval />} />
                <Route path="/workorder" element={<WorkOrder />} />
                <Route path="/workorderform/:workOrderId" element={<WorkOrderForm />} />
                <Route path="/workorderformaccounts/:workOrderId" element={<WorkOrderForm />} />
                <Route path="/designworkorderform/:workOrderId" element={<WorkOrderForm />} />
                <Route path="/storeworkorderform/:workOrderId" element={<WorkOrderForm />} />
                <Route path="/planworkorderform/:workOrderId" element={<WorkOrderForm />} />

                {/* Module 2 */}
                <Route path="/ordertable" element={<Ordertable />} />
                <Route path="/design" element={<Design />} />
                <Route path="/design/approved" element={<Ordertable type="design" />} />
                <Route path="/store/approved" element={<Ordertable type="store" />} />
                <Route path="/planning" element={<Ordertable type="planning" />} />
                <Route
                  path="/approved-quotes/:section/details/:quotationId"
                  element={<ApprovedForm />}
                />
                <Route path="/povendor" element={<POVendor />} />
                <Route path="/designsubpage/:workOrderId" element={<DesignSubpage />} />
                <Route path="/plannings" element={<Planning />} />
                <Route path="/planningsubpage/:workOrderId" element={<PlanningSubpage />} />
                <Route path="/store" element={<Store />} />
                <Route path="/storesubpage/:workOrderId" element={<StoreSubpage />} />
                <Route path="/AllMaterials" element={<AllMaterials />} />
                <Route path="/po/new/:quotationId/:roundId" element={<PoForm />} />
                <Route path="/newvendorpo" element={<NewVendorPO />} />
                <Route path="/povendor/:poId" element={<Vendor />} />
                <Route path="/annextureviewer/:workOrderId" element={<AnnextureViewer />} />
                <Route path="/designnewvendor" element={<NewVendorPO />} />
                <Route path="/storenewvendor" element={<NewVendorPO />} />
                <Route path="/plannewvendor" element={<NewVendorPO />} />
                <Route path="/pendingleaves" element={<PendingLeave />} />
                <Route path="/annextureform" element={<AnnextureForm />} />
                <Route path="/dispatch" element={<Dispatch />} />
                <Route path="/dispatchform" element={<DispatchForm />} />
                <Route path="/dispatchform/edit/:shipmentId" element={<DispatchForm />} />
                <Route path="/dispatchform/view/:shipmentId" element={<DispatchForm />} />

                {/* HR MODULE ROUTING */}
                <Route path="/hr" element={<HR />} />
                <Route path="/hr/recruitment" element={<RecruitmentProcess />} />
                <Route path="/hr/add-employee" element={<AddEmployee />} />
                <Route path="/hr/employees" element={<Employees />} />
                <Route path="/hr/employee-claim" element={<EmployeeClaim />} />
                <Route path="/hr/new-claim" element={<NewClaim />} />
                <Route path="/hr/attendance" element={<Attendance />} />
                <Route path="/hr/add-attendance" element={<AddAttendance />} />
                <Route path="/reports" element={<Report />} />
                <Route path="/quotations/reports" element={<QuotationReportList />} />
                <Route path="/purchase-orders/reports" element={<PurchaseOrderReportList />} />
                <Route path="/sitemanagement" element={<SiteManagement />} />
                <Route path="/site-management/view/:id" element={<ViewSiteManagement />} />

                {/* Catch all - redirect to dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Container>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;