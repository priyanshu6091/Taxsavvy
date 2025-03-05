import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/slices/authSlice';
import { authApi } from '../../services/api';
import toast from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    taxId: '',
    industry: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email?.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.taxId) {
      newErrors.taxId = 'Tax ID is required';
    }
    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const { data } = await authApi.register(formData);
      dispatch(setAuth(data));
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      if (error.response?.data?.error) {
        console.error('Detailed error:', error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your company
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  className="input-field"
                  onChange={handleChange}
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  className="input-field"
                  onChange={handleChange}
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="input-field"
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="input-field"
                onChange={handleChange}
              />
            </div>

            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company Information</h3>
              <input
                name="companyName"
                type="text"
                placeholder="Company Name"
                required
                className="input-field"
                onChange={handleChange}
              />
              <input
                name="taxId"
                type="text"
                placeholder="Tax ID"
                required
                className="input-field"
                onChange={handleChange}
              />
              <select
                name="industry"
                required
                className="input-field"
                onChange={handleChange}
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
              </select>
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="input-field"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
