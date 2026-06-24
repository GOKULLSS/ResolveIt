import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, deleteAccount } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email) {
      setError('Name and Email are required.');
      return;
    }

    if (password) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);
    const result = await updateProfile(name, email, password || undefined);
    setIsLoading(false);

    if (result.success) {
      setSuccess('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } else {
      setError(result.error);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.toLowerCase() !== 'delete') {
      setError('Please type DELETE to confirm account deletion.');
      setShowDeleteModal(false);
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);
    const result = await deleteAccount();
    setIsLoading(false);

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
      setShowDeleteModal(false);
    }
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 fade-in-up">
          
          {/* Header Card */}
          <div className="card glass-panel p-4 mb-4">
            <div className="d-flex flex-column flex-sm-row align-items-center gap-4">
              <div className="d-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary rounded-circle" style={{ width: '80px', height: '80px', minWidth: '80px' }}>
                <i className="bi bi-person-circle" style={{ fontSize: '3rem' }}></i>
              </div>
              <div className="text-center text-sm-start flex-grow-1">
                <h3 className="fw-bold text-light mb-1">{user.name}</h3>
                <p className="text-secondary mb-2">{user.email}</p>
                <span className={`badge rounded-pill ${user.role === 'Admin' ? 'bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50' : 'bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50'} px-3 py-1.5`} style={{ fontSize: '0.8rem' }}>
                  {user.role} Portal Access
                </span>
              </div>
            </div>
          </div>

          {/* Error and Success Alerts */}
          {error && (
            <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-0 d-flex align-items-center gap-2 mb-4" role="alert" style={{ borderRadius: '8px' }}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>{error}</div>
            </div>
          )}
          {success && (
            <div className="alert alert-success bg-success bg-opacity-10 text-success border-0 d-flex align-items-center gap-2 mb-4" role="alert" style={{ borderRadius: '8px' }}>
              <i className="bi bi-check-circle-fill"></i>
              <div>{success}</div>
            </div>
          )}

          {/* Form and Danger Zone Grid */}
          <div className="card glass-panel p-4 p-md-5 mb-4">
            <h4 className="fw-bold text-light mb-4">
              <i className="bi bi-gear-fill text-primary me-2"></i>Edit Profile Details
            </h4>
            
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="profileName" className="form-label text-secondary small fw-medium">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input border-start-0"
                      id="profileName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="profileEmail" className="form-label text-secondary small fw-medium">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control custom-input border-start-0"
                      id="profileEmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-top border-opacity-5 my-4" style={{ borderColor: 'var(--border-color)' }}></div>

              <h5 className="fw-bold text-light mb-3">
                <i className="bi bi-shield-lock-fill text-primary me-2"></i>Change Password <span className="text-secondary fw-normal fs-6">(Optional)</span>
              </h5>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="profilePassword" className="form-label text-secondary small fw-medium">New Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      <i className="bi bi-key"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control custom-input border-start-0"
                      id="profilePassword"
                      placeholder="Leave blank to keep current"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="profileConfirmPassword" className="form-label text-secondary small fw-medium">Confirm New Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 border-opacity-10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      <i className="bi bi-key-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control custom-input border-start-0"
                      id="profileConfirmPassword"
                      placeholder="Leave blank to keep current"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary-gradient px-4 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-2"></i>Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="card glass-panel border border-danger border-opacity-20 p-4 p-md-5">
            <h4 className="fw-bold text-danger mb-3">
              <i className="bi bi-exclamation-octagon-fill me-2"></i>Danger Zone
            </h4>
            <p className="text-secondary small mb-4">
              Once you delete your account, there is no going back. All of your submitted complaints, details, and associations will be permanently removed.
            </p>
            <div className="d-flex justify-content-start">
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmText('');
                  setShowDeleteModal(true);
                }}
                className="btn btn-outline-danger px-4 py-2 fw-medium"
                style={{ borderRadius: '8px' }}
                disabled={isLoading}
              >
                <i className="bi bi-trash3 me-2"></i>Delete My Account
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {showDeleteModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ 
            backgroundColor: 'rgba(5, 7, 12, 0.85)', 
            backdropFilter: 'blur(8px)', 
            zIndex: 1050 
          }}
        >
          <div className="col-11 col-md-6 col-lg-5">
            <div className="card glass-panel border border-danger border-opacity-35 p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="d-inline-flex justify-content-center align-items-center bg-danger bg-opacity-10 text-danger rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-exclamation-triangle fs-2"></i>
                </div>
                <h4 className="fw-bold text-light">Delete Account Permanently?</h4>
                <p className="text-secondary small">
                  This action is irreversible. All your account information and associated complaints will be destroyed.
                </p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="confirmDeleteText" className="form-label text-secondary small fw-medium">
                  Type <span className="text-danger fw-bold">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  className="form-control custom-input text-center font-monospace"
                  id="confirmDeleteText"
                  placeholder="Type DELETE here"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="btn btn-outline-light px-4 py-2"
                  style={{ borderRadius: '8px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="btn btn-danger px-4 py-2 fw-medium"
                  style={{ borderRadius: '8px' }}
                  disabled={deleteConfirmText.toLowerCase() !== 'delete'}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
