import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast from 'react-hot-toast';
import { NavLink, useLocation } from "react-router";

const ForgotPassword = () => {
    const location = useLocation(); 
    const prefilledEmail = location.state?.email || "";
    const [email, setEmail] = useState(prefilledEmail);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent. Check your inbox!");
            setEmail("");
            window.open("https://mail.google.com", "_blank");
        } catch (error) { 
            toast.error(error.message || "Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Forgot Password</h2>

                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-primary rounded-sm w-full"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Reset Password"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Remember your password?{" "}
                    <NavLink to="/login" className="text-blue-600 hover:underline">
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
