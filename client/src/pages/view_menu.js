import React, { useState, useEffect } from 'react';
import "../CSS pages/menu.css";

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/menu');
        if (!response.ok) {
          throw new Error('Could not fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMenuItems();
  }, []);


  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
   
      

        <div className="menu-display">
          <h2>Menu Items</h2>
          {error && <div className="error">{error}</div>}
          <div className="menu-items">
            {menuItems.map((item) => (
              <div key={item._id} className="menu-item">
                <img
                  src={`http://localhost:3001/uploads/${item.image}`}
                  alt={item.name}
                  className="menu-item-image"
                />
                <h3>{item.name}</h3>
                <p>Price: LKR {item.price}</p>
                <p>Category: {item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;
