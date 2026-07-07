import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaHeart,
    FaStar,
    FaMapMarkerAlt,
    FaArrowRight,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

function CabinCard({
                       id,
                       image,
                       title,
                       location,
                       price,
                       rating,
                   }) {

    const user = JSON.parse(localStorage.getItem("user"));

    const [liked, setLiked] = useState(false);

    const handleWishlist = async (e) => {

        e.preventDefault();

        if (!user) {

            toast.error("Please login first");

            return;

        }

        try {

            if (!liked) {

                await api.post("/wishlist", {

                    userId: user.id,

                    cabinId: id

                });

                toast.success("Added to Wishlist");

                setLiked(true);

            }

            else {

                await api.delete(
                    `/wishlist/${user.id}/${id}`
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

    return (

        <div
            className="
            group
            overflow-hidden
            rounded-[30px]
            bg-white
            shadow-lg
            transition-all
            duration-500
            hover:-translate-y-3
            hover:shadow-2xl
            "
        >

            <div className="relative h-[300px] overflow-hidden">

                <img
                    src={image}
                    alt={title}
                    className="
                    h-full
                    w-full
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-110
                    "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                <div
                    className="
                    absolute
                    left-5
                    top-5
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white
                    px-4
                    py-2
                    shadow-lg
                    "
                >

                    <FaStar className="text-yellow-400" />

                    <span className="font-bold">

                        {rating}

                    </span>

                </div>

                <button

                    onClick={handleWishlist}

                    className="
                    absolute
                    right-5
                    top-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-110
                    "

                >

                    <FaHeart

                        className={
                            liked
                                ? "text-red-500"
                                : "text-slate-400"
                        }

                    />

                </button>

                <div
                    className="
                    absolute
                    bottom-5
                    left-5
                    rounded-full
                    bg-white
                    px-4
                    py-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[2px]
                    text-teal-700
                    shadow-lg
                    "
                >

                    Guest Favourite

                </div>
            </div>

            {/* CONTENT */}

            <div className="p-7">

                <h2 className="text-3xl font-black text-slate-900">

                    {title}

                </h2>

                <div className="mt-4 flex items-center gap-2 text-slate-500">

                    <FaMapMarkerAlt className="text-teal-600" />

                    <span className="text-lg">

                        {location}

                    </span>

                </div>

                <div className="mt-8 flex items-center justify-between">

                    <div>

                        <div className="flex items-end gap-2">

                            <span className="text-4xl font-black text-teal-600">

                                ₹{Number(price).toLocaleString("en-IN")}

                            </span>

                            <span className="mb-1 text-slate-500">

                                / night

                            </span>

                        </div>

                        <p className="mt-2 font-medium text-green-600">

                            ✓ Free Cancellation

                        </p>

                    </div>

                    <Link
                        to={`/cabins/${id}`}
                        className="
                        flex
                        items-center
                        gap-3
                        rounded-full
                        bg-gradient-to-r
                        from-teal-600
                        to-cyan-600
                        px-7
                        py-4
                        font-semibold
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-105
                        "
                    >

                        View

                        <FaArrowRight />

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default CabinCard;