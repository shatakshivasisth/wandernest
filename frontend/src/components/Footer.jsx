import {
    FaMountain,
    FaInstagram,
    FaFacebook,
    FaLinkedin,
    FaGithub,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="mt-24 bg-slate-950 text-white">

            {/* Top */}

            <div className="mx-auto max-w-[1700px] px-8 py-20">

                <div className="grid gap-14 lg:grid-cols-4">

                    {/* Brand */}

                    <div>

                        <div className="flex items-center gap-3">

                            <FaMountain className="text-4xl text-teal-400" />

                            <h2 className="text-4xl font-black">

                                WanderNest

                            </h2>

                        </div>

                        <p className="mt-6 leading-8 text-slate-400">

                            Discover luxury cabins, mountain escapes,
                            lakeside retreats and unforgettable travel
                            experiences across India.

                        </p>

                        <div className="mt-8 flex gap-4">

                            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-teal-600">

                                <FaInstagram />

                            </button>

                            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-teal-600">

                                <FaFacebook />

                            </button>

                            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-teal-600">

                                <FaLinkedin />

                            </button>

                            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-teal-600">

                                <FaGithub />

                            </button>

                        </div>

                    </div>

                    {/* Explore */}

                    <div>

                        <h3 className="mb-6 text-2xl font-bold">

                            Explore

                        </h3>

                        <div className="space-y-4">

                            <Link className="block text-slate-400 hover:text-white" to="/">

                                Home

                            </Link>

                            <Link className="block text-slate-400 hover:text-white" to="/cabins">

                                Cabins

                            </Link>

                            <Link className="block text-slate-400 hover:text-white" to="/login">

                                Login

                            </Link>

                            <Link className="block text-slate-400 hover:text-white" to="/register">

                                Register

                            </Link>

                        </div>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-6 text-2xl font-bold">

                            Contact

                        </h3>

                        <div className="space-y-5">

                            <div className="flex items-center gap-3">

                                <FaEnvelope className="text-teal-400"/>

                                support@wandernest.com

                            </div>

                            <div className="flex items-center gap-3">

                                <FaPhone className="text-teal-400"/>

                                +91 9876543210

                            </div>

                            <div className="flex items-start gap-3">

                                <FaMapMarkerAlt className="mt-1 text-teal-400"/>

                                New Delhi, India

                            </div>

                        </div>

                    </div>

                    {/* Newsletter */}

                    <div>

                        <h3 className="mb-6 text-2xl font-bold">

                            Newsletter

                        </h3>

                        <p className="mb-6 text-slate-400">

                            Get exclusive deals and travel inspiration.

                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="
                            mb-4
                            w-full
                            rounded-2xl
                            bg-slate-800
                            px-5
                            py-4
                            outline-none
                            "
                        />

                        <button
                            className="
                            w-full
                            rounded-2xl
                            bg-gradient-to-r
                            from-teal-600
                            to-cyan-600
                            py-4
                            font-bold
                            transition
                            hover:scale-[1.02]
                            "
                        >

                            Subscribe

                        </button>

                    </div>

                </div>

            </div>

            {/* Bottom */}

            <div className="border-t border-slate-800">

                <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 px-8 py-8 text-slate-500 lg:flex-row">

                    <p>

                        © 2026 WanderNest. All Rights Reserved.

                    </p>

                    <div className="flex gap-8">

                        <button className="hover:text-white">

                            Privacy Policy

                        </button>

                        <button className="hover:text-white">

                            Terms & Conditions

                        </button>

                        <button className="hover:text-white">

                            Support

                        </button>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;