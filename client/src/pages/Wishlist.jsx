import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HeartCrack, ShoppingCart, Star, Trash2 } from 'lucide-react';
import AppContext from '../context/AppContext';
import CartContext from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product); // Remove from wishlist after moving to cart
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>My Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--surface)', borderRadius: '1rem' }}>
          <HeartCrack size={64} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Your wishlist is empty</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Explore our fresh products and add your favorites here!</p>
          <Link to="/products" className="btn btn-primary" style={{ display: 'inline-block' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {wishlist.map((product, i) => (
            <div key={product._id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', animationDelay: `${0.05 * i}s` }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <Link to={`/product/${product._id}`} style={{ display: 'block', height: '100%' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>
                <button 
                  onClick={() => toggleWishlist(product)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '50%', color: 'var(--error)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Link to={`/product/${product._id}`}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text)', lineHeight: '1.3', marginBottom: '0.5rem' }}>{product.name}</h3>
                </Link>
                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  By <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{product.vendor?.storeName || 'Local Vendor'}</span>
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '1rem', color: '#fbbf24' }}>
                  <Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star size={14} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--text)' }}>${product.price?.toFixed(2)}</span>
                  <button onClick={() => handleMoveToCart(product)} className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Move to Cart">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
