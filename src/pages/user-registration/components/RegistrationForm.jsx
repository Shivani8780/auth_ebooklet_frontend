import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import { backendBaseUrl } from '../../../config/backend';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    memberID: '',
    ebooklets: []
  });

  const [ebooklets, setEbooklets] = useState([]);
  const [selectedEbooklet, setSelectedEbooklet] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`${backendBaseUrl}/api/ebooklets/`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ebooklets: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => setEbooklets(data))
      .catch(err => {
        console.error('Fetch ebooklets error:', err);
        alert('Error loading ebooklets: ' + err.message);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'ebooklets') {
      setSelectedEbooklet(value);
      setFormData(prev => ({
        ...prev,
        ebooklets: [value]
      }));
      if (errors.ebooklets) {
        setErrors(prev => ({
          ...prev,
          ebooklets: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
    if (!formData.memberID.trim()) newErrors.memberID = 'Member ID is required';
    if (formData.ebooklets.length === 0) newErrors.ebooklets = 'Please select at least one ebooklet';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCSRFToken = () => {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${backendBaseUrl}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken()
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/user-login');
      } else {
        let data = {};
        try {
          data = await response.json();
        } catch {
          data = { error: 'No details provided' };
        }
        let errorMessages = '';
        for (const key in data) {
          errorMessages += `${key}: ${Array.isArray(data[key]) ? data[key].join(', ') : data[key]}\n`;
        }
        alert('Registration failed:\n' + errorMessages);
      }
    } catch (error) {
      console.error('Registration fetch error:', error);
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <StyledWrapper>
      <Header />
      <div className="container">
        <div className="heading">Sign Up</div>
        <form onSubmit={handleSubmit} className="form" noValidate>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            className="input"
            type="tel"
            name="phone_number"
            placeholder="Phone Number (unique, only once)"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
          {errors.phone_number && <p className="error">{errors.phone_number}</p>}

          <input
            className="input"
            type="text"
            name="memberID"
            placeholder="Member ID (unique, only once)"
            value={formData.memberID}
            onChange={handleInputChange}
            required
          />
          {errors.memberID && <p className="error">{errors.memberID}</p>}

          <div className="ebooklet-selection">
            <label>Select Ebooklet:</label>
            {ebooklets.length === 0 && <p>Loading ebooklets...</p>}
            <select
              name="ebooklets"
              value={selectedEbooklet}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #12B1D1',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              <option value="" disabled>
                -- Select an ebooklet --
              </option>
              {ebooklets.map((ebooklet) => (
                <option key={ebooklet.id} value={ebooklet.id.toString()}>
                  {ebooklet.name}
                </option>
              ))}
            </select>
            {errors.ebooklets && <p className="error">{errors.ebooklets}</p>}

            {selectedEbooklet && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '10px 15px',
                  backgroundColor: '#e0f0ff',
                  border: '1px solid #12B1D1',
                  borderRadius: '8px',
                  color: '#1089d3',
                  fontWeight: '600',
                  fontSize: '16px',
                  boxShadow: '0 2px 6px rgba(18, 177, 209, 0.4)',
                  userSelect: 'none',
                }}
              >
                Selected Ebooklet:{' '}
                {ebooklets.find(e => e.id.toString() === selectedEbooklet)?.name || ''}
              </div>
            )}
          </div>

          <input className="login-button" type="submit" value="Create Account" />
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 350px;
    width: 90%;
    background: #f8f9fd;
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid #fff;
    box-shadow: rgba(133, 189, 215, 0.88) 0px 30px 30px -20px;
    margin: 100px auto;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: #1089d3;
  }

  .form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .input:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

  .error {
    color: #dc2626;
    font-size: 0.75rem;
    margin-top: -10px;
    margin-bottom: 10px;
  }

  .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, #1089d3 0%, #12b1d1 100%);
    color: white;
    padding-block: 15px;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.88) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.88) 0px 23px 10px -20px;
  }

  .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.88) 0px 15px 10px -10px;
  }

  .ebooklet-selection {
    margin-top: 10px;
    background: #f0f7ff;
    border: 1px solid #12b1d1;
    border-radius: 12px;
    padding: 15px 20px;
  }

  .ebooklet-selection label {
    font-weight: 600;
    color: #1089d3;
    margin-bottom: 8px;
    display: block;
  }
`;

export default RegistrationForm;
