import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSubmit from "./pages/StudentSubmit";
import StudentViewComplaints from "./pages/StudentViewComplaints";
import StudentTrackComplaints from "./pages/StudentTrackComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AdminActiveComplaints from "./pages/AdminActiveComplaints";

function App() {
  return (
    
    <Router>
      <div
        className="d-flex flex-column min-vh-100"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Navbar />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit-complaint"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentSubmit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-complaint/:id"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentSubmit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-complaints"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentViewComplaints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complaint-status"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentTrackComplaints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/active-complaints"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminActiveComplaints />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <footer
          className="py-3 text-center text-muted mt-auto border-top border-opacity-5"
          style={{ borderColor: "var(--border-color)", fontSize: "0.8rem" }}
        >
          <div className="container">
            <span>
              &copy; {new Date().getFullYear()} Campus Complaint Management
              System. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
