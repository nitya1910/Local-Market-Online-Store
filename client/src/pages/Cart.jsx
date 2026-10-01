import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      <div style={{ flex: '1 1 600px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty. <Link to="/products" style={{ color: 'var(--primary)' }}>Go Back</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item) => (
              <div key={item.product} className="card" style={{ display: 'flex', alignItems: 'center', padding: '1rem', gap: '1rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                <div style={{ flex: 1 }}>
                  <Link to={`/product/${item.product}`} style={{ fontWeight: '500', fontSize: '1.1rem' }}>{item.name}</Link>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>${item.price}</div>
                </div>
                <div>
                  <select 
                    value={item.qty} 
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                    style={{ padding: '0.5rem', borderRadius: '0.25rem' }}
                  >
                    {[...Array(10).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => removeFromCart(item.product)} style={{ color: 'var(--error)' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div style={{ flex: '1 1 300px' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
              <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <span>Total</span>
              <span>${(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) + 5).toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem' }}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
