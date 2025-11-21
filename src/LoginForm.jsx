// src/LoginForm.jsx
import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Test Credentials - Replace with backend API call later
  const validUsers = [
    { email: "admin@erp.com", password: "admin123", role: "Admin" },
    { email: "sales@erp.com", password: "sales123", role: "Sales" },
    { email: "finance@erp.com", password: "finance123", role: "Finance" },
    { email: "hr@erp.com", password: "hr123", role: "HR" },
    { email: "design@erp.com", password: "design123", role: "Design" },
    { email: "store@erp.com", password: "store123", role: "Store" },
    { email: "planning@erp.com", password: "planning123", role: "Planning" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate all fields are filled
      if (!email || !password || !role) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      // ✅ For now: Check against test credentials
      // TODO: Replace this with actual API call to your backend
      const user = validUsers.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (!user) {
        setError("Invalid credentials. Please check your email, password, and selected role.");
        setLoading(false);
        return;
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ✅ Login successful - Store user info
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userRole", role);
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userName", email.split("@")[0]);

      // Call parent component callback
      onLoginSuccess();
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="login-card shadow-lg" style={{ width: "400px" }}>
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">ERP System</h2>
              <p className="text-muted">Please login to continue</p>
            </div>

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError("")}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
              {/* Email Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-500">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <Form.Text className="text-muted d-block mt-2">
                  Test: admin@erp.com
                </Form.Text>
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-500">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <Form.Text className="text-muted d-block mt-2">
                  Test: admin123
                </Form.Text>
              </Form.Group>

              {/* Role Dropdown */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-500">Select Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                  required
                >
                  <option value="">-- Choose a role --</option>
                  <option value="Admin">Admin</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Design">Design</option>
                  <option value="Store">Store</option>
                  <option value="Planning">Planning</option>
                </Form.Select>
              </Form.Group>

              {/* Login Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-bold"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>

            {/* Test Credentials Info */}
            <div className="mt-4 p-3 bg-light rounded">
              <h6 className="fw-bold mb-3">📋 Test Credentials:</h6>
              <small className="d-block mb-2">
                <strong>Email:</strong> admin@erp.com | <strong>Password:</strong> admin123
              </small>
              <small className="d-block mb-2">
                <strong>Email:</strong> sales@erp.com | <strong>Password:</strong> sales123
              </small>
              <small className="d-block mb-2">
                <strong>Email:</strong> finance@erp.com | <strong>Password:</strong> finance123
              </small>
              <small className="d-block mb-2">
                <strong>Email:</strong> hr@erp.com | <strong>Password:</strong> hr123
              </small>
              <small className="d-block">
                <strong>Email:</strong> design@erp.com | <strong>Password:</strong> design123
              </small>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginForm;