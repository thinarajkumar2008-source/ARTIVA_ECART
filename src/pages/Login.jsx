import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Palette, Eye, EyeOff, LogIn, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(email, password);
      addToast(`Welcome back, ${user.name}!`, 'success');
      navigate('/orders');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('artlover@example.com');
    setPassword('secret123');
    setIsLoading(true);
    try {
      const user = await login('artlover@example.com', 'secret123');
      addToast(`Signed in with Demo Collector account!`, 'success');
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem 1.5rem', maxWidth: '480px' }}>
      <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '24px', border: '1px solid #EFE7E2', boxShadow: '0 12px 32px rgba(39, 33, 60, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/logo.png" 
            alt="ARTIVA Logo" 
            style={{ width: '68px', height: '68px', objectFit: 'cover', borderRadius: '16px', margin: '0 auto 1rem auto', display: 'block', boxShadow: '0 6px 18px rgba(108, 43, 217, 0.25)', border: '2px solid #FFFFFF' }}
          />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#27213C' }}>Welcome to ARTIVA</h1>
          <p style={{ color: '#777386', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Sign in to track your handmade orders and manage your saved wishlist.
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="e.g. artlover@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" htmlFor="login-password" style={{ margin: 0 }}>Password</label>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#777386' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={isLoading}
            style={{ marginTop: '1.5rem' }}
          >
            <LogIn size={18} />
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Quick Demo Login Helper */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #EFE7E2', textAlign: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary btn-full btn-sm"
            onClick={handleQuickDemoLogin}
          >
            <CheckCircle2 size={16} color="#059669" />
            <span>One-Click Demo Account Login</span>
          </button>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.88rem', color: '#777386' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: '#6C2BD9', fontWeight: 700 }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
