import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaHeart,
    FaMapMarkerAlt,
    FaStar,
    FaTrash,
} from "react-icons/fa";

import toast from "react-hot-toast";
import api from "../../services/api";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (user) {

            loadWishlist();

        }

    }, []);

    const loadWishlist = async () => {

        try {

            const response = await api.get(

                `/wishlist/${user.id}`

            );

            setWishlist(response.data);

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to load wishlist");

        }

        finally {

            setLoading(false);

        }

    };

    const removeWishlist = async (cabinId) => {

        try {

            await api.delete(

                `/wishlist/${user.id}/${cabinId}`

            );

            toast.success("Removed from Wishlist");

            loadWishlist();

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to remove");

        }

    };

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-4xl font-black">

                    Loading Wishlist...

                </h1>

            </div>

        );

    }

    return (

        <main className="min-h-screen bg-slate-100 pt-36 pb-20">

            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-12">

                    <p className="font-bold uppercase tracking-[8px] text-teal-600">

                        MY WISHLIST

                    </p>

                    <h1 className="mt-4 text-5xl font-black">

                        Saved Cabins

                    </h1>

                    <p className="mt-4 text-xl text-slate-500">

                        Your favourite WanderNest stays.

                    </p>

                </div>

                {
                    wishlist.length === 0 ? (

                        <div className="rounded-3xl bg-white p-20 text-center shadow-xl">

                            <FaHeart className="mx-auto text-7xl text-red-500"/>

                            <h2 className="mt-6 text-4xl font-black">

                                Wishlist is Empty

                            </h2>

                            <p className="mt-3 text-slate-500">

                                Save cabins to view them here.

                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {

                                wishlist.map((item) => (

                                    <div
                                        key={item.wishlistId}
                                        className="
                                        overflow-hidden
                                        rounded-[30px]
                                        bg-white
                                        shadow-xl
                                        transition-all
                                        duration-300
                                        hover:-translate-y-2
                                        hover:shadow-2xl
                                        "
                                    >

                                        <img
                                            src={item.imageUrl}
                                            alt={item.cabinTitle}
                                            className="h-72 w-full object-cover"
                                        />

                                        <div className="p-7">

                                            <div className="flex items-start justify-between">

                                                <div>

                                                    <h2 className="text-2xl font-black">

                                                        {item.cabinTitle}

                                                    </h2>

                                                    <div className="mt-3 flex items-center gap-2 text-slate-500">

                                                        <FaMapMarkerAlt className="text-teal-600" />

                                                        {item.location}

                                                    </div>

                                                </div>

                                                <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 font-bold text-yellow-700">

                                                    <FaStar />

                                                    {item.rating}

                                                </div>

                                            </div>

                                            <div className="mt-6 flex items-end justify-between">

                                                <div>

                                                    <span className="text-4xl font-black text-teal-600">

                                                        ₹{Number(item.price).toLocaleString("en-IN")}

                                                    </span>

                                                    <p className="text-slate-500">

                                                        / night

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="mt-8 flex gap-4">

                                                <Link
                                                    to={`/cabins/${item.cabinId}`}
                                                    className="
                                                    flex-1
                                                    rounded-xl
                                                    bg-gradient-to-r
                                                    from-teal-600
                                                    to-cyan-600
                                                    py-4
                                                    text-center
                                                    font-bold
                                                    text-white
                                                    transition
                                                    hover:scale-[1.02]
                                                    "
                                                >

                                                    View Cabin

                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        removeWishlist(
                                                            item.cabinId
                                                        )
                                                    }
                                                    className="
                                                    flex
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-red-600
                                                    px-6
                                                    text-white
                                                    transition
                                                    hover:bg-red-700
                                                    "
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </main>

    );

}

export default Wishlist;