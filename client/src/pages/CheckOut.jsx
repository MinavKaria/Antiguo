import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";
import { useGlobalContext } from "../provider/Context";

const notify = () => toast.success("Order Placed Successfully");
const notify2 = () => toast.error("Insufficient Wallet Balance");

function CheckOut() {
  const [formData, setFormData] = useState({ name: "", address: "" });
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setCart:setGlobalCart }=useGlobalContext();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [currentWallet, setCurrentWallet] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        try {
          const response = await axios.get(`https://mern-project-antiguo.vercel.app/api/wallet/${userId}`);
          setCurrentWallet(response.data);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      user: user._id,
      products: cart.map((item) => ({
        product: item._id,
        productName: item.name,
        quantity: item.quantity,
        isRented: item.isRented || false,
      })),
      totalAmount,
      status:0
    };

    if(currentWallet<totalAmount)
    {
      // alert("Insufficient Wallet Balance");
      notify2();
      return;
    }
    try {
      const response = await axios.post(
        "https://mern-project-antiguo.vercel.app/api/orders",
        orderData
      );
      // alert('Order placed successfully!');
      localStorage.removeItem("cart");

      const res=await axios.put(`https://mern-project-antiguo.vercel.app/api/wallet/order`, {
        userId: user._id,
        amount: totalAmount,
      });
      console.log(res.data);
      setLoading(true);
      notify();
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      setTimeout(() => {
        navigate("/thankfororder");
        setGlobalCart([]);
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue placing your order. Please try again.");
    }
    finally
    {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="checkout-container max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

        {!loading ? (
          <>
            <div className="cart-items mb-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="cart-item flex justify-between items-center mb-4"
                  >
                    <div>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <p className="font-semibold">{item.name}</p>
                      <p>
                        {item.quantity} x ₹ {item.price}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>

            <div className="total-amount mb-6">
              <p className="text-lg font-semibold">Total: ₹{totalAmount}</p>
            </div>

            <form className="checkout-form space-y-4" onSubmit={handleSubmit}>
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* <div className="">
                <GooglePayButton
                  environment="TEST"
                  buttonSizeMode="static"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                          type: "PAYMENT_GATEWAY",
                          parameters: {
                            gateway: "example",
                            gatewayMerchantId: "exampleGatewayMerchantId",
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: "12345678901234567890",
                      merchantName: "Demo Merchant",
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: "100.00",
                      currencyCode: "INR",
                      countryCode: "IN",
                    },
                  }}
                  onLoadPaymentData={(paymentRequest) => {
                    console.log("load payment data", paymentRequest);
                  }}
                />
              </div> */}

              <button
                type="submit"
                // disabled={currentWallet < totalAmount}
                className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-grey`}>
              
                Place Order
              </button>
              
              <div className=" flex justify-end">
                <h2>
                  Current Wallet Balance:{" "}
                </h2>
                <h2 className="text-bold">
                  ₹ {currentWallet}
                </h2>
              </div>

            </form>
          </>
        ) : (
          <>
            <img
              src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-727.gif"
              alt=""
              srcset=""
            />
          </>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default CheckOut;
