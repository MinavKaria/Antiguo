import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import ProductListingPage from "../pages/ProductListingPage";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import SignupPage from "../pages/Signup";
import SearchPage from "../pages/Search";
import VendorSide from "../pages/VendorSide";
import Profile from "../pages/Profile";
import CheckOut from "../pages/CheckOut";
import Orders from "../pages/Orders";
import ThankforOrdering from "../pages/ThankforOrdering";
import AddtoWallet from "../pages/AddtoWallet";
import RentedOrderPage from "../pages/RentedOrderPage";
import VendorOrders from "../pages/VendorOrders";
import VendorRentedSide from "../pages/VendorRentedSide";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Landing/>
            },
            {
                path:'/products',
                element:<ProductListingPage/>
            },
            {
                path:'/products/:id',
                element:<ProductPage/>
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path:'/search',
                element:<SearchPage/>
            },
            {
                path:'/profile',
                element:<Profile/>
            },
            {
                path:"/checkout",
                element:<CheckOut/>
            },
            {
                path:"/orders",
                element:<Orders/>
            },
            {
                path:"/thankfororder",
                element:<ThankforOrdering/>
            },
            {
                path:'/addtowallet',
                element:<AddtoWallet/>
            },
            {
                path:'/rented',
                element:<RentedOrderPage/>
            }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/signup",
        element:<SignupPage/>
    },
    {
        path:'/vendor',
        element:<VendorSide/>
    },
    {
        path:'/vendor/rented',
        element:<VendorRentedSide/>
    },
    {
        path:'/vendor/orders',
        element:<VendorOrders/>
    },
    {
        path:"*",
        element:(
            <>
                <h1>404 Page not found</h1>
            </>
        )
    },
    
])

export default router;