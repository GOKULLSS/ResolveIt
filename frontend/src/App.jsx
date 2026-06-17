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
        style={{ backgroundColor: '#000026' }}
      >
        <Navbar />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* <Route
              path="/student-dashboard"
              element={
                
                  <StudentDashboard />
                  <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
                
              }
            /> */}

            <Route
              path="/student-dashboard"
              element={
                
                  <StudentDashboard />
                
              }
            />
            <Route
              path="/submit-complaint"
              element={
                
                  <StudentSubmit />
                
              }
            />
            <Route
              path="/edit-complaint/:id"
              element={
                
                  <StudentSubmit />
              
              }
            />
            <Route
              path="/view-complaints"
              element={
                
                  <StudentViewComplaints />
                
              }
            />
            <Route
              path="/complaint-status"
              element={
                
                  <StudentTrackComplaints />
                
              }
            />
            {/* <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/admin-dashboard"
              element={
                
                  <AdminDashboard />
                
              }
            />
            <Route
              path="/active-complaints"
              element={
                
                  <AdminActiveComplaints />
                
              }
            />
          </Routes>
        </div>

        <footer
          className="py-3 text-center text-muted mt-auto border-top border-opacity-5"
          style={{ borderColor: "var(--border-color)", fontSize: "0.8rem" }}
        >
          <div className="container">
            <span className="text-secondary">
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
