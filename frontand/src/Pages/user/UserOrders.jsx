import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MobileFooter from '../../components/MobileFooter';
import '../../styles/UserPages.css';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders/my', {
          withCredentials: true
        });
        setOrders(response.data.orders || []);
      } catch (err) {
        const msg = err.response?.data?.message || 'Could not load orders';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="user-page">
        <div className="user-card">
          <h2>Your Orders</h2>
          <p className="user-subtitle">Track your recent and upcoming orders.</p>

          {loading ? (
            <p className="order-loading">Loading orders...</p>
          ) : error ? (
            <p className="order-error">{error}</p>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <h3>No orders yet</h3>
              <p>Place your first order from home feed.</p>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <div className="order-item" key={order._id}>
                  <div className="order-main">
                    <h3>{order.foodId?.name || 'Food item'}</h3>
                    <p>Qty: {order.quantity}</p>
                    <p>Total: Rs. {order.totalPrice}</p>
                    <p>Status: <span className="order-status">{order.status}</span></p>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {order.foodId?.Video && (
                    <video className="order-video" src={order.foodId.Video} controls />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <MobileFooter />
    </>
  );
}

export default UserOrders;
