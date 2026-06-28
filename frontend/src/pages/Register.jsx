import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); 
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, user, isAuthenticated } = useContext(AuthContext);

  //dummy data
  // const user = {
  //   name: "Gokulzz",
  //   email: "student@123.com",
  //   password: "123456",
  //   role: "Admin",
  // };
  // const isAuthenticated = false

  const navigate = useNavigate();

  //redirect to dash after login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  //checking for error and registering account
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !password || !role) {
      setFormError('Please fill in all the registration fields');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password, role);
    setIsLoading(false);

    if (!result.success) {
      setFormError(result.error);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <div className="col-12 col-md-8 col-lg-6 fade-in-up">
        <div className="card glass-panel border border-opacity-10 p-4 p-md-5">

          {/*for icon and heading*/}
          <div className="text-center mb-4">
            <div className="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
              <i className="bi bi-person-plus-fill fs-2"></i>
            </div>
            <h2 className="fw-bold text-light">Create Account</h2>
            <p className="text-secondary small">Register to start filing or managing campus complaints</p>
          </div>

          {/*error in entry*/}
          {formError && (
            <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-0 d-flex align-items-center gap-2 mb-4" role="alert" style={{ borderRadius: '8px' }}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>{formError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
             <div className="row">

              {/*setting name*/}
              <div className="col-md-6 mb-3">
                <label htmlFor="nameInput" className="form-label text-secondary small fw-medium">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control custom-input border-start-0"
                    id="nameInput"
                    placeholder="e.g., Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/*setting role*/}
              <div className="col-md-6 mb-3">
                <label htmlFor="roleSelect" className="form-label text-secondary small fw-medium">Portal Role</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <i className="bi bi-people"></i>
                  </span>
                  <select
                    className="form-select custom-input border-start-0"
                    id="roleSelect"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={isLoading}
                    required
                  >
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>  
             </div>

              {/*setting email*/}
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

            {/*setting password*/}
            <div className="mb-4">
              <label htmlFor="passwordInput" className="form-label text-secondary small fw-medium">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control custom-input border-start-0"
                  placeholder="At least 6 characters"
                  id="passwordInput"
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
              className="btn btn-primary w-100 py-3 d-flex justify-content-center align-items-center gap-2 fw-semibold mb-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <i className="bi bi-check-circle"></i>
                </>
              )}
            </button>
          </form>
            
          {/*login link*/}
          <div className="text-center">
            <span className="text-secondary small">Already registered? </span>
            <Link to="/login" className="text-primary fw-medium small text-decoration-none hover-underline">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register