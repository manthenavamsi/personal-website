import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Web3Forms access key loaded from environment variable (CWE-798)
  const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || '';

  // Security: Input length limits
  const MAX_LENGTHS = {
    firstName: 50,
    lastName: 50,
    email: 100,
    subject: 200,
    message: 5000
  };

  // Security: Sanitize input using allowlist approach instead of regex-based HTML stripping.
  // React auto-escapes JSX output, and data is sent as JSON to the API,
  // so we use allowlist character validation rather than blocklist filtering.
  const sanitizeInput = (input, fieldName) => {
    if (!input) return '';

    let sanitized = input;

    // For name fields: allowlist only letters, spaces, hyphens, apostrophes
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      sanitized = sanitized.replace(/[^a-zA-Z\s\-']/g, '');
    }

    // For email: allowlist only valid email characters
    if (fieldName === 'email') {
      sanitized = sanitized.replace(/[^a-zA-Z0-9.@_%+\-]/g, '');
    }

    // For subject: allowlist alphanumeric, spaces, and common punctuation
    if (fieldName === 'subject') {
      sanitized = sanitized.replace(/[^a-zA-Z0-9\s.,!?;:'"()\-]/g, '');
    }

    // For message: allowlist alphanumeric, spaces, and extended punctuation
    if (fieldName === 'message') {
      sanitized = sanitized.replace(/[^a-zA-Z0-9\s.,!?;:'"()\-@#$%&*/+=\n\r]/g, '');
    }

    // Trim whitespace
    sanitized = sanitized.trim();

    // Enforce max length
    if (MAX_LENGTHS[fieldName]) {
      sanitized = sanitized.substring(0, MAX_LENGTHS[fieldName]);
    }

    return sanitized;
  };

  // Security: Enhanced email validation
  const validateEmail = (email) => {
    // Check format
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) return false;

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /\.\./,  // consecutive dots
      /@.*@/,  // multiple @ symbols
      /^\./, // starts with dot
      /\.$/ // ends with dot
    ];

    return !suspiciousPatterns.some(pattern => pattern.test(email));
  };

  // Security: Since sanitizeInput uses allowlist validation, any characters
  // outside the allowed set are already stripped. This check verifies the
  // sanitized input matches expected patterns as a defense-in-depth measure.
  const containsSuspiciousContent = (text) => {
    // After allowlist sanitization, check if the result still looks reasonable
    // (e.g., not empty after stripping, not just whitespace)
    if (!text || !text.trim()) return false;
    // Check for excessively repeated characters (potential abuse)
    if (/(.)\1{50,}/.test(text)) return true;
    return false;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Sanitize input in real-time
    const sanitizedValue = sanitizeInput(value, id);

    setFormData(prevState => ({
      ...prevState,
      [id]: sanitizedValue
    }));

    // Clear error for this field when user starts typing
    if (fieldErrors[id]) {
      setFieldErrors(prev => ({ ...prev, [id]: '' }));
    }

    // Clear status message when user starts typing
    if (statusMessage.text) {
      setStatusMessage({ type: '', text: '' });
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const errors = { ...fieldErrors };

    // Validate on blur
    if (id === 'email' && value && !validateEmail(value)) {
      errors.email = 'Please enter a valid email address';
    }

    setFieldErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });
    setFieldErrors({});

    // Security: Rate limiting - prevent spam submissions
    const currentTime = Date.now();
    const timeSinceLastSubmit = currentTime - lastSubmitTime;
    const MIN_SUBMIT_INTERVAL = 10000; // 10 seconds between submissions

    if (timeSinceLastSubmit < MIN_SUBMIT_INTERVAL && lastSubmitTime !== 0) {
      setStatusMessage({
        type: 'error',
        text: 'Please wait a moment before submitting again.'
      });
      setIsSubmitting(false);

      setTimeout(() => {
        setStatusMessage({ type: '', text: '' });
      }, 5000);

      return;
    }

    // Client-side validation
    const errors = {};

    // Sanitize all inputs before validation
    const sanitizedData = {
      firstName: sanitizeInput(formData.firstName, 'firstName'),
      lastName: sanitizeInput(formData.lastName, 'lastName'),
      email: sanitizeInput(formData.email, 'email'),
      subject: sanitizeInput(formData.subject, 'subject'),
      message: sanitizeInput(formData.message, 'message')
    };

    // Validate required fields
    if (!sanitizedData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!sanitizedData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!sanitizedData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(sanitizedData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!sanitizedData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!sanitizedData.message.trim()) {
      errors.message = 'Message is required';
    } else if (sanitizedData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    // Security: Check for suspicious content
    if (containsSuspiciousContent(sanitizedData.message) ||
        containsSuspiciousContent(sanitizedData.subject)) {
      errors.message = 'Your message contains invalid content. Please remove any special characters or code.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatusMessage({
        type: 'error',
        text: 'Please fix the errors above and try again.'
      });

      setTimeout(() => {
        setStatusMessage({ type: '', text: '' });
      }, 7000);

      setIsSubmitting(false);
      return;
    }

    // Check if access key is configured
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatusMessage({
        type: 'error',
        text: 'Configuration error. Please contact me via LinkedIn.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
          email: sanitizedData.email,
          subject: sanitizedData.subject,
          message: sanitizedData.message,
          // Add honeypot field for bot detection (Web3Forms feature)
          botcheck: false
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update last submit time for rate limiting
        setLastSubmitTime(Date.now());

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
        setStatusMessage({
          type: 'success',
          text: 'Message sent successfully! I will get back to you soon.'
        });

        setTimeout(() => {
          setStatusMessage({ type: '', text: '' });
        }, 5000);
      } else {
        // Handle specific API errors
        let errorMsg = 'Failed to send message. Please try again.';

        if (result.message && result.message.toLowerCase().includes('spam')) {
          errorMsg = 'Your message was flagged as spam. Please use a different email address (e.g., Gmail, Outlook) or contact me via LinkedIn.';
        } else if (result.message) {
          errorMsg = result.message;
        }

        setStatusMessage({
          type: 'error',
          text: errorMsg
        });

        setTimeout(() => {
          setStatusMessage({ type: '', text: '' });
        }, 7000);
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });

      setTimeout(() => {
        setStatusMessage({ type: '', text: '' });
      }, 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container">
      <div className="contact-section">
        <div className="contact-message">
          <div className="contact-quote">
            Opinions and perspectives matter, they help challenge our assumptions. Let's connect and strengthen human connections in the age of AI.
          </div>
          <div className="contact-signature">
            <div>Peace <span className="peace-icon">✌</span></div>
            <div>- Vamsi</div>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldErrors.firstName ? 'input-error' : ''}
                  maxLength={MAX_LENGTHS.firstName}
                  required
                  autoComplete="given-name"
                />
                {fieldErrors.firstName && (
                  <span className="field-error-message">{fieldErrors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldErrors.lastName ? 'input-error' : ''}
                  maxLength={MAX_LENGTHS.lastName}
                  required
                  autoComplete="family-name"
                />
                {fieldErrors.lastName && (
                  <span className="field-error-message">{fieldErrors.lastName}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldErrors.email ? 'input-error' : ''}
                maxLength={MAX_LENGTHS.email}
                required
                autoComplete="email"
              />
              {fieldErrors.email && (
                <span className="field-error-message">{fieldErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldErrors.subject ? 'input-error' : ''}
                maxLength={MAX_LENGTHS.subject}
                required
                autoComplete="off"
              />
              {fieldErrors.subject && (
                <span className="field-error-message">{fieldErrors.subject}</span>
              )}
            </div>
            <div className="form-group">
              <textarea
                id="message"
                rows="4"
                placeholder="Details"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldErrors.message ? 'input-error' : ''}
                maxLength={MAX_LENGTHS.message}
                required
                autoComplete="off"
              ></textarea>
              {fieldErrors.message && (
                <span className="field-error-message">{fieldErrors.message}</span>
              )}
            </div>

            <div className="form-footer">
              {statusMessage.text && (
                <div className={`form-status-message ${statusMessage.type}`}>
                  {statusMessage.text}
                </div>
              )}
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
