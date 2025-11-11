import { useState } from "react";
import { NavLink } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { useSpring, animated } from '@react-spring/web';
const NavBar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [styles, api] = useSpring(
        () => ({
            x: 0,
            rotateZ: 0,
        }),
        []
    )

    const handleClick = () => {
        api.start({
            to: [
                { x: 200, rotateZ: 360 },
                { x: 0, rotateZ: 0 },
            ],
        })
    }
    return (
        <>
            <div className="navbar bg-white shadow-sm px-6 flex justify-between items-center">
                {/* Left - Logo + Text */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <NavLink to="/">
                        <animated.div
                            className="spring-box"
                            onClick={handleClick}
                            style={{
                                ...styles,
                                cursor: 'pointer',
                            }}>
                            <img src={logo} alt="Logo" className="rounded-full object-cover" width={60} height={60} />
                        </animated.div>

                    </NavLink>
                    <NavLink className="text-xl font-semibold tracking-wide" to="/">
                        Import Export Hub
                    </NavLink>
                </div>

                {/* Center - Menu */}
                <div className="hidden lg:flex gap-8 justify-center flex-1">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `cursor-pointer transition-colors ${isActive ? "text-[#632EE3] font-semibold" : "hover:text-[#632EE3]"}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/allproduct"
                        className={({ isActive }) =>
                            `cursor-pointer transition-colors ${isActive ? "text-[#632EE3] font-semibold" : "hover:text-[#632EE3]"}`
                        }
                    >
                        All Products
                    </NavLink>
                    {user ? (<>
                        <NavLink
                            to="/myprofile"
                            className={({ isActive }) =>
                                `cursor-pointer transition-colors ${isActive ? "text-[#632EE3] font-semibold" : "hover:text-[#632EE3]"}`
                            }
                        >
                            My Profile
                        </NavLink>

                    </>) : (
                        ""
                    )}


                </div>

                {/* Right - Button */}
                <div className="hidden lg:flex items-center">

                    {user ? (
                        <>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <p className="text-sm ml-2">
                                    {user.displayName || "User"}

                                </p>
                                <div className="mr-4">
                                    {user?.photoURL ? <img src={user?.photoURL} alt="picture" className="rounded-full object-cover" width={40} height={40} /> : <FaUserCircle className="text-2xl text-gray-600" />}
                                </div>

                            </div>
                            <button
                                onClick={logout}
                                className="btn btn-sm text-white btn-primary rounded-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="btn btn-sm text-white btn-primary rounded-sm"
                            >
                                LogIn
                            </NavLink>

                        </>
                    )}



                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-16 right-4 bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 lg:hidden w-48 z-50">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `cursor-pointer transition-colors ${isActive ? "text-[#632EE3] font-semibold" : "hover:text-[#632EE3]"}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/allproduct"
                            className={({ isActive }) =>
                                `cursor-pointer transition-colors ${isActive ? "text-[#632EE3] font-semibold" : "hover:text-[#632EE3]"}`
                            }
                        >
                            All Products
                        </NavLink>

                        {user && (
                            <>
                                <NavLink
                                    to="/myprofile"
                                    className={({ isActive }) =>
                                        `cursor-pointer transition-colors ${isActive ? "text-[#632EE3] font-semibold" : "hover:text-[#632EE3]"}`
                                    }
                                >
                                    My Profile
                                </NavLink>

                                {/* User Info + Logout */}
                                <div className="flex items-center gap-2 mt-2">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="rounded-full object-cover w-10 h-10"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-2xl text-gray-600" />
                                    )}
                                    <p className="text-sm font-medium">{user.displayName || "User"}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="btn btn-sm mt-2 text-white btn-primary rounded-sm"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {!user && (
                            <NavLink
                                to="/login"
                                className="btn btn-sm mt-2 text-white btn-primary rounded-sm"
                            >
                                LogIn
                            </NavLink>
                        )}
                    </div>
                )}

            </div>


        </>
    );
};

export default NavBar;