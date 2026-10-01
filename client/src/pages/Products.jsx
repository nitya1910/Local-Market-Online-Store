import { useState, useEffect, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, Leaf, Heart } from 'lucide-react';
import CartContext from '../context/CartContext';
import AppContext from '../context/AppContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [priceRange, setPriceRange] = useState('');

  const search = useLocation().search;
  const keyword = new URLSearchParams(search).get('keyword') || '';
  const queryCategory = new URLSearchParams(search).get('category') || '';

  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(AppContext);

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory);
    }
  }, [queryCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        // Fallback to mock data if API fails to keep UI functional
        console.warn('API Failed, using mock data');
        setProducts([
          { _id: '1', name: 'Organic Bananas', price: 2.99, category: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1571501474554-25b0cb9dd020?w=300', vendor: { storeName: 'Green Valley Farms' }, rating: 5, numReviews: 12, createdAt: '2023-01-01' },
          { _id: '2', name: 'Fresh Sourdough Bread', price: 6.50, category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', vendor: { storeName: 'Sunny Side Bakery' }, rating: 4.5, numReviews: 8, createdAt: '2023-01-05' },
          { _id: '3', name: 'Farm Fresh Milk', price: 4.20, category: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300', vendor: { storeName: 'Happy Cows Dairy' }, rating: 4.8, numReviews: 24, createdAt: '2023-01-10' },
          { _id: '4', name: 'Handmade Ceramic Mug', price: 18.00, category: 'Handmade Products', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300', vendor: { storeName: 'Artisan Crafts Co.' }, rating: 5, numReviews: 5, createdAt: '2023-01-15' },
        ]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(p => {
        if (max) return p.price >= min && p.price <= max;
        return p.price >= min;
      });
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [products, category, sort, priceRange]);

  const categories = ['All', 'Fruits & Vegetables', 'Bakery', 'Dairy', 'Handmade Products', 'Organic Products', 'Beverages', 'Local Crafts'];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>
          {keyword ? `Search Results for "${keyword}"` : 'All Products'}
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }} className="shop-layout">
        <style>{`
          .shop-layout { flex-direction: column; }
          .sidebar { width: 100%; display: flex; flex-direction: row; gap: 1rem; overflow-x: auto; padding-bottom: 1rem; }
          @media(min-width: 768px) {
            .shop-layout { flex-direction: row; }
            .sidebar { width: 250px; flex-direction: column; flex-shrink: 0; overflow-x: visible; }
          }
        `}</style>
        
        {/* Sidebar Filters */}
        <div className="sidebar card" style={{ padding: '1.5rem' }}>
          <div>
            <h3 style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '1.1rem' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories.map(c => (
                <button 
                  key={c} 
                  onClick={() => setCategory(c === 'All' ? '' : c)}
                  style={{ 
                    textAlign: 'left', 
                    background: 'none', 
                    border: 'none', 
                    color: category === c || (!category && c === 'All') ? 'var(--primary)' : 'var(--text-light)', 
                    fontWeight: category === c || (!category && c === 'All') ? '600' : '400',
                    cursor: 'pointer',
                    padding: '0.2rem 0'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'none' }}> {/* Optional Price Filter */}
            <h3 style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '1.1rem' }}>Price</h3>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <option value="">All Prices</option>
              <option value="0-10">Under $10</option>
              <option value="10-25">$10 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-1000">Over $50</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ flexGrow: 1 }}>
          {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
          ) : error && products.length === 0 ? (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px' }}>{error}</div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', borderRadius: '1rem' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>No products found</h3>
              <p style={{ color: 'var(--text-light)' }}>Try adjusting your search or filters.</p>
              <button onClick={() => {setCategory(''); setKeyword('');}} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Clear All Filters</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {filteredAndSortedProducts.map((product, i) => {
                const isWishlisted = wishlist.some(w => w._id === product._id);
                return (
                  <div key={product._id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', animationDelay: `${0.05 * i}s`, animationFillMode: 'both' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                      <Link to={`/product/${product._id}`} style={{ display: 'block', height: '100%' }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Link>
                      <button 
                        onClick={() => toggleWishlist(product)}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '50%', color: isWishlisted ? 'var(--primary)' : 'var(--text-light)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}
                      >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>
                      {product.category?.includes('Organic') && (
                        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--success)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Leaf size={12} /> Organic
                        </div>
                      )}
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
                        <span style={{ color: 'var(--text-light)', fontSize: '0.8rem', marginLeft: '4px' }}>({product.numReviews || 0})</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--text)' }}>${product.price?.toFixed(2)}</span>
                        <button onClick={() => addToCart(product, 1)} className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
