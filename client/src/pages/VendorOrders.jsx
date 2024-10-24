import React, { useEffect, useState } from "react";
import axios from "axios";

function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://mern-project-antiguo.vercel.app/api/orders"); // Assuming an API endpoint to get all orders
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Orders</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Order ID
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  User ID
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Products
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Total Amount
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Status
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Return Status
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Created At
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {/* {JSON.stringify(orders)} */}
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">
                      {order.user ? order.user : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {order.products.map((product, index) => (
                        <div
                          key={index}
                          className={`mb-2 ${
                            product.isRented ? "text-red-500" : ""
                          }`}
                        >
                          {product.productName} (Qty: {product.quantity}){" "}
                          {product.isRented && "(Rented)"}
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4">₹ {order.totalAmount}</td>
                    <td className="py-3 px-4">
                      {order.status === 0 ? "Pending" : "Completed"}
                    </td>
                    <td className="py-3 px-4">
                      {order.returnStatus === 0 ? "Not Returned" : "Returned"}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                    {
                        order.status === 0 ? (
                            <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={() => {
                          
                          const update = async () => {
                            try {
                              const res =await axios.put(
                                `https://mern-project-antiguo.vercel.app/api/orders/${order._id}`,
                                { status: 1 }
                              );
                              console.log(res.data);
                              setOrders(
                                orders.map((o) => {
                                  if (o._id === order._id) {
                                    return { ...o, status: 1 };
                                  }
                                  return o;
                                })
                              );
                            } catch (err) {
                              console.log(err);
                            }

                            

                          };

                          update();

                        }}
                      >
                        Delivered
                      </button>
                        ):
                        (
                            <>
                                <h1 className=" bg-green-600 text-white p-1 rounded-md">Delivered Successfully</h1>
                            </>
                        )
                    }
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 px-4" colSpan="7">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorOrders;
