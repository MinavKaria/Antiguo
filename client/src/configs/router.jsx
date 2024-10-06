import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import ProductListingPage from "../pages/ProductListingPage";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import SignupPage from "../pages/Signup";

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
        path:"*",
        element:(
            <>
                <h1>404 Page not found</h1>
            </>
        )
    }
])

export default router;