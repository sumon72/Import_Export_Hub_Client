import { useState, useEffect } from "react";
import Rating_Icon from "../../assets/icon-ratings.png";
import { NavLink } from "react-router";
import api from "../../api/axiosInstance";
import ServiceData from '../../ServiceData.json';
const RecentProduct = () => {

    const [Recentproducts, setRecentproducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const MostRecentProducts = async () => {
            try {
                const response = await api.get("/recentProducts");
                console.log(response.data);
                setRecentproducts(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        MostRecentProducts();
    }, []);



    return (
        <>
            <section className="py-16 px-4 text-center bg-gray-50">
                <h1 className="text-4xl font-bold text-primary mb-4">Most Recent Products</h1>
                <p className="mt-2 text-gray-600">
                    Explore our latest products with detailed info.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
                    {Recentproducts.map((prd, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 p-5 flex flex-col"
                        >
                            {/* Product Image */}
                            <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                                <img
                                    src={prd.productImage}
                                    alt={prd.productName}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            {/* Product Name */}
                            <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">{prd.productName}</h3>

                            {/* Price & Rating */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[#00D390] font-bold text-lg">${prd.price}</span>
                                <span className="flex items-center space-x-1 bg-[#FFF0E1] px-3 py-1 rounded-full text-[#FF8811]">
                                    <img src={Rating_Icon} alt="Rating Icon" className="h-4 w-4" />
                                    <span>{prd.rating}</span>
                                </span>
                            </div>

                            {/* Additional Info */}
                            <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                                {/* Available Quantity */}
                                <p className="font-medium">
                                    Available: <span className="text-gray-800">{prd.availableQuantity}</span>
                                </p>

                                {/* Origin Country */}
                                <p className="font-medium flex items-center">
                                    Origin:
                                    <span className="ml-1 text-gray-500">{prd.originCountry}</span>
                                </p>
                            </div>

                            {/* See Details Button */}
                            <NavLink
                                to={`/servicedetails/${prd._id}`}
                                className="mt-auto w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition text-center"
                            >
                                See Details
                            </NavLink>
                        </div>
                    ))}
                </div>
            </section>




        </>
    );
};

export default RecentProduct;