import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

 // Set default Axios configurations
axios.defaults.baseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://resolveit-ygvi.onrender.com' : 'http://localhost:5000');
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ccms_token'));
  const [loading, setLoading] = useState(true);

   // Set default auth headers for Axios
    useEffect(() => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('ccms_token', token);
      } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('ccms_token');
      }
    }, [token]);
   
     // Load user data on startup if token exists
    useEffect(() => {
      const fetchUserData = async () => {
        if (!token) {
          setLoading(false);
          return;
        }
        try {
          const res = await axios.get('/api/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Failed to load user profile:', err.message);
          // Clear token if invalid/expired
          setToken(null);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }, [token]);

    // Login handler
    const login = async (email, password) => {
      setLoading(true);
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        setToken(res.data.token);
        setUser({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        });
        return { success: true };
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    };

    // Register handler
    const register = async (name, email, password, role) => {
      setLoading(true);
      try {
        const res = await axios.post('/api/auth/register', { name, email, password, role });
        setToken(res.data.token);
        setUser({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        });
        return { success: true };
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    };

     // Logout handler
    const logout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('ccms_token');
    };

    // Update Profile handler
  const updateProfile = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axios.put('/api/auth/profile', { name, email, password });
      setToken(res.data.token);
      setUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role
      });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Update failed. Please try again.';
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete Account handler
  const deleteAccount = async () => {
    setLoading(true);
    try {
      await axios.delete('/api/auth/profile');
      logout();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Account deletion failed. Please try again.';
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
        value={{
          user,
          token,
          loading,
          login,
          register,
          logout,
          updateProfile,
          deleteAccount,
          isAuthenticated: !!user
        }}
      >
        {children}
      </AuthContext.Provider>
  )
}
export default AuthContext