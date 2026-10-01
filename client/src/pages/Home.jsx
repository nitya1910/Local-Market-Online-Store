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
        setProducts(data.slice(0, 8)); // Show 8 latest products
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 1, name: 'Fresh Produce', icon: '🍅', color: '#fef2f2' },
    { id: 2, name: 'Bakery', icon: '🥖', color: '#fffbeb' },
    { id: 3, name: 'Dairy', icon: '🥛', color: '#f0fdfa' },
    { id: 4, name: 'Handcrafted', icon: '🏺', color: '#f5f3ff' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        color: 'white', 
        padding: '6rem 1.5rem', 
        textAlign: 'center',
        marginBottom: '4rem',
        clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract background shapes */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '-10%', width: '400px', height: '400px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
        
        <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            Discover Fresh & Local
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, fontWeight: '300' }}>
            Support your community by shopping directly from neighborhood artisans, farmers, and creators.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/products" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
              Explore Market
            </Link>
            <Link to="/register" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white', padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Categories Section */}
        <section className="animate-fade-in" style={{ marginBottom: '5rem', animationDelay: '0.2s', animationFillMode: 'both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Shop by Category</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {categories.map(cat => (
              <div key={cat.id} className="card" style={{ 
                background: cat.color, 
                padding: '2rem', 
                textAlign: 'center', 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '3rem' }}>{cat.icon}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text)' }}>{cat.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Trending Near You</h2>
              <p style={{ color: 'var(--text-light)' }}>Hand-picked local favorites just for you.</p>
            </div>
            <Link to="/products" style={{ color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View all products &rarr;
            </Link>
          </div>
          
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {products.map((product, i) => (
                <div key={product._id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', animationDelay: \`\${0.1 * i}s\`, animationFillMode: 'both' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', backdropFilter: 'blur(4px)' }}>
                      New
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text)', lineHeight: '1.3' }}>{product.name}</h3>
                      <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--primary)' }}>${product.price}</span>
                    </div>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>🏪</span> {product.vendor?.storeName || 'Local Vendor'}
                    </p>
                    <div style={{ marginTop: 'auto' }}>
                      <Link to={`/product/${product._id}`} className="btn btn-outline" style={{ width: '100%' }}>View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
