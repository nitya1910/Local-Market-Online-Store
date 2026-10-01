import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = 5.00;
  const totalPrice = itemsPrice + shippingPrice;

  const submitHandler = async (e) => {
    e.preventDefault();
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
      clearCart();
      alert(`Order placed successfully! Order ID: ${data._id}`);
      navigate('/customer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error placing order');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      <div style={{ flex: '1 1 500px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Shipping Details</h2>
        {error && <div style={{ background: 'var(--error)', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={submitHandler} className="card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Address</label>
            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>City</label>
              <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Postal Code</label>
              <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Country</label>
            <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
            <input type="text" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Place Order</button>
        </form>
      </div>
      
      <div style={{ flex: '1 1 300px' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Order Items</h3>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.name} x {item.qty}</span>
              <span>${(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <span>Shipping</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
