import {
    FaUserCircle,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaStar,
    FaSuitcaseRolling,
    FaHeart,
    FaCog,
} from "react-icons/fa";

function Profile() {
    return (
        <main className="min-h-screen bg-slate-100 pt-40 pb-20">

            <div className="mx-auto max-w-7xl px-8">

                {/* Heading */}

                <div className="mb-12">

                    <p className="uppercase tracking-[8px] font-bold text-teal-600">

                        MY PROFILE

                    </p>

                    <h1 className="mt-4 text-5xl font-black text-slate-900">

                        Welcome Back

                    </h1>

                </div>

                <div className="grid gap-10 lg:grid-cols-3">

                    {/* LEFT */}

                    <div className="rounded-[32px] bg-white p-10 shadow-xl">

                        <div className="flex flex-col items-center">

                            <FaUserCircle className="text-[140px] text-teal-600" />

                            <h2 className="mt-6 text-center text-4xl font-black text-slate-900">

                                Shatakshi Vasisth

                            </h2>

                            <p className="mt-2 text-lg text-slate-500">

                                Premium Traveller

                            </p>

                        </div>

                        <div className="mt-10 space-y-6">

                            <div className="flex items-center gap-4">

                                <FaEnvelope className="text-teal-600" />

                                <span>shatakshi@email.com</span>

                            </div>

                            <div className="flex items-center gap-4">

                                <FaPhone className="text-teal-600" />

                                <span>+91 9876543210</span>

                            </div>

                            <div className="flex items-center gap-4">

                                <FaMapMarkerAlt className="text-teal-600" />

                                <span>New Delhi, India</span>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="lg:col-span-2">

                        <div className="grid grid-cols-3 gap-6">

                            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

                                <FaSuitcaseRolling className="mx-auto text-5xl text-teal-600" />

                                <h2 className="mt-5 text-5xl font-black">

                                    12

                                </h2>

                                <p className="mt-2 text-slate-500">

                                    Trips

                                </p>

                            </div>

                            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

                                <FaHeart className="mx-auto text-5xl text-red-500" />

                                <h2 className="mt-5 text-5xl font-black">

                                    8

                                </h2>

                                <p className="mt-2 text-slate-500">

                                    Wishlist

                                </p>

                            </div>

                            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

                                <FaStar className="mx-auto text-5xl text-yellow-500" />

                                <h2 className="mt-5 text-5xl font-black">

                                    4.9

                                </h2>

                                <p className="mt-2 text-slate-500">

                                    Rating

                                </p>

                            </div>

                        </div>

                        <div className="mt-10 rounded-[32px] bg-white p-8 shadow-xl">

                            <h2 className="mb-8 text-3xl font-black">

                                Account Settings

                            </h2>

                            <button
                                className="
                                flex
                                w-full
                                items-center
                                gap-4
                                rounded-2xl
                                bg-slate-100
                                px-6
                                py-5
                                text-lg
                                font-semibold
                                transition
                                hover:bg-teal-600
                                hover:text-white
                                "
                            >

                                <FaCog />

                                Edit Profile

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Profile;