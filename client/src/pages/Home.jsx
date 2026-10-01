import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, Leaf, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';
import CartContext from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.slice(0, 8));
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

  const vendors = [
    { id: 1, name: 'Green Valley Farms', type: 'Organic Produce', image: 'https://images.unsplash.com/photo-1595858602983-481d6d03d0d8?auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Sunny Side Bakery', type: 'Fresh Breads', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Artisan Crafts Co.', type: 'Handmade Goods', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=300&q=80' },
  ];

  const testimonials = [
    { id: 1, text: "The quality of vegetables I get from local farmers here is unbeatable. Way better than supermarkets!", author: "Sarah Jenkins" },
    { id: 2, text: "I love supporting my community. The handcrafted items I bought were beautifully made.", author: "Michael T." },
    { id: 3, text: "Fast local delivery and incredibly fresh bakery items. My weekend mornings are sorted.", author: "Emily R." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        color: 'white', 
        padding: '8rem 1.5rem', 
        textAlign: 'center',
        marginBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract background shapes */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '-10%', width: '400px', height: '400px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
        
        <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1.5rem', display: 'inline-block', backdropFilter: 'blur(4px)' }}>
            🌱 Your Community Marketplace
          </span>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            Discover Fresh <br/> Local Products
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, fontWeight: '400', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Support your community by shopping directly from neighborhood farmers, artisans, and creators. Fresh, organic, and delivered to you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Market
            </Link>
            <Link to="/register" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Categories Section */}
        <section className="animate-fade-in" style={{ marginBottom: '5rem', animationDelay: '0.2s', animationFillMode: 'both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Shop by Category</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {categories.map(cat => (
              <Link to={`/products?category=${cat.name}`} key={cat.id} className="card" style={{ 
                background: cat.color, 
                padding: '2.5rem', 
                textAlign: 'center', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                border: 'none'
              }}>
                <span style={{ fontSize: '3.5rem' }}>{cat.icon}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text)' }}>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="animate-fade-in" style={{ marginBottom: '6rem', animationDelay: '0.4s', animationFillMode: 'both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Trending Near You</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Hand-picked local favorites just for you.</p>
            </div>
            <Link to="/products" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View all products &rarr;
            </Link>
          </div>
          
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {products.map((product, i) => (
                <div key={product._id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', animationDelay: `${0.1 * i}s`, animationFillMode: 'both' }}>
                  <Link to={`/product/${product._id}`} style={{ position: 'relative', overflow: 'hidden', height: '220px', display: 'block' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--success)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Leaf size={14} /> Organic
                    </div>
                  </Link>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Link to={`/product/${product._id}`}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text)', lineHeight: '1.3', marginBottom: '0.5rem' }}>{product.name}</h3>
                    </Link>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      By <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{product.vendor?.storeName || 'Local Vendor'}</span>
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1.5rem', color: '#fbbf24' }}>
                      <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star size={16} />
                      <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginLeft: '4px' }}>(24)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--text)' }}>${product.price}</span>
                      <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '0.6rem', borderRadius: '50%' }}>
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Why Shop Local? */}
        <section style={{ marginBottom: '6rem', padding: '4rem', background: 'var(--surface)', borderRadius: '1.5rem', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '3rem' }}>Why Shop Local?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Premium Quality</h3>
              <p style={{ color: 'var(--text-light)' }}>Freshly harvested and handcrafted products that guarantee unmatched quality.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#e0f2fe', color: '#0ea5e9', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <HeartHandshake size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Support Community</h3>
              <p style={{ color: 'var(--text-light)' }}>Every purchase directly supports local families and strengthens the neighborhood economy.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#fef08a', color: '#ca8a04', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <Truck size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Eco-Friendly</h3>
              <p style={{ color: 'var(--text-light)' }}>Reduced transportation means a smaller carbon footprint for a greener planet.</p>
            </div>
          </div>
        </section>

        {/* Popular Vendors */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '2.5rem', textAlign: 'center' }}>Popular Local Vendors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {vendors.map(vendor => (
              <div key={vendor.id} className="card" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', gap: '1.5rem' }}>
                <img src={vendor.image} alt={vendor.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.2rem' }}>{vendor.name}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>{vendor.type}</p>
                  <Link to="/vendors" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600' }}>Visit Store &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '2.5rem', textAlign: 'center' }}>What Neighbors Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map(test => (
              <div key={test.id} className="card" style={{ padding: '2rem', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1rem' }}>
                  <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} />
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.6' }}>"{test.text}"</p>
                <h4 style={{ fontWeight: '700' }}>- {test.author}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section style={{ 
          background: 'var(--primary-dark)', 
          color: 'white', 
          padding: '4rem 2rem', 
          borderRadius: '1.5rem', 
          textAlign: 'center',
          marginBottom: '5rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1rem' }}>Stay Fresh, Stay Updated</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Subscribe to our newsletter to get updates on new local vendors and seasonal produce availability.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email" style={{ flexGrow: 1, padding: '1rem 1.5rem', borderRadius: '9999px', border: 'none', outline: 'none', fontSize: '1rem' }} />
            <button className="btn" style={{ background: 'var(--text)', color: 'white', padding: '1rem 2rem' }}>Subscribe</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
