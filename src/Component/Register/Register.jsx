import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.init";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import { NavLink } from "react-router";
const Register = () => {
    const { user, refreshUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photoURL: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validateForm = () => {
        const { name, email, password, photoURL } = formData;
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email))
            newErrors.email = "Enter a valid email address.";
        if (!password.trim()) newErrors.password = "Password is required.";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";
        else if (!/[A-Z]/.test(password))
            newErrors.password = "Password must contain at least one uppercase letter.";
        else if (!/[a-z]/.test(password))
            newErrors.password = "Password must contain at least one lowercase letter."; 
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const { email, password, name, photoURL } = formData;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with name and photo
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL,
            });

            setFormData({ name: "", email: "", password: "", photoURL: "" });
            setErrors({});
            await refreshUser();
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            await refreshUser();
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-primary mb-6">
                    SignUp
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Your Name"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300
              ${errors.name ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Image URL
                        </label>
                        <input
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleChange}
                            type="text"
                            placeholder="https://example.com/your-photo.jpg"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300
              ${errors.photoURL ? "border-red-400" : "border-gray-200"}`}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email address
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300
                ${errors.email ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300
                ${errors.password ? "border-red-400" : "border-gray-200"}`}
                        />
                        <span
                            className="absolute right-2 mt-3 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                        </span>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 font-semibold btn text-white btn-primary rounded-sm"
                        >
                            {loading ? "Creating..." : "Register"}
                        </button>
                    </div>
                </form>

                <div className="flex flex-col items-center w-full gap-3 mt-4">
                    <span className="text-center font-medium">Or</span>
                    <button
                        onClick={handleGoogleSignup}
                        type="button"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-2 font-semibold btn text-white btn-primary rounded-sm"
                    >
                        <FaGoogle className="text-lg" />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <div className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-indigo-600 hover:underline">
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;
