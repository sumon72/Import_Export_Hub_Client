import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Rating_Icon from "../../assets/icon-ratings.png";
import { NavLink } from "react-router";
import api from "../../api/axiosInstance";
import Loader from "../../Component/Loader/Loader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const AddExport = () => {
    const { user, logout } = useAuth();
    const [myExports, setMyExports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);


    const GetMyExportsList = async () => {
        try {
            const email = user.email;
            const token = user ? await user.getIdToken() : null;
            const response = await api.get(`/allproducts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMyExports(response.data);
        } catch (error) {
            toast.error(error.message || "Network failed");
        } finally {

            setLoading(false);
        }
    };


    // const handleDelete = async (id) => {
    //     try {

    //         const token = user ? await user.getIdToken() : null;
    //         const response = await api.delete(`/deletemyexports/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         GetMyExportsList();
    //         toast.success(response.data.message);
    //     } catch (error) {
    //         toast.error(error.message || "Network failed");
    //     } finally {

    //         setLoading(false);
    //     }
    // };



    useEffect(() => {
        GetMyExportsList();
    }, []);



    const [modalOpen, setModalOpen] = useState(false);
    const [editingExport, setEditingExport] = useState(null);
    const [formData, setFormData] = useState({
        productName: '',
        productImage: '',
        price: '',
        originCountry: '',
        rating: '',
        availableQuantity: '',
        email: user.email
    });


    const handleOpenModal = (app = null) => {
        setEditingExport(app);
        if (app) {
            setFormData(app);
        } else {
            setFormData({
                productName: '',
                productImage: '',
                price: '',
                originCountry: '',
                rating: '',
                availableQuantity: '',
                _id: '',
                email: user.email
            });
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingExport(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (editingExport) {
            // Edit existing
            setMyExports((prev) =>
                prev.map((app) => (app._id === editingExport._id ? { ...formData, _id: app._id } : app))
            );

            const token = user ? await user.getIdToken() : null;
            const response = await api.put(`/exportmyproductupdate/${formData._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            GetMyExportsList();
            toast.success(response.data.message);

        } else {

            const token = user ? await user.getIdToken() : null;
            const response = await api.post('/exportmyproductsave', formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            GetMyExportsList();
            toast.success(response.data.message);


        }
        handleCloseModal();
    };


    if (loading) return <Loader />;

    return (
        <>
            <section className="py-16 px-4 bg-base-100 text-center">
                <h2 className="text-3xl font-bold">Add Exports/Products</h2>

                <div className="max-w-6xl mx-auto flex justify-between mt-10">
                    <div>
                        <span>({myExports.length})</span>
                        <span> Total Add Exports/Products</span>
                    </div>
                    <button
                        className="btn btn-sm mt-2 text-white btn-primary rounded-sm text-center"
                        onClick={() => handleOpenModal()}
                    >
                        Add Export
                    </button>
                </div>

                <div className="space-y-4 mt-5 max-w-6xl mx-auto">
                    {myExports.map((app, i) => (
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
                            {/* <div className="flex flex-row items-center space-x-4">
                                <button
                                    className="btn btn-sm mt-2 text-white btn-primary rounded-sm text-center"
                                    onClick={() => handleDelete(app._id)}
                                    disabled={deletingId === app._id}
                                >
                                    {deletingId === app._id ? 'Removing...' : 'Remove'}
                                </button>

                                <button
                                    className="btn btn-sm mt-2 text-white btn-primary rounded-sm text-center"
                                    onClick={() => handleOpenModal(app)}
                                >
                                    Edit
                                </button>
                            </div> */}
                        </div>
                    ))}

                    {myExports.length === 0 && (
                        <p className="col-span-full text-gray-500 text-5xl mt-6">No Products Available.</p>
                    )}
                </div>

                {/* DaisyUI Modal */}
                {modalOpen && (
                    <dialog open className="modal modal-bottom sm:modal-middle">
                        <div
                            className="
        modal-box rounded-2xl 
        w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl
        px-4 sm:px-6 md:px-8
      "
                        >
                            <h3 className="font-bold text-xl mb-3 text-gray-800 text-center sm:text-left">
                                {editingExport ? 'Edit Product' : 'Add Product'}
                            </h3>
                            <p className="mb-4 text-gray-600 text-sm sm:text-base text-center sm:text-left">
                                {editingExport
                                    ? 'Update your product details below.'
                                    : 'Enter the details of your new product.'}
                            </p>

                            {/* Image preview if available */}
                            {formData.productImage && (
                                <div className="flex justify-center mb-3">
                                    <img
                                        src={formData.productImage}
                                        alt="Preview"
                                        className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg shadow-sm"
                                    />
                                </div>
                            )}

                            <div
                                className="
          grid grid-cols-1 sm:grid-cols-2 gap-3
        "
                            >
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Product Name"
                                    value={formData.productName}
                                    onChange={handleFormChange}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="text"
                                    name="productImage"
                                    placeholder="Product Image URL"
                                    value={formData.productImage}
                                    onChange={handleFormChange}
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="text"
                                    name="originCountry"
                                    placeholder="Origin Country"
                                    value={formData.originCountry}
                                    onChange={handleFormChange}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="number"
                                    name="rating"
                                    placeholder="Rating (1-5)"
                                    value={formData.rating}
                                    onChange={handleFormChange}
                                    min="0"
                                    max="5"
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="number"
                                    name="availableQuantity"
                                    placeholder="Available Quantity"
                                    value={formData.availableQuantity}
                                    onChange={handleFormChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div
                                className="
          modal-action flex flex-col sm:flex-row
          justify-end sm:justify-between md:justify-end
          gap-2 sm:gap-3 mt-6
        "
                            >
                                <button
                                    className="btn btn-primary text-white w-full sm:w-auto rounded-md"
                                    onClick={handleSave}
                                >
                                    {editingExport ? 'Save Changes' : 'Add Product'}
                                </button>
                                <button
                                    className="btn btn-neutral w-full sm:w-auto rounded-md"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        {/* Backdrop */}
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => setModalOpen(false)}>close</button>
                        </form>
                    </dialog>
                )}


            </section>


        </>
    );
};

export default AddExport;