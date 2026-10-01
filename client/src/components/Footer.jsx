import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: '#f8fafc', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>LocalMarket</h3>
          <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Empowering local farmers, artisans, and creators. Get fresh, organic, and handcrafted products delivered directly to your door.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: '#cbd5e1', hover: { color: 'white' } }}><Facebook size={20} /></a>
            <a href="#" style={{ color: '#cbd5e1', hover: { color: 'white' } }}><Twitter size={20} /></a>
            <a href="#" style={{ color: '#cbd5e1', hover: { color: 'white' } }}><Instagram size={20} /></a>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.2rem' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/about" style={{ color: '#cbd5e1' }}>About Us</Link></li>
            <li><Link to="/products" style={{ color: '#cbd5e1' }}>Shop Now</Link></li>
            <li><Link to="/vendors" style={{ color: '#cbd5e1' }}>Our Vendors</Link></li>
            <li><Link to="/faq" style={{ color: '#cbd5e1' }}>FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.2rem' }}>Customer Service</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/contact" style={{ color: '#cbd5e1' }}>Contact Us</Link></li>
            <li><Link to="/returns" style={{ color: '#cbd5e1' }}>Returns & Exchanges</Link></li>
            <li><Link to="/shipping" style={{ color: '#cbd5e1' }}>Shipping Policy</Link></li>
            <li><Link to="/privacy" style={{ color: '#cbd5e1' }}>Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.2rem' }}>Contact Info</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#cbd5e1' }}>
              <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />
              <span>123 Market Street, Suite 100<br/>San Francisco, CA 94103</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
              <Phone size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span>(555) 123-4567</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
              <Mail size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span>support@localmarket.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} LocalMarket. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>Secure Payments</span>
          {/* Mock payment icons could go here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
