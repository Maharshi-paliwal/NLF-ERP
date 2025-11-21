// src/pages/adminpanel/user-interface/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", city: "Mumbai" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+91 91234 56789", city: "Delhi" },
    { id: 3, name: "Arjun Mehta", email: "arjun@example.com", phone: "+91 99887 77665", city: "Bengaluru" },
    { id: 4, name: "Priya Sharma", email: "priya@example.com", phone: "+91 97654 12345", city: "Pune" },
  ];

  return (
   <div>
    <h1>THIS IS THE DASHBOARD PAGE</h1>
   </div>
  );
};

export default Dashboard;
