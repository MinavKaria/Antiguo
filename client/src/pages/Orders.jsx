import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Orders() {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const id = user._id;

        try {
          const response = await axios.get(`https://mern-project-antiguo.vercel.app/api/orders/${id}`);
          setOrders(response.data);
        } catch (err) {
          setError(err.message);
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Products</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Status</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Date</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Total Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="py-3 px-4"><Skeleton count={3} /></td>
                <td className="py-3 px-4"><Skeleton /></td>
                <td className="py-3 px-4"><Skeleton /></td>
                <td className="py-3 px-4"><Skeleton /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Products</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Status</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Date</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Total Amount</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Rented Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.length > 0 ? (
                orders.map(order => (
                  <tr key={order._id} className="border-b">
                    <td className="py-3 px-4">
                      {order.products.map((product, index) => (
                        <div key={index} className="mb-2 text-center">
                          <span className="font-semibold">{product.productName}</span> (Qty: {product.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-4 flex justify-center h-full items-center">
                      <span className={`px-2 py-1 rounded-full text-sm ${order.status ===1 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {order.status===0 && 'Pending'}
                        
                        {order.status===1 && 'Delivered'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-center">₹ {order.totalAmount}</td>
                    <td className="py-3 px-10 text-center">
                      {order.products.map((product, index) => (
                        <div key={index} className="mb-2">
                          {product.isRented ? (
                            <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">Rented</div>
                          ) : (
                            <div className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">Not Rented</div>
                          )}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 px-4" colSpan="5">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
