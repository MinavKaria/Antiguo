import React, { useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const notify = () => toast.success("Order Placed Successfully");
function ThankforOrdering() {


    const navigate = useNavigate();

  const sendMail = async (e) => {

    try
    {
        const user=JSON.parse(localStorage.getItem('user'));
        const email=user.email;
        if(!email)
        {
            console.error("Email not found");
            return;
        }
        const response = await axios.post(
            "http://localhost:3000/mail/send-email",
            {
                to: email,
                subject: "Order Confirmation",
                text: "Your order has been placed successfully. You will receive an email confirmation shortly."
            }
        );
        console.log("Mail sent successfully:", response.data);
    }
    catch(error)
    {
        console.error("Error sending mail:", error);
    }
    finally
    {
        setTimeout(() => {
            navigate("/orders")
        }, 2000);
        
    }
  };

  useEffect(() => {
    const funcy=async()=>{
        await sendMail();
    }
    funcy();
    notify();
  }, []);


  return (
    <>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Thank you for ordering</h1>
            <p className="text-lg">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
            </div>
        </div>
        <Toaster />
        
    </>
  )
}

export default ThankforOrdering