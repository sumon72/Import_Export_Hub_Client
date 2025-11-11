import React from "react";
import NotFound from "../../assets/App-Error.png"
import NavBar from "../../Component/NavBar/NavBar.jsx";
import Footer from "../../Component/Footer/Footer.jsx";
const Error = () => {
    return (
        <>
            <NavBar></NavBar>
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <div className="mx-auto">
                    <img src={NotFound} alt="Error Icon" className="mx-auto h-full w-full mb-4" />

                    <h1 className="text-4xl font-bold text-gray-800 mb-2">OPPS!! Services NOT FOUND!</h1>

                    <p className="text-gray-600 text-lg">The Services you are requesting is not found on our system.  please try another Services.</p>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Error;