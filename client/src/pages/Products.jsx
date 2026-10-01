import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const search = useLocation().search;
  const keyword = new URLSearchParams(search).get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  return (
    <div className="container">
      <h2 style={{ marginBottom: '2rem' }}>Latest Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div style={{ background: 'var(--error)', color: 'white', padding: '1rem', borderRadius: '0.25rem' }}>{error}</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {products.map(product => (
            <div key={product._id} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.25rem', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>{product.vendor?.storeName || 'Local Vendor'}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>${product.price}</span>
                <Link to={`/product/${product._id}`} className="btn btn-primary" style={{ padding: '0.25rem 0.75rem' }}>View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
