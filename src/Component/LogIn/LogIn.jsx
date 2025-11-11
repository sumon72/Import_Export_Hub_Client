import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.init";
import { useAuth } from "../../context/AuthContext.jsx";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router";

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const pageFrom = location.state?.from?.pathname || "/";
    const { setUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validateForm = () => {
        const { email, password } = formData;
        const newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email))
            newErrors.email = "Enter a valid email address.";
        if (!password.trim()) newErrors.password = "Password is required.";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";
        else if (!/[A-Z]/.test(password))
            newErrors.password = "Must contain an uppercase letter.";
        else if (!/[a-z]/.test(password))
            newErrors.password = "Must contain a lowercase letter.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const { email, password } = formData;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            toast.success("Login successful!");
            navigate(pageFrom, { replace: true });
        } catch (err) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;
            setUser(user);
            toast.success("Login successful!");
            navigate(pageFrom, { replace: true });
        } catch (error) {
            toast.error(err.message || "Login failed");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-primary mb-6">
                    Log in to your account
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email address
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="text"
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
                        <label className="block text-sm font-medium">
                            Password
                        </label>

                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            //placeholder="At least 6 characters And 1 Uppercase And 1 Lowercase"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300
                ${errors.password ? "border-red-400" : "border-gray-200"}`}
                        />

                        {/* Eye icon */}
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
                    <div className="flex justify-end">
                        <NavLink
                            to="/forgotpassword"
                            state={{ email: formData.email }}
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Forgot Password?
                        </NavLink>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 font-semibold btn text-white btn-primary rounded-sm"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>


                <div className="flex flex-col items-center w-full gap-3">
                    <span className="text-center font-medium">Or</span>

                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-2 font-semibold btn text-white btn-primary rounded-sm"
                    >
                        <FaGoogle className="text-lg" />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <div className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <NavLink to="/register" className="text-indigo-600 hover:underline">
                        Sign up
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
