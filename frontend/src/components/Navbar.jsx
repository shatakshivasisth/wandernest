import { Link, useNavigate } from "react-router-dom";
import {
    FaMountain,
    FaHeart,
    FaRobot,
    FaUserCircle,
    FaCalendarCheck,
    FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <header className="fixed top-0 left-0 z-50 w-full">

            <nav
                className="
                mx-auto
                mt-5
                flex
                h-24
                w-[97%]
                max-w-[1700px]
                items-center
                justify-between
                rounded-3xl
                border
                border-white/20
                bg-black/30
                px-10
                backdrop-blur-2xl
                shadow-2xl
                "
            >

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-4"
                >

                    <FaMountain className="text-4xl text-teal-400" />

                    <h1 className="text-4xl font-black text-white">

                        WanderNest

                    </h1>

                </Link>

                {/* Center Menu */}

                <div className="hidden xl:flex items-center gap-10">

                    <Link
                        to="/"
                        className="font-semibold text-white transition hover:text-teal-300"
                    >
                        Home
                    </Link>

                    <Link
                        to="/cabins"
                        className="font-semibold text-white transition hover:text-teal-300"
                    >
                        Cabins
                    </Link>

                    <Link
                        to="/ai-planner"
                        className="flex items-center gap-2 font-semibold text-white transition hover:text-teal-300"
                    >
                        <FaRobot />
                        AI Planner
                    </Link>

                    <Link
                        to="/wishlist"
                        className="flex items-center gap-2 font-semibold text-white transition hover:text-teal-300"
                    >
                        <FaHeart />
                        Wishlist
                    </Link>

                    <Link
                        to="/bookings"
                        className="flex items-center gap-2 font-semibold text-white transition hover:text-teal-300"
                    >
                        <FaCalendarCheck />
                        Bookings
                    </Link>

                </div>

                {/* Right Side */}

                {!user ? (

                    <div className="flex items-center gap-4">

                        <Link
                            to="/login"
                            className="
                            rounded-full
                            border
                            border-white/30
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-white/10
                            "
                        >

                            Login

                        </Link>

                        <Link
                            to="/register"
                            className="
                            rounded-full
                            bg-gradient-to-r
                            from-teal-600
                            to-cyan-600
                            px-7
                            py-3
                            font-semibold
                            text-white
                            shadow-lg
                            transition
                            hover:scale-105
                            "
                        >

                            Register

                        </Link>

                    </div>

                ) : (

                    <div className="flex items-center gap-4">

                        <Link
                            to="/profile"
                            className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            bg-white
                            px-6
                            py-3
                            font-semibold
                            text-slate-900
                            "
                        >

                            <FaUserCircle />

                            Profile

                        </Link>

                        <button
                            onClick={handleLogout}
                            className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            bg-red-500
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-600
                            "
                        >

                            <FaSignOutAlt />

                            Logout

                        </button>

                    </div>

                )}

            </nav>

        </header>

    );

}

export default Navbar;