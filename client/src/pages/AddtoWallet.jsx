import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWallet } from "react-icons/fa";
import GooglePayButton from "@google-pay/button-react";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Amount Added Successfully");

function AddtoWallet() {
  const [currentWallet, setCurrentWallet] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        try {
          const response = await axios.get(`http://localhost:3000/api/wallet/${userId}`);
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

  const [amount, setAmount] = useState(0);

  const handleAddAmount = (value) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <FaWallet className="mr-2" /> Add to Wallet
          </h1>
          


          <div className="mb-6">
            <input
              type="text"
              value={`₹ ${amount}`}
              readOnly
              className="w-full p-3 text-2xl font-semibold text-center bg-gray-100 rounded-md border-2 border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {[500, 1000, 2000, 5000].map((value) => (
              <button
                key={value}
                onClick={() => handleAddAmount(value)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-all"
              >
                +₹ {value}
              </button>
            ))}
          </div>

          <div>
            <h2>
              Current Wallet Balance:{" "}
            </h2>
            <h2 className=" text-3xl text-bold">
              ₹ {currentWallet}
            </h2>
          </div>
          <br />

          <button
            onClick={() => setAmount(0)}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all"
          >
            Reset Amount
          </button>
          <div className="mt-5 w-full">
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
                      totalPrice: amount.toString(),
                      currencyCode: "INR",
                      countryCode: "IN",
                    },
                  }}
                  onLoadPaymentData={(paymentRequest) => {
                    console.log("load payment data", paymentRequest);
                  }}
                  
                />
              </div>
          <button
            onClick={async () => {
              if (amount > 0) {
                try {
                  const user = JSON.parse(localStorage.getItem("user"));
                  const userId = user._id;
                  console.log(userId);
                  try {
                    const response = await axios.put(`http://localhost:3000/api/wallet/${userId}`, {
                      walletAmount: currentWallet + amount,
                    });
                    setCurrentWallet(response.data);
                    setAmount(0);
                  } catch (err) {
                    console.log(err);
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            }}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all mt-4"
          >
            Add to Wallet (Demo)
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default AddtoWallet;
