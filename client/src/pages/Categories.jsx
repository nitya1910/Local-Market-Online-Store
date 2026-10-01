import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: 'Fruits & Vegetables', icon: '🍎', description: 'Fresh, organic produce direct from farms' },
    { name: 'Bakery', icon: '🍞', description: 'Artisan breads and fresh baked goods' },
    { name: 'Dairy', icon: '🥛', description: 'Local milk, cheese, and dairy products' },
    { name: 'Handmade Products', icon: '🧶', description: 'Unique crafts from local artisans' },
    { name: 'Organic Products', icon: '🌱', description: 'Certified organic whole foods' },
    { name: 'Beverages', icon: '🧃', description: 'Fresh juices, teas, and local beverages' },
    { name: 'Local Crafts', icon: '🎨', description: 'Beautiful handcrafted home goods' },
  ];

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-slide-up">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Browse Categories</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore our wide selection of fresh, local products categorized for your convenience.
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {categories.map((category, index) => (
          <Link 
            key={category.name} 
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="card animate-fade-in"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center', 
              padding: '2rem 1.5rem', 
              textDecoration: 'none',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{category.icon}</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text)' }}>{category.name}</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
