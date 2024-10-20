import React, { useEffect } from "react";
import { useGlobalContext } from "../provider/Context";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, fullyRemoveFromCart } = useGlobalContext();


  useEffect(() => {
    window.scrollTo(0, 0);
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-8">Shopping Cart</h1>

      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="hidden md:table-row">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b md:table-row flex flex-col md:flex-row space-y-4 md:space-y-0"
                  >
                    <td className="px-4 py-2 flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        {item.isRented && (
                          <p className="text-xs text-gray-500">{'(For Rent)'}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">₹{item.price}</td>
                    <td className="px-4 py-2  items-center table-cell">
                      <button
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400"
                        onClick={() => removeFromCart(item)}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      ₹{item.price * item.quantity}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => fullyRemoveFromCart(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right mt-8">
            <p className="text-xl font-bold">Total: ₹{calculateTotal()}</p>
          </div>

          <div className="text-right mt-4">
            <Link className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800" to={'/checkout'}>
              Checkout Now
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center mt-8 text-5xl text-slate-400">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
