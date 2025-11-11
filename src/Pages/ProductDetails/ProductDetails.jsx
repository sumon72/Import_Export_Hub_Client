import { useState, useEffect } from "react";
import { useParams } from "react-router";
import toast from 'react-hot-toast';
import Loader from "../../Component/Loader/Loader.jsx";
import api from "../../api/axiosInstance";
const ProductDetails = () => {
    const { id } = useParams();

    const [getProductDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetProductDetails(id);
    }, []);

    const GetProductDetails = async (id) => {
        try {
            const response = await api.get(`/getsingleproduct/${id}`); 
            setProductDetails(response.data);
        } catch (error) {
            toast.error(error.message || "Network failed");
        } finally {

            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    return (
        <>
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6">
                    {/* Service Image & Details */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        <img
                            src={getProductDetails.productImage}
                            alt={getProductDetails.productName}
                            className="w-full lg:w-1/2 h-80 object-cover rounded-lg shadow-lg"
                        />
                        <div className="lg:w-1/2 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-primary mb-3">
                                    {getProductDetails.productName}
                                </h1>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Country:</span>{" "}
                                    {getProductDetails.originCountry}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Email:</span>{" "}
                                    {/* {getProductDetails.providerEmail} */}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Category:</span>{" "}
                                    {/* {getProductDetails.category} */}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Price:</span> ${getProductDetails.price}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Rating:</span> {getProductDetails.rating} ⭐
                                </p>
                                <p className="text-sm mb-6">
                                    <span className="font-semibold">Available Quantity:</span>{" "}
                                    {getProductDetails.availableQuantity}
                                </p>
                                {/* <p >{getProductDetails.description}</p> */}
                            </div>


                        </div>
                    </div>
                    <div>
                        {/* Booking Form */}
                        {/* <form
                            className="mt-6 bg-white p-6 rounded-lg shadow-md"
                             onSubmit={handleSubmit}
                        >
                            <h2 className="text-xl font-semibold mb-4">Book Service</h2>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full mt-2"
                                >
                                    Book Now
                                </button>
                            </div>
                        </form> */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;