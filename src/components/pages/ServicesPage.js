import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate('/book');
    } else {
      navigate('/login');
    }
  };

  const grouped = services.reduce((acc, s) => {
    const cat = s.category || 'House rituals';
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/services`);
        setServices(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load services.');
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-container animate-page-enter">
      <div className="eyebrow">Spec sheet</div>
      <h1>Services & specs</h1>
      <p className="lede">Every job lists its minutes and its rupees. Spec it, then book a chair.</p>
      {loading ? (
        <div className="loading">Reading the rate card…</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="rate-groups">
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat} className="rate-group">
              <h2 className="rate-group-title">{cat}</h2>
              <div className="rate-list">
                {items.map((service) => (
                  <article key={service.id || service._id} className="rate-card">
                    <div className="rate-row">
                      <h3 className="rate-name">{service.name}</h3>
                      <span className="leader" aria-hidden="true"></span>
                      <span className="rate-price">₹{service.price}</span>
                    </div>
                    <p className="rate-desc">{service.description || 'Ask at the chair.'}</p>
                    <div className="rate-meta">
                      <span className="rate-mins">{service.duration} min</span>
                      <button className="book-button rate-book" onClick={handleBookNow}>
                        {isAuthenticated ? 'Book this' : 'Login to book'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
