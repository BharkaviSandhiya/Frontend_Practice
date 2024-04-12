import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json(); 
        setProducts(data?.products?.slice(0, 9));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product_list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          {products.map((product, index) => (
            <div className="card" key={index}>
              <img 
                src="https://imageio.forbes.com/specials-images/imageserve/5fd00ea644cd62376ce2b6c1/In-this-photo-illustration-a-13inch-Macbook-pro-seen---/960x0.jpg?format=jpg&width=1440" className="image"
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
