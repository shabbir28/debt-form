import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    totalDebt: '',
    creditCardDebt: '',
    personalLoanDebt: '',
    otherDebt: '',
    employed: '',
    bankruptcy: '',
    monthlyIncome: '',
    state: '',
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.totalDebt) newErrors.totalDebt = 'Total debt is required';
    if (!formData.creditCardDebt) newErrors.creditCardDebt = 'Credit card debt is required';
    if (!formData.personalLoanDebt) newErrors.personalLoanDebt = 'Personal loan debt is required';
    if (!formData.otherDebt) newErrors.otherDebt = 'Other debt is required';
    if (!formData.employed) newErrors.employed = 'Employment status is required';
    if (!formData.bankruptcy) newErrors.bankruptcy = 'Bankruptcy status is required';
    if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          totalDebt: '',
          creditCardDebt: '',
          personalLoanDebt: '',
          otherDebt: '',
          employed: '',
          bankruptcy: '',
          monthlyIncome: '',
          state: '',
          agreeToTerms: false,
        });
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
  };

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Thank You!</h1>
          <p>A debt specialist will contact you shortly.</p>
          <button onClick={() => setShowSuccess(false)} className="btn-primary">
            Submit Another Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Struggling With Debt? See If You Qualify for Relief</h1>
          <p className="hero-subtitle">Check your eligibility in under 60 seconds</p>
          <button onClick={scrollToForm} className="btn-cta">
            Check My Eligibility
          </button>
        </div>
        <div className="hero-decoration"></div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="form-section">
        <div className="form-container">
          <h2 className="form-title">Debt Relief Qualification Form</h2>
          <form onSubmit={handleSubmit} className="debt-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="John Doe"
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="john@example.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            {/* Total Debt */}
            <div className="form-group">
              <label htmlFor="totalDebt">Total Unsecured Debt *</label>
              <input
                type="number"
                id="totalDebt"
                name="totalDebt"
                value={formData.totalDebt}
                onChange={handleChange}
                className={errors.totalDebt ? 'error' : ''}
                placeholder="50000"
                min="0"
              />
              {errors.totalDebt && <span className="error-text">{errors.totalDebt}</span>}
            </div>

            {/* Credit Card Debt */}
            <div className="form-group">
              <label htmlFor="creditCardDebt">Credit Card Debt *</label>
              <input
                type="number"
                id="creditCardDebt"
                name="creditCardDebt"
                value={formData.creditCardDebt}
                onChange={handleChange}
                className={errors.creditCardDebt ? 'error' : ''}
                placeholder="20000"
                min="0"
              />
              {errors.creditCardDebt && <span className="error-text">{errors.creditCardDebt}</span>}
            </div>

            {/* Personal Loan Debt */}
            <div className="form-group">
              <label htmlFor="personalLoanDebt">Personal Loan Debt *</label>
              <input
                type="number"
                id="personalLoanDebt"
                name="personalLoanDebt"
                value={formData.personalLoanDebt}
                onChange={handleChange}
                className={errors.personalLoanDebt ? 'error' : ''}
                placeholder="15000"
                min="0"
              />
              {errors.personalLoanDebt && <span className="error-text">{errors.personalLoanDebt}</span>}
            </div>

            {/* Other Debt */}
            <div className="form-group">
              <label htmlFor="otherDebt">Other Debt *</label>
              <input
                type="number"
                id="otherDebt"
                name="otherDebt"
                value={formData.otherDebt}
                onChange={handleChange}
                className={errors.otherDebt ? 'error' : ''}
                placeholder="5000"
                min="0"
              />
              {errors.otherDebt && <span className="error-text">{errors.otherDebt}</span>}
            </div>

            {/* Employment Status */}
            <div className="form-group">
              <label>Are you currently employed? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="employed"
                    value="yes"
                    checked={formData.employed === 'yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="employed"
                    value="no"
                    checked={formData.employed === 'no'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.employed && <span className="error-text">{errors.employed}</span>}
            </div>

            {/* Bankruptcy */}
            <div className="form-group">
              <label>Have you filed bankruptcy in last 7 years? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="bankruptcy"
                    value="yes"
                    checked={formData.bankruptcy === 'yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="bankruptcy"
                    value="no"
                    checked={formData.bankruptcy === 'no'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.bankruptcy && <span className="error-text">{errors.bankruptcy}</span>}
            </div>

            {/* Monthly Income */}
            <div className="form-group">
              <label htmlFor="monthlyIncome">Monthly Income *</label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className={errors.monthlyIncome ? 'error' : ''}
                placeholder="4000"
                min="0"
              />
              {errors.monthlyIncome && <span className="error-text">{errors.monthlyIncome}</span>}
            </div>

            {/* State */}
            <div className="form-group">
              <label htmlFor="state">State / Location *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
              >
                <option value="">Select your state</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </select>
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>

            {/* Terms Checkbox */}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span>I agree to Terms & Privacy Policy *</span>
              </label>
              {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Check My Qualification'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
