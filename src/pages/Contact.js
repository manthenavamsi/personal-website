import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section className="container" style={{ marginTop: '150px' }}>
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
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <input 
                type="email" 
                id="email" 
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                id="subject" 
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea 
                id="message" 
                rows="4" 
                placeholder="Details"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-button">
              <button type="submit" className="submit-btn">Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
