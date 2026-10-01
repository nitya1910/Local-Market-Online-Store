import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, CreditCard, ArrowLeft, Heart, ShieldCheck, Truck } from 'lucide-react';
import CartContext from '../context/CartContext';
import AppContext from '../context/AppContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        // Mock fallback for presentation
        console.warn('API Failed, using mock data for product details');
        setProduct({
          _id: id,
          name: 'Premium Organic Selection',
          price: 24.99,
          description: 'Experience the finest quality with our premium organic selection. Sourced directly from local sustainable farms, these products guarantee freshness and unparalleled taste. Perfect for your daily nutrition and a healthy lifestyle.',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
          category: 'Organic Products',
          vendor: { storeName: 'Green Valley Farms' },
          rating: 4.8,
          numReviews: 42,
          countInStock: 15
        });
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    // don't navigate immediately to allow multiple additions, or navigate to cart based on preference
  };

  const buyNowHandler = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ width: '50px', height: '50px', border: '5px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    </div>
  );
  
  if (error && !product) return (
    <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--error)' }}>{error}</h2>
      <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Shop</button>
    </div>
  );

  const isWishlisted = wishlist.some(w => w._id === product._id);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', marginBottom: '2rem', fontSize: '1rem', fontWeight: '500' }}>
        <ArrowLeft size={20} /> Back to Products
      </button>

      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }} className="product-details-layout">
        <style>{`
          .product-image-container { flex: 1 1 100%; max-width: 100%; border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow-md); position: relative; }
          .product-info-container { flex: 1 1 100%; max-width: 100%; display: flex; flexDirection: column; gap: 1.5rem; }
          @media (min-width: 992px) {
            .product-image-container { flex: 1 1 50%; max-width: 50%; }
            .product-info-container { flex: 1 1 45%; max-width: 45%; }
          }
        `}</style>

        {/* Product Image */}
        <div className="product-image-container animate-fade-in" style={{ overflow: 'hidden' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} 
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <button 
            onClick={() => toggleWishlist(product)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'white', padding: '0.75rem', borderRadius: '50%', color: isWishlisted ? 'var(--primary)' : 'var(--text-light)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)', transition: 'transform 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Product Info */}
        <div className="product-info-container animate-slide-up">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ background: 'var(--surface)', color: 'var(--primary-dark)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', border: '1px solid var(--border)' }}>
                {product.category}
              </span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text)', lineHeight: '1.2', marginBottom: '0.5rem' }}>{product.name}</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
              Sold by <Link to="/vendors" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>{product.vendor?.storeName || 'Local Vendor'}</Link>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '1.1rem' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill={product.rating >= 4.5 ? "currentColor" : "none"} size={20} />
            </div>
            <span style={{ fontWeight: '600', color: 'var(--text)' }}>{product.rating || '4.5'}</span>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>({product.numReviews || 0} customer reviews)</span>
          </div>

          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            ${product.price?.toFixed(2)}
            {product.countInStock > 0 ? (
              <span style={{ fontSize: '0.9rem', padding: '0.3rem 0.8rem', background: 'var(--success)', color: 'white', borderRadius: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldCheck size={16} /> In Stock ({product.countInStock} available)
              </span>
            ) : (
              <span style={{ fontSize: '0.9rem', padding: '0.3rem 0.8rem', background: 'var(--error)', color: 'white', borderRadius: '20px', fontWeight: '600' }}>Out of Stock</span>
            )}
          </div>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
            {product.description}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {product.countInStock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))} 
                    style={{ padding: '0.5rem 1rem', background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
                  >-</button>
                  <span style={{ padding: '0.5rem 1rem', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>{qty}</span>
                  <button 
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))} 
                    style={{ padding: '0.5rem 1rem', background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
                  >+</button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={addToCartHandler} 
                disabled={product.countInStock === 0}
                className="btn btn-outline" 
                style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1.1rem', borderWidth: '2px' }}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button 
                onClick={buyNowHandler}
                disabled={product.countInStock === 0}
                className="btn btn-primary" 
                style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1.1rem' }}
              >
                <CreditCard size={20} /> Buy Now
              </button>
            </div>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text)' }}>
              <Truck size={24} color="var(--primary)" />
              <span style={{ fontWeight: '500' }}>Local Delivery Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text)' }}>
              <ShieldCheck size={24} color="var(--primary)" />
              <span style={{ fontWeight: '500' }}>Freshness Guaranteed</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
