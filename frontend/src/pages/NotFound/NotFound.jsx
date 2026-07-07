import { Link } from "react-router-dom";
import { FaMountain, FaArrowLeft } from "react-icons/fa";

function NotFound() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-700 px-6">

            <div className="max-w-3xl text-center">

                <div
                    className="
                    mx-auto
                    mb-8
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-2xl
                    "
                >

                    <FaMountain className="text-6xl text-teal-600" />

                </div>

                <h1 className="text-8xl font-black text-white">

                    404

                </h1>

                <h2 className="mt-6 text-4xl font-black text-white">

                    Cabin Not Found

                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-200">

                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back to exploring beautiful luxury cabins.

                </p>

                <Link
                    to="/"
                    className="
                    mt-10
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-white
                    px-8
                    py-4
                    text-lg
                    font-bold
                    text-teal-700
                    shadow-xl
                    transition-all
                    duration-300
                    hover:scale-105
                    "
                >

                    <FaArrowLeft />

                    Back to Home

                </Link>

            </div>

        </section>
    );
}

export default NotFound;