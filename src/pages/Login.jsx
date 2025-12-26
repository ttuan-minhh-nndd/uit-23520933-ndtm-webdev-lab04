import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const usernameInputRef = useRef(null);

  // useEffect: Focus on username input when component mounts
  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  // useEffect: Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Simulate login - in a real app, you'd validate against a backend
    if (password.length >= 6) {
      login({ username, email: `${username}@blogdash.com` });
      navigate('/dashboard');
    } else {
      setError('Password must be at least 6 characters');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Blog Dash</h1>
        <p className="subtitle">Welcome back! Please login to continue.</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              ref={usernameInputRef}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>

          <p className="hint">
            Hint: Use any username and password with 6+ characters
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
