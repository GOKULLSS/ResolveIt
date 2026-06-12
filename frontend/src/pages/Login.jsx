import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 // const { login, user, isAuthenticated } = useContext(AuthContext);
  const user = {
    name: "Gokulzz",
    role: "Admin",
  };
  const isAuthenticated = false
  
  const navigate = useNavigate();

  //User already present condition
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  //Checking credentials after clicking submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      setFormError(result.error);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" 
    style={{ minHeight: 'calc(100vh - 100px)' }}>
      <div className="col-12 col-md-8 col-lg-5 fade-in-up">
        <div className="card glass-panel border border-opacity-10 p-4 p-md-5">
           <div className="text-center mb-4">
            <div className="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
              <i className="bi bi-shield-lock-fill fs-2"></i>
            </div>
            <h2 className="fw-bold text-light">Welcome Back</h2>
            <p className="text-secondary small">Access the Campus Complaint Management System</p>
           </div>

          {formError && (
            <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-0 d-flex align-items-center gap-2 mb-4" role="alert" style={{ borderRadius: '8px' }}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>{formError}</div>
            </div>
          )}

          {/*LOGIN PAGE*/}
          <form onSubmit={handleSubmit}>

            {/*email entering field*/}
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label text-secondary small fw-medium">Campus Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control custom-input border-start-0"
                  id="emailInput"
                  placeholder="e.g., student@campus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/*password entering field*/}
            <div className="mb-4">
              <label htmlFor="passwordInput" className="form-label text-secondary small fw-medium">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control custom-input border-start-0"
                  id="passwordInput"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

          {/*submit button*/}
          <button
              type="submit"
              className="btn btn-primary-gradient w-100 py-3 d-flex justify-content-center align-items-center gap-2 fw-semibold mb-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {/*Linking to Registration field*/}
          <div className="text-center">
            <span className="text-secondary small">New to the portal? </span>
            <Link to="/register" className="text-primary fw-medium small text-decoration-none hover-underline">
              Create an Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login