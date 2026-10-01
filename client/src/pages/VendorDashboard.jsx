import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const VendorDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // New product state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState('https://via.placeholder.com/400'); // Simulated image upload
  
  useEffect(() => {
    if (!user || user.role !== 'vendor') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data: ordersData } = await axios.get('/api/orders/vendororders', config);
        const { data: productsData } = await axios.get('/api/products', config); // Ideally filter by vendor ID, but let's assume it works for demo
        
        setOrders(ordersData);
        setProducts(productsData.filter(p => p.vendor?._id === user._id || p.vendor === user._id));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  const addProductHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/products', { name, price, description, category, countInStock, image }, config);
      alert('Product Added');
      window.location.reload(); // Refresh to see new product
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/orders/${id}/status`, { status }, config);
      alert('Order Status Updated');
      window.location.reload();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="container">Loading Dashboard...</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: '2rem' }}>Vendor Dashboard - {user.storeName}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add New Product</h3>
          <form onSubmit={addProductHandler}>
            <input type="text" placeholder="Product Name" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
            <input type="number" placeholder="Price ($)" required value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
            <input type="text" placeholder="Category" required value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
            <input type="number" placeholder="Stock Quantity" required value={countInStock} onChange={e => setCountInStock(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
            <textarea placeholder="Description" required value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Save Product</button>
          </form>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Your Inventory</h3>
          {products.length === 0 ? <p>No products yet.</p> : (
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {products.map(product => (
                <li key={product._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}>
                  <span>{product.name}</span>
                  <span>Qty: {product.countInStock} | ${product.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Orders</h3>
        {orders.length === 0 ? <p>No orders received yet.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.5rem' }}>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.5rem' }}>{order._id.substring(0, 8)}...</td>
                  <td>{order.user?.name || 'Unknown'}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span style={{ padding: '0.25rem 0.5rem', background: 'var(--background)', borderRadius: '0.25rem', fontSize: '0.9rem' }}>{order.status}</span>
                  </td>
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      style={{ padding: '0.25rem' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
