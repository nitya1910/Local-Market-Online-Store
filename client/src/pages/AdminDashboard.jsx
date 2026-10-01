import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data: ordersData } = await axios.get('/api/orders', config);
        const { data: productsData } = await axios.get('/api/products');
        
        setOrders(ordersData);
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        alert('Product deleted');
        window.location.reload();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  if (loading) return <div className="container">Loading Dashboard...</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--primary)', color: 'white' }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{orders.length}</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--secondary)', color: 'white' }}>
          <h3>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{products.length}</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: '#f59e0b', color: 'white' }}>
          <h3>Total Sales</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${orders.reduce((acc, o) => acc + o.totalPrice, 0).toFixed(2)}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>All Platform Products</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {products.map(product => (
              <li key={product._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}>
                <span>{product.name} (by {product.vendor?.storeName || 'Unknown'})</span>
                <button onClick={() => deleteProductHandler(product._id)} style={{ color: 'white', background: 'var(--error)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Platform Orders</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.5rem' }}>Order ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.5rem' }}>{order._id.substring(0, 8)}...</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
