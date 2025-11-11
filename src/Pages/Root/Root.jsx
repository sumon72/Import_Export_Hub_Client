import React from "react";
import '../../../src/App.css'
import { Outlet } from "react-router";
import NavBar from "../../Component/NavBar/NavBar.jsx";
import Footer from "../../Component/Footer/Footer.jsx";
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Footer></Footer>
                <Toaster position="top-center" reverseOrder={false} />
            </div>

        </>
    );
};

export default Root;