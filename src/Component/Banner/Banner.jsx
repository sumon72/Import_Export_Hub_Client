import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";
const Banner = () => {

    return (
        <>
            <section className="relative w-full h-[600px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://www.shipdatacenter.com/wp-content/themes/shipdc/images/main.jpg')",
                    }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 md:px-20">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Global Import & Export Solutions
                    </h1>
                    <p className="text-white/90 text-lg md:text-2xl mb-6 max-w-3xl">
                        Reliable logistics and shipment tracking services connecting you worldwide.
                    </p>
                    <NavLink
                        to="/allproduct"
                        className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition"
                    >
                        Explore Product
                    </NavLink>
                </div>
            </section>



        </>
    );
};

export default Banner;