import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    FaStar,
    FaMapMarkerAlt,
    FaShareAlt,
    FaHeart,
    FaUserCircle,
    FaShieldAlt,
    FaBed,
    FaBath,
    FaUsers,
} from "react-icons/fa";

import api from "../../services/api";
import toast from "react-hot-toast";

import CabinGallery from "../../components/CabinGallery";
import Amenities from "../../components/Amenities";
import BookingCard from "../../components/BookingCard";
import ReviewsSection from "../../components/ReviewsSection";

function CabinDetails() {

    const { id } = useParams();

    const [cabin, setCabin] = useState(null);

    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const [liked, setLiked] = useState(false);

    async function fetchCabin() {

        try {

            const response = await api.get(`/cabins/${id}`);

            setCabin(response.data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        void fetchCabin();

    }, [id]);

    const handleWishlist = async () => {

        if (!user) {

            toast.error("Please login first");

            return;

        }

        try {

            if (!liked) {

                await api.post("/wishlist", {

                    userId: user.id,

                    cabinId: cabin.id

                });

                toast.success("Added to Wishlist");

                setLiked(true);

            }

            else {

                await api.delete(

                    `/wishlist/${user.id}/${cabin.id}`

                );

                toast.success("Removed from Wishlist");

                setLiked(false);

            }

        }

        catch (err) {

            console.error(err);

            toast.error("Something went wrong");

        }

    };

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-4xl font-black">

                    Loading Cabin...

                </h1>

            </div>

        );

    }

    if (!cabin) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-4xl font-black">

                    Cabin Not Found

                </h1>

            </div>

        );

    }

    return (

        <main className="min-h-screen bg-slate-50 pt-36 pb-20">

            <div className="mx-auto max-w-[1500px] px-8">

                <CabinGallery

                    images={cabin.imageUrls}

                />

                <div className="mt-10 mb-12 flex items-start justify-between">

                    <div>

                        <span className="rounded-full bg-teal-100 px-5 py-2 text-sm font-bold text-teal-700">

                            ⭐ Guest Favourite

                        </span>

                        <h1 className="mt-5 text-5xl font-black">

                            {cabin.title}

                        </h1>

                        <div className="mt-6 flex flex-wrap gap-8">

                            <span className="flex items-center gap-2">

                                <FaStar className="text-yellow-400"/>

                                {cabin.rating}

                            </span>

                            <span className="flex items-center gap-2">

                                <FaMapMarkerAlt className="text-teal-600"/>

                                {cabin.location}

                            </span>

                        </div>

                    </div>

                    <div className="flex gap-4">

                        <button className="rounded-2xl border bg-white px-6 py-3">

                            <FaShareAlt className="mr-2 inline"/>

                            Share

                        </button>

                        <button

                            onClick={handleWishlist}

                            className="rounded-2xl border bg-white px-6 py-3"

                        >

                            <FaHeart

                                className={`mr-2 inline ${
                                    liked
                                        ? "text-red-500"
                                        : "text-slate-400"
                                }`}

                            />

                            Save

                        </button>

                    </div>

                </div>

                <div className="grid gap-12 lg:grid-cols-3">

                    <div className="space-y-10 lg:col-span-2">
                        {/* About */}

                        <div className="rounded-3xl bg-white p-10 shadow-xl">

                            <h2 className="mb-6 text-3xl font-black">

                                About this Cabin

                            </h2>

                            <p className="text-lg leading-9 text-slate-600">

                                {cabin.description}

                            </p>

                        </div>

                        {/* Property Info */}

                        <div className="rounded-3xl bg-white p-10 shadow-xl">

                            <h2 className="mb-8 text-3xl font-black">

                                Property Details

                            </h2>

                            <div className="grid gap-8 md:grid-cols-3">

                                <div className="rounded-2xl bg-slate-50 p-6">

                                    <FaUsers className="mb-4 text-4xl text-teal-600"/>

                                    <p className="text-slate-500">

                                        Capacity

                                    </p>

                                    <h3 className="mt-2 text-3xl font-black">

                                        {cabin.capacity}

                                    </h3>

                                </div>

                                <div className="rounded-2xl bg-slate-50 p-6">

                                    <FaBed className="mb-4 text-4xl text-teal-600"/>

                                    <p className="text-slate-500">

                                        Bedrooms

                                    </p>

                                    <h3 className="mt-2 text-3xl font-black">

                                        {cabin.bedrooms}

                                    </h3>

                                </div>

                                <div className="rounded-2xl bg-slate-50 p-6">

                                    <FaBath className="mb-4 text-4xl text-teal-600"/>

                                    <p className="text-slate-500">

                                        Bathrooms

                                    </p>

                                    <h3 className="mt-2 text-3xl font-black">

                                        {cabin.bathrooms}

                                    </h3>

                                </div>

                            </div>

                        </div>

                        {/* Amenities */}

                        <div className="rounded-3xl bg-white p-10 shadow-xl">

                            <Amenities />

                        </div>

                        {/* Host */}

                        <div className="rounded-3xl bg-white p-10 shadow-xl">

                            <h2 className="mb-8 text-3xl font-black">

                                Meet Your Host

                            </h2>

                            <div className="flex items-center gap-6">

                                <FaUserCircle className="text-8xl text-teal-600"/>

                                <div>

                                    <h3 className="text-3xl font-black">

                                        {cabin.hostName}

                                    </h3>

                                    <p className="mt-2 text-slate-500">

                                        Verified WanderNest Host

                                    </p>

                                    <div className="mt-4 flex items-center gap-2 text-green-600">

                                        <FaShieldAlt/>

                                        Trusted Host

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Reviews */}

                        <ReviewsSection

                            cabinId={cabin.id}

                        />

                    </div>

                    {/* Booking Card */}

                    <div>

                        <BookingCard

                            cabin={cabin}

                        />

                    </div>

                </div>

            </div>

        </main>

    );

}

export default CabinDetails;
