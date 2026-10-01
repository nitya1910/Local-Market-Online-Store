import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 400px' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '0.5rem', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem' }}>{product.name}</h2>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>Vendor: {product.vendor?.storeName || 'Local Vendor'}</p>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>${product.price}</h3>
        <p style={{ lineHeight: '1.6' }}>{product.description}</p>
        
        <div className="card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>Status:</span>
            <span style={{ fontWeight: 'bold' }}>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          
          {product.countInStock > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span>Qty:</span>
              <select value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ padding: '0.5rem', borderRadius: '0.25rem' }}>
                {[...Array(product.countInStock).keys()].map(x => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}
          
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={product.countInStock === 0}
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
