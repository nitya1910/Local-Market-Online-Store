const About = () => {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div className="animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>About Discover Fresh</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '2rem' }}>
          Welcome to Discover Fresh, your premier local marketplace. Our mission is to bridge the gap between local farmers, passionate artisans, and conscious consumers like you. We believe in the power of community and the unmatched quality of locally sourced products.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem', textAlign: 'left' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary)' }}>Support Local</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>By shopping with us, you directly support local economies and small businesses in your area.</p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary)' }}>Always Fresh</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Our farm-to-table approach ensures that you get the freshest produce possible.</p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary)' }}>Sustainable</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>We encourage eco-friendly practices and sustainable farming among all our vendors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
