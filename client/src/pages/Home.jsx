import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.slice(0, 4)); // Show 4 latest products
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--primary)', color: 'white', borderRadius: '0.5rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Support Your Local Vendors</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Fresh produce, artisan goods, and more from your neighborhood.</p>
        <Link to="/products" className="btn" style={{ background: 'white', color: 'var(--primary)', fontSize: '1.1rem' }}>Shop Now</Link>
      </section>

      <section>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Featured Local Products</h2>
        {loading ? (
          <p>Loading products...</p>
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
      </section>
    </div>
  );
};

export default Home;
