import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Rating_Icon from "../../assets/icon-ratings.png";
import { NavLink } from "react-router";
import api from "../../api/axiosInstance";
import Loader from "../../Component/Loader/Loader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const MyImports = () => {
    const { user, logout } = useAuth();
    const [myImport, setMyImport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);


    const GetMyImportList = async () => {
        try {
            const email = user.email;
            const token = user ? await user.getIdToken() : null;
            const response = await api.get(`/getmyimport/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMyImport(response.data);
        } catch (error) {
            toast.error(error.message || "Network failed");
        } finally {

            setLoading(false);
        }
    };


    const handleDelete = async (id) => {
        try {

            const token = user ? await user.getIdToken() : null;
            const response = await api.delete(`/deletemyimport/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            GetMyImportList();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message || "Network failed");
        } finally {

            setLoading(false);
        }
    };



    useEffect(() => {
        GetMyImportList();
    }, []);


    if (loading) return <Loader />;

    return (
        <>
            <section className="py-16 px-4 bg-base-100 text-center">
                <h2 className="text-3xl font-bold">My Imports</h2>

                <div className="max-w-6xl mx-auto flex justify-between mt-10">
                    <div>
                        <span>({myImport.length})</span><span> Total Imports</span>
                    </div>
                </div>

                <div className="space-y-4 mt-5 max-w-6xl mx-auto">
                    {myImport.map((app, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:flex-row items-center justify-between bg-base-200 shadow-md p-4 rounded-xl hover:shadow-lg transition"
                        >
                            {/* Product Info */}
                            <div className="flex items-center space-x-4 w-full md:w-auto flex-1">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={app.productImage}
                                        alt={app.productName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 text-left">
                                    <h3 className="font-medium text-base">{app.productName}</h3>

                                    {/* Single row info */}
                                    <div className="flex flex-wrap md:flex-nowrap items-center text-sm text-gray-600 mt-2 space-x-4">
                                        <span>Price: ${app.price}</span>
                                        <span>Origin: {app.originCountry}</span>
                                        <span className="flex items-center space-x-1 bg-[#FFF0E1] px-2 py-1 rounded-full text-[#FF8811]">
                                            <img src={Rating_Icon} alt="Rating Icon" className="h-3 w-3" />
                                            <span>{app.rating}</span>
                                        </span>
                                        <span>Qty: {app.availableQuantity}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-row items-center space-x-4">
                                <button
                                    className="btn btn-sm mt-2 btn-error text-white rounded-sm text-center"
                                    onClick={() => handleDelete(app._id)}
                                    disabled={deletingId === app._id}
                                >
                                    {deletingId === app._id ? 'Removing...' : 'Remove'}
                                </button>


                                <NavLink
                                    to={`/productdetails/${app._id}`}
                                    className="btn btn-sm mt-2 text-white btn-primary rounded-sm text-center"
                                >
                                    See Details
                                </NavLink>
                                {/* <button
                                    className="px-4 py-2 rounded-sm text-white font-medium bg-[#627382] hover:opacity-90 transition flex-1"
                               
                                >
                                    Details
                                </button> */}
                            </div>

                        </div>
                    ))}

                    {myImport.length === 0 && (
                        <p className="col-span-full text-gray-500 text-5xl mt-6">
                            No Products Available.
                        </p>
                    )}
                </div>
            </section>



        </>
    );
};

export default MyImports;