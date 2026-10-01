import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">LocalMarket</Link>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          
          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-8px', 
                background: 'red', color: 'white', borderRadius: '50%', 
                padding: '2px 6px', fontSize: '10px' 
              }}>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to={`/${user.role}/dashboard`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={20} /> {user.name} ({user.role})
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
