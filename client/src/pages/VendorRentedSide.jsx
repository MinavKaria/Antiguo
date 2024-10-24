import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function VendorRentedSide() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWallet, setCurrentWallet] = useState(0);

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


  const handleReturn = async (orderId, productId) => {
    
  };

  const calculateDaysRented = (rentedDate) => {
    console.log(rentedDate);
    const rentedDateTime = new Date(rentedDate).getTime();
    const currentDate = new Date().getTime();
    const diffTime = Math.abs(currentDate - rentedDateTime);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Rented Items</h1>
        <Skeleton height={40} count={5} />
      </div>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Rented Items</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Product</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Rented Date</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Days Rented</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.map(order => {
                const rentedProducts = order.products.filter(product => product.isRented);

                if (rentedProducts.length === 0) {
                  return null; 
                }

                return rentedProducts.map(product => (
                    
                  <tr key={product._id} className="border-b">
                    <td className="py-3 px-4 text-center">
                      {product.productName} (Qty: {product.quantity})
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {calculateDaysRented(order.createdAt)-1} days
                    </td>
                    <td className="py-3 px-4 text-center">
                      {(order.status===1 && order.returnStatus===0)&& <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full"
                        onClick={() => {
                          console.log(order._id, product._id);
                          const orderId = order._id;
                          const productId = product._id;
                          const funcy=async()=>{
                          {
                            try {
    
                            const res=await axios.put(`https://mern-project-antiguo.vercel.app/api/orders/return`, { orderId, productId });
                            console.log(res.data);

                            setOrders(orders.map((order) => {
                                if (order._id === orderId) {
                                    return {
                                    ...order,
                                    returnStatus: 1,
                                    };
                                }
                                return order;
                                }));
    
                          } catch (err) {
                                console.error("Error returning product", err);
                              }}
                          }

                          funcy();
                          }}

                      >
                        Return
                      </button>}


                      {(order.status===1 && order.returnStatus===1)&& <button  className=" bg-red-500 text-white p-1 rounded-md"
                      onClick={() => {
                          console.log(order._id, product._id);
                          const orderId = order._id;
                          const productId = product._id;
                          const funcy=async()=>{
                          {
                            try {
    
                            const res=await axios.put(`https://mern-project-antiguo.vercel.app/api/orders/return`, { orderId, productId });
                            console.log(res.data);
                            console.log("Return accepted");
                            console.log(order.user)

                            try{
                                const user_id=order.user;
                                const response = await axios.get(`https://mern-project-antiguo.vercel.app/api/wallet/${user_id}`);
          setCurrentWallet(response.data);
                                console.log(response.data);
                                const numberofdays=calculateDaysRented(order.createdAt)-1;
                                console.log(numberofdays);
                                console.log(order.totalAmount);
                                const amountToBeAdded=(order.totalAmount*0.80)-(numberofdays*0.0125)+response.data;

                                try
                                {
                                    const response = await axios.put(`https://mern-project-antiguo.vercel.app/api/wallet/${user_id}`, {
                      walletAmount: amountToBeAdded,
                    });
                                }
                                catch(err){
                                    console.log(err);
                                }

                                console.log(amountToBeAdded);
                            }
                            catch(err){
                                console.log(err);
                            }

                            setOrders(orders.map((order) => {
                                if (order._id === orderId) {
                                    return {
                                    ...order,
                                    returnStatus: 2,
                                    };
                                }
                                return order;
                                }));
                            
    
                          } catch (err) {
                                console.error("Error returning product", err);
                              }}
                          }

                          funcy();
                          }}
                      >Return accepted</button>}

                      {(order.status===1 && order.returnStatus===2)&& <span className="text-green-500">Product returned</span>}
                      
                      {
                        order.status===0 && <span className="text-red-500">Order is not yet delivered</span>
                      }
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorRentedSide;
