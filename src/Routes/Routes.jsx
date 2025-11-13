import React, { Component } from 'react'
import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root/Root.jsx";
import ErrorPage from "../Pages/Error/ErrorPage.jsx";
import NotFound from "../Pages/Error/NotFound.jsx";
import Home from "../Pages/Home/Home.jsx";
import ProductDetails from "../Pages/ProductDetails/ProductDetails.jsx";
import LogIn from "../Component/LogIn/LogIn.jsx";
import Register from "../Component/Register/Register.jsx";
import AllProduct from "../Pages/AllProduct/AllProduct.jsx";
import ProtectedRoute from "../Routes/ProtectedRoute.jsx";
import MyProfile from '../Pages/MyProfile/MyProfile.jsx';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword.jsx';
import MyImports from '../Pages/MyImports/MyImports.jsx';
import MyExports from '../Pages/MyExports/MyExports.jsx';
import AddExport from '../Pages/AddExport/AddExport.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <LogIn />,
            },
            {
                path: "/forgotpassword",
                element: <ForgotPassword />,
            },
            {
                path: "allproduct",
                element: <AllProduct />,
            },
            {
                path: "myprofile",
                element: (
                    <ProtectedRoute>
                        <MyProfile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "productdetails/:id",
                element: (
                    <ProtectedRoute>
                        <ProductDetails />
                    </ProtectedRoute>
                ),
            },
            {
                path: "myimports",
                element: (
                    <ProtectedRoute>
                        <MyImports />
                    </ProtectedRoute>
                ),
            },
            {
                path: "myexports",
                element: (
                    <ProtectedRoute>
                        <MyExports />
                    </ProtectedRoute>
                ),
            },
             {
                path: "addexports",
                element: (
                    <ProtectedRoute>
                        <AddExport />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);
