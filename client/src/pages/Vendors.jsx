import React from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Star, ShieldCheck, ChevronRight } from 'lucide-react';

// Mock Vendors Data
const mockVendors = [
  {
    _id: 'v1',
    name: 'Green Valley Farm',
    description: '100% organic local farm specializing in seasonal fruits and vegetables.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Springfield Valley',
    rating: 4.9,
    joinedDate: '2022',
    verified: true,
    productsCount: 45
  },
  {
    _id: 'v2',
    name: 'Artisan Bakery Co.',
    description: 'Freshly baked sourdough, pastries, and gluten-free options daily.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Downtown Market',
    rating: 4.8,
    joinedDate: '2023',
    verified: true,
    productsCount: 24
  },
  {
    _id: 'v3',
    name: 'Sunrise Dairy',
    description: 'Family-owned dairy offering fresh milk, artisanal cheeses, and yogurt.',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'North Meadows',
    rating: 4.7,
    joinedDate: '2021',
    verified: true,
    productsCount: 18
  },
  {
    _id: 'v4',
    name: 'Handcrafted Haven',
    description: 'Locally made crafts, pottery, and sustainable home goods.',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Arts District',
    rating: 4.9,
    joinedDate: '2023',
    verified: false,
    productsCount: 32
  },
  {
    _id: 'v5',
    name: 'Pure Honey Apiaries',
    description: 'Raw, unfiltered local honey and beeswax products from rescued bees.',
    image: 'https://images.unsplash.com/photo-1587049352847-4d4b1263bbca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Pine Hills',
    rating: 5.0,
    joinedDate: '2020',
    verified: true,
    productsCount: 12
  },
  {
    _id: 'v6',
    name: 'Ocean Fresh Catch',
    description: 'Sustainably caught seafood delivered directly from the docks.',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Harbor Point',
    rating: 4.6,
    joinedDate: '2024',
    verified: false,
    productsCount: 15
  }
];

const Vendors = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text)', marginBottom: '1rem' }}>Our Local Vendors</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
          Meet the passionate farmers, artisans, and creators behind the products you love. By shopping here, you are directly supporting your local community.
        </p>
      </div>
      
      {/* Vendors Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {mockVendors.map((vendor) => (
          <div key={vendor._id} className="card animate-slide-up" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          >
            <div style={{ position: 'relative', height: '160px' }}>
              <img src={vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255, 255, 255, 0.9)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text)' }}>
                <Star size={14} fill="var(--warning)" color="var(--warning)" /> {vendor.rating}
              </div>
              {vendor.verified && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  <ShieldCheck size={14} /> Verified
                </div>
              )}
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Store size={20} color="var(--primary)" /> {vendor.name}
              </h3>
              
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} /> {vendor.location}
              </p>
              
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem', flexGrow: 1 }}>
                {vendor.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text)' }}>{vendor.productsCount}</span> Products
                </div>
                
                <Link to={`/products?vendor=${vendor.name}`} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Visit Store <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Become a Vendor CTA */}
      <div className="card" style={{ marginTop: '5rem', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)', borderRadius: '1.5rem', border: '1px solid rgba(16,185,129,0.2)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text)', marginBottom: '1rem' }}>Are you a local producer?</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Join our growing community of local vendors. Reach more customers in your area and manage your orders easily.
        </p>
        <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Store size={20} /> Become a Vendor
        </Link>
      </div>

    </div>
  );
};

export default Vendors;
