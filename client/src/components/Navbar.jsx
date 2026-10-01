import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import AppContext from '../context/AppContext';
import { ShoppingCart, User, LogOut, Search, Heart, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(AppContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  
  // Theme and Animations
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);
  
  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    if (totalCartItems > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalCartItems]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
      setIsMenuOpen(false);
    } else {
      navigate('/products');
    }
  };

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        {/* Logo */}
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🌿</span>
          LocalMarket
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/vendors">Vendors</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        {/* Make desktop links visible via CSS in index.css (handled later or inline) */}
        <style>{`
          .nav-links { display: none; }
          @media (min-width: 992px) {
            .nav-links { display: flex; gap: 1.5rem; align-items: center; }
            .mobile-menu-btn { display: none !important; }
            .mobile-menu { display: none !important; }
          }
          .nav-actions { display: flex; gap: 1.25rem; align-items: center; }
          .nav-icon { color: var(--text); cursor: pointer; transition: color 0.2s; position: relative; display: flex; align-items: center; justify-content: center; }
          .nav-icon:hover { color: var(--primary); }
          .search-bar { display: none; }
          @media (min-width: 768px) {
            .search-bar { display: flex; align-items: center; background: var(--background); border-radius: 9999px; padding: 0.4rem 1rem; border: 1px solid var(--border); transition: all 0.3s; }
            .search-bar:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
            .search-bar input { border: none; background: transparent; outline: none; padding-left: 0.5rem; width: 180px; font-family: inherit; color: var(--text); }
          }
        `}</style>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="search-bar">
          <Search size={18} color="var(--text-light)" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>

        {/* Icons & Actions */}
        <div className="nav-actions">
          <button onClick={toggleTheme} className="nav-icon" title="Toggle Theme">
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          <Link to="/wishlist" className="nav-icon" title="Wishlist">
            <Heart size={22} />
            {wishlist?.length > 0 && (
              <span className="animate-pop-in" style={{ 
                position: 'absolute', top: '-8px', right: '-8px', 
                background: 'var(--primary)', color: 'white', borderRadius: '50%', 
                width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold'
              }}>
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" className={`nav-icon ${cartAnimate ? 'animate-cart-bounce' : ''}`} title="Cart">
            <ShoppingCart size={22} />
            {totalCartItems > 0 && (
              <span className="animate-pop-in" style={{ 
                position: 'absolute', top: '-8px', right: '-8px', 
                background: 'var(--error)', color: 'white', borderRadius: '50%', 
                width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold'
              }}>
                {totalCartItems}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to={`/${user.role}/dashboard`} className="nav-icon" title="Profile">
                <User size={22} />
              </Link>
              <button onClick={handleLogout} className="nav-icon" title="Logout">
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-icon" title="Login">
              <User size={22} />
            </Link>
          )}

          <button className="mobile-menu-btn nav-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'block' }}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu animate-slide-up" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface)', padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-md)' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: 'var(--background)', borderRadius: '9999px', padding: '0.5rem 1rem', border: '1px solid var(--border)' }}>
            <Search size={18} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', paddingLeft: '0.5rem', width: '100%', fontFamily: 'inherit', color: 'var(--text)' }} 
            />
          </form>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
          <Link to="/vendors" onClick={() => setIsMenuOpen(false)}>Vendors</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          {!user && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ textAlign: 'center' }} onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ textAlign: 'center' }} onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
