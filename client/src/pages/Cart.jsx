import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

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

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const total = subtotal + 5; // Flat $5 shipping

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--surface)', borderRadius: '1rem' }}>
          <ShoppingBag size={64} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Your cart is empty</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn-primary" style={{ display: 'inline-block' }}>Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
          
          {/* Cart Items */}
          <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map((item, i) => (
              <div key={item.product} className="card animate-fade-in" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', gap: '1.5rem', animationDelay: `${0.05 * i}s` }}>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                
                <div style={{ flex: 1 }}>
                  <Link to={`/product/${item.product}`} style={{ fontWeight: '700', fontSize: '1.15rem', color: 'var(--text)', textDecoration: 'none', marginBottom: '0.25rem', display: 'block' }}>{item.name}</Link>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Sold by <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{item.vendor?.storeName || 'Local Vendor'}</span></div>
                  <div style={{ color: 'var(--text)', fontSize: '1.1rem', fontWeight: '800' }}>${item.price?.toFixed(2)}</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <button 
                      onClick={() => addToCart(item, Math.max(1, item.qty - 1))}
                      style={{ padding: '0.4rem 0.8rem', background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
                    >-</button>
                    <span style={{ padding: '0.4rem 0.8rem', fontWeight: '600', minWidth: '35px', textAlign: 'center' }}>{item.qty}</span>
                    <button 
                      onClick={() => addToCart(item, Math.min(10, item.qty + 1))}
                      style={{ padding: '0.4rem 0.8rem', background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
                    >+</button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.product)} 
                    style={{ color: 'var(--error)', background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div style={{ flex: '1 1 350px' }}>
            <div className="card" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span style={{ color: 'var(--text)' }}>${subtotal.toFixed(2)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                <span>Shipping</span>
                <span style={{ color: 'var(--text)' }}>$5.00</span>
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px dashed var(--border)', margin: '1.5rem 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: '800', fontSize: '1.5rem', color: 'var(--text)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>${total.toFixed(2)}</span>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                onClick={checkoutHandler}
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <Link to="/products" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
