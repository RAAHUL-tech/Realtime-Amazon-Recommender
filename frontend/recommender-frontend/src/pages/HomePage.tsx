import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get('http://localhost:8000/api/products').then((res) => setProducts(res.data));

    axios.post('http://localhost:8000/api/recommend', {
      user_id: userId,
      candidate_items: Array.from({ length: 10 }, (_, i) => i + 1)
    }).then((res) => setRecommendations(res.data.recommended_items));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Recommended Products</h1>
      <ul>
        {recommendations.map((item, idx) => (
          <li key={idx}>Item ID: {item}</li>
        ))}
      </ul>

      <h2>All Products</h2>
      <ul>
        {products.map((prod, idx) => (
          <li key={idx}>{prod.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;