import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from 'react-hot-toast';
import Loader from "../../Component/Loader/Loader.jsx";
import api from "../../api/axiosInstance";
const ProductDetails = () => {
    const { id } = useParams();
    const { user, logout } = useAuth();
    const [getProductDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        GetProductDetails(id);
    }, []);

    const GetProductDetails = async (id) => {
        try {
            const token = user ? await user.getIdToken() : null;
            const response = await api.get(`/getsingleproduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProductDetails(response.data);
        } catch (error) {
            toast.error(error.message || "Network failed");
        } finally {

            setLoading(false);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleImport = () => {
        if (quantity > getProductDetails?.availableQuantity) {
            toast.error("Please set Less than Or Equal Available Quantity!");
            return;
        }

        ImportProduct({
            _id: getProductDetails._id,
            productImage: getProductDetails.productImage,
            productName: getProductDetails.productName,
            price: getProductDetails.price,
            originCountry: getProductDetails.originCountry,
            rating: getProductDetails.rating,
            availableQuantity: quantity,
            category:getProductDetails.category,
            email: user.email,
        });
        setIsModalOpen(false);
    };

    const ImportProduct = async (data) => {
        try {
            const token = user ? await user.getIdToken() : null;
            const response = await api.post('/importproduct', data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );  
             GetProductDetails(id);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message || "Network failed");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <Loader />;
    return (
        <>
            <section className="py-16 bg-base-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        {/* Product Image */}
                        <img
                            src={getProductDetails?.productImage}
                            alt={getProductDetails?.productName}
                            className="w-full lg:w-1/2 h-96 object-cover rounded-2xl shadow-xl"
                        />

                        {/* Product Info */}
                        <div className="lg:w-1/2 space-y-5">
                            <h1 className="text-4xl font-bold text-primary">
                                {getProductDetails?.productName}
                            </h1>

                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                                <p>
                                    <span className="font-semibold text-gray-800">Country:</span>{" "}
                                    {getProductDetails?.originCountry}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-800">Category:</span>{" "}
                                    {getProductDetails?.category}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-800">Price:</span> $
                                    {getProductDetails?.price}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-800">Rating:</span>{" "}
                                    {getProductDetails?.rating} ⭐
                                </p>
                                <p className="col-span-2">
                                    <span className="font-semibold text-gray-800">
                                        Available Quantity:
                                    </span>{" "}
                                    {getProductDetails?.availableQuantity}
                                </p>
                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                {getProductDetails?.description}
                            </p>

                            {/* Import Button */}
                            <div className="pt-6">
                                <button
                                    className="btn btn-sm mt-2 text-white btn-primary rounded-sm text-center"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Import Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DaisyUI Modal */}
                {isModalOpen && (
                    <dialog open className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box rounded-2xl">
                            <h3 className="font-bold text-lg mb-4 text-gray-800">
                                Set Quantity
                            </h3>
                            <p className="mb-4 text-gray-600">
                                Enter the quantity you want to import for{" "}
                                <span className="font-semibold">
                                    {getProductDetails?.productName}
                                </span>
                                .
                            </p>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="input input-bordered w-full mb-6"
                            />

                            <div className="modal-action">
                                <button
                                    className="btn btn-sm mt-2 text-white btn-primary rounded-sm text-center"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-sm mt-2 text-white btn-primary rounded-sm text-center"
                                    onClick={handleImport}
                                >
                                    Confirm Import
                                </button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => setIsModalOpen(false)}>close</button>
                        </form>
                    </dialog>
                )}
            </section>
        </>
    );
};

export default ProductDetails;