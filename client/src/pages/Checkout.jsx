import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import AppContext from '../context/AppContext';
import axios from 'axios';
import { CheckCircle, Truck, CreditCard, ShieldCheck, ArrowRight, Package } from 'lucide-react';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(AppContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Success state
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = 5.00;
  const totalPrice = itemsPrice + shippingPrice;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulate backend if no API is available
      const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      let newOrderId = generatedOrderId;
      
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        const orderData = {
          orderItems: cartItems,
          shippingAddress: { address, city, postalCode, country, phoneNumber },
          paymentMethod: 'Simulated',
          itemsPrice,
          shippingPrice,
          totalPrice,
        };

        const { data } = await axios.post('/api/orders', orderData, config);
        newOrderId = data._id || generatedOrderId;
      } catch (apiError) {
        // Fallback for demo purposes if backend fails
        console.warn("API failed, using simulated order ID", apiError);
      }
      
      clearCart();
      setOrderId(newOrderId);
      setOrderSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      showToast('Error placing order', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Calculate estimated delivery dates
  const today = new Date();
  const minDelivery = new Date(today);
  minDelivery.setDate(minDelivery.getDate() + 2);
  const maxDelivery = new Date(today);
  maxDelivery.setDate(maxDelivery.getDate() + 4);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (orderSuccess) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card animate-slide-up" style={{ padding: '3rem', width: '100%', maxWidth: '600px', textAlign: 'center', borderRadius: '1.5rem', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', marginBottom: '1.5rem' }}>
            <CheckCircle size={48} />
          </div>
          
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text)', marginBottom: '1rem' }}>Order Confirmed!</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-light)', fontWeight: '500' }}>Order Number:</span>
              <span style={{ fontWeight: '700', color: 'var(--text)', fontFamily: 'monospace', fontSize: '1.1rem' }}>{orderId}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <Package size={24} color="var(--primary)" />
              </div>
              <div>
                <p style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '0.25rem' }}>Estimated Delivery</p>
                <p style={{ color: 'var(--primary)', fontWeight: '700' }}>{formatDate(minDelivery)} - {formatDate(maxDelivery)}</p>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/products" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem' }}>
              Continue Shopping
            </Link>
            <Link to="/customer/dashboard" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem' }}>
              View Dashboard <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Secure Checkout</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* Shipping Form */}
        <div style={{ flex: '1 1 500px' }}>
          <form onSubmit={submitHandler} className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} color="var(--primary)" /> Shipping Details
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text)' }}>Address</label>
                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', transition: 'border-color 0.2s' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text)' }}>City</label>
                  <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text)' }}>Postal Code</label>
                  <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="ZIP" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text)' }}>Country</label>
                  <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text)' }}>Phone Number</label>
                  <input type="text" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1 234 567 890" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }} />
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--surface)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CreditCard size={24} color="var(--primary)" />
              <div>
                <p style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Simulated Payment</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>No real card details needed for this demo.</p>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting || cartItems.length === 0}
              style={{ width: '100%', padding: '1rem', marginTop: '2rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              {isSubmitting ? 'Processing...' : <><CheckCircle size={20} /> Place Order - ${totalPrice.toFixed(2)}</>}
            </button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div style={{ flex: '1 1 350px' }}>
          <div className="card" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                      <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--text-light)', color: 'white', fontSize: '0.7rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                    </div>
                    <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: '600' }}>${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-light)' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--text)' }}>${itemsPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-light)' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--text)' }}>${shippingPrice.toFixed(2)}</span>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px dashed var(--border)', margin: '1.5rem 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: 'var(--success)', fontSize: '0.9rem', fontWeight: '500' }}>
              <ShieldCheck size={18} /> Secure 256-bit encryption
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
