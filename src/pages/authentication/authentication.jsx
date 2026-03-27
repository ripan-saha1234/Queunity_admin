import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../../context/context';
import './authentication.css';

// Eye / EyeOff icons (inline SVG, no extra dependency)
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

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes
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

  // Validate form
  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ email: '', password: '', general: '' });

    try {
      const staticEmail = 'teddy@gmail.com';
      const staticPassword = '123456789';

      if (formData.email === staticEmail && formData.password === staticPassword) {
        const staticUser = {
          id: 1,
          name: 'Teddy',
          firstName: 'Teddy',
          lastName: '',
          email: staticEmail,
          phone: '',
          roles: ['admin'],
          image: '/avatar.svg'
        };

        localStorage.setItem('industrytuner admin token', JSON.stringify('static-admin-token'));
        localStorage.setItem('industrytuner admin user', JSON.stringify(staticUser));
        setUser(staticUser);
        navigate('/cases');
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Invalid email or password'
        }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Network error. Please check your connection and try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="authentication-container">
      <div className="authentication-container-content">

        {/* Header: title + logo */}
        <div className="authentication-container-content-header">
          <div>
            <h1>Hello Teddy!</h1>
            <h2>Welcome Back</h2>
          </div>
          <img src="/queunity_logo.svg" alt="logo" />
        </div>

        {/* General error */}
        {errors.general && (
          <div className="authentication-error-message">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="authentication-container-content-input">
            <label htmlFor="email">
              Email<span className="required-star">*</span>
            </label>
            <div className="authentication-input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'authentication-input-error-border' : ''}
              />
            </div>
            {errors.email && (
              <span className="authentication-input-error">{errors.email}</span>
            )}
          </div>

          {/* Password */}
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