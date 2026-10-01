import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Have questions or feedback? We'd love to hear from you. Reach out using the form below or our contact details.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Contact Info */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.75rem', borderRadius: '50%' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Our Office</h3>
              <p style={{ color: 'var(--text-light)' }}>123 Market Street, Suite 400<br/>San Francisco, CA 94103</p>
            </div>
          </div>
          <div className="card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', animationDelay: '0.1s' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.75rem', borderRadius: '50%' }}>
              <Phone size={24} />
            </div>
            <div>
              <h3 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Call Us</h3>
              <p style={{ color: 'var(--text-light)' }}>+1 (555) 123-4567<br/>Mon-Fri, 9am - 6pm</p>
            </div>
          </div>
          <div className="card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', animationDelay: '0.2s' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.75rem', borderRadius: '50%' }}>
              <Mail size={24} />
            </div>
            <div>
              <h3 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Email Us</h3>
              <p style={{ color: 'var(--text-light)' }}>support@discoverfresh.com<br/>partners@discoverfresh.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card animate-fade-in" style={{ flex: '1 1 400px', padding: '2rem', animationDelay: '0.3s' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Send a Message</h2>
          {submitted && (
            <div style={{ padding: '1rem', background: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: '0.5rem', marginBottom: '1.5rem', fontWeight: '500' }}>
              Thank you! Your message has been sent successfully.
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} 
                placeholder="Your name"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} 
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
              <textarea 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="4" 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', resize: 'vertical' }} 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
