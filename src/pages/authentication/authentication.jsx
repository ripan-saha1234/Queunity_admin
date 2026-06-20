import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../../context/context';
import { login } from '../../api/auth';
import { useToast } from '../../components/toast/ToastProvider';
import './authentication.css';

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function Authentication() {
  const navigate = useNavigate();
  const { setUser } = useContext(globalContext);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { username: '', password: '', general: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ username: '', password: '', general: '' });

    try {
      const data = await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      const user = {
        id: null,
        name: data.name,
        firstName: data.name,
        lastName: '',
        email: formData.username.trim(),
        phone: '',
        roles: ['admin'],
        image: '/avatar.svg',
      };

      setUser(user);
      showToast(data.message || 'Login successful', 'success');
      navigate('/staffs');
    } catch (error) {
      console.error('Login error:', error);

      const message = error.message || 'Network error. Please check your connection and try again.';

      setErrors(prev => ({
        ...prev,
        general: message,
      }));
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="authentication-container">
      <div className="authentication-container-content">

        <div className="authentication-container-content-header">
          <div>
            <h1>Hello Admin!</h1>
            <h2>Welcome Back</h2>
          </div>
          <img src="/queunity_logo.svg" alt="logo" />
        </div>

        {errors.general && (
          <div className="authentication-error-message">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="authentication-container-content-input">
            <label htmlFor="username">
              Username<span className="required-star">*</span>
            </label>
            <div className="authentication-input-wrapper">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={errors.username ? 'authentication-input-error-border' : ''}
              />
            </div>
            {errors.username && (
              <span className="authentication-input-error">{errors.username}</span>
            )}
          </div>

          <div className="authentication-container-content-input">
            <label htmlFor="password">Password</label>
            <div className="authentication-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{ paddingRight: '44px' }}
                className={errors.password ? 'authentication-input-error-border' : ''}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(prev => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && (
              <span className="authentication-input-error">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="authentication-container-content-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Authentication;
