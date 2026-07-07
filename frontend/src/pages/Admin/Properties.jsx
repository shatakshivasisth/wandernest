import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaMapMarkerAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
    getAllCabins,
    deleteCabin,
} from "../../services/cabinService";

function Properties() {

    const [cabins, setCabins] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCabins = async () => {

        try {

            const data = await getAllCabins();

            setCabins(data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load properties");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        void loadCabins();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCabin(id);

            toast.success("Property Deleted Successfully");

            await loadCabins();

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "This property has bookings and cannot be deleted."
            );

        }

    };

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-3xl font-bold">

                    Loading Properties...

                </h1>

            </div>

        );

    }

    return (

        <main className="min-h-screen bg-slate-100 py-36 px-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-12 flex items-center justify-between">

                    <div>

                        <h1 className="text-5xl font-black">

                            Properties

                        </h1>

                        <p className="mt-3 text-slate-500">

                            Manage all listed properties

                        </p>

                    </div>

                    <Link
                        to="/admin/add-cabin"
                        className="
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        bg-teal-600
                        px-7
                        py-4
                        font-bold
                        text-white
                        shadow-lg
                        transition
                        hover:bg-teal-700
                        "
                    >

                        <FaPlus />

                        Add Property

                    </Link>

                </div>

                {cabins.length === 0 ? (

                    <div className="rounded-3xl bg-white p-16 text-center shadow-lg">

                        <h2 className="text-3xl font-bold">

                            No Properties Found

                        </h2>

                    </div>

                ) : (

                    <div className="grid gap-8">

                        {cabins.map((cabin) => (

                            <div
                                key={cabin.id}
                                className="
                                flex
                                items-center
                                justify-between
                                rounded-3xl
                                bg-white
                                p-6
                                shadow-lg
                                "
                            >

                                <div className="flex items-center gap-6">

                                    <img
                                        src={
                                            cabin.imageUrls?.[0] &&
                                            cabin.imageUrls[0] !== ""
                                                ? cabin.imageUrls[0]
                                                : "https://picsum.photos/300/200"
                                        }
                                        alt={cabin.title}
                                        className="h-28 w-44 rounded-2xl object-cover"
                                    />

                                    <div>

                                        <h2 className="text-2xl font-bold">

                                            {cabin.title}

                                        </h2>

                                        <p className="mt-2 flex items-center gap-2 text-slate-500">

                                            <FaMapMarkerAlt />

                                            {cabin.location}

                                        </p>

                                        <p className="mt-3 text-xl font-bold text-teal-600">

                                            ₹{Number(cabin.pricePerNight).toLocaleString("en-IN")}

                                            <span className="ml-2 text-base font-normal text-slate-500">

                                                / night

                                            </span>

                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <Link
                                        to={`/admin/edit-cabin/${cabin.id}`}
                                        className="
                                        rounded-xl
                                        bg-blue-600
                                        px-5
                                        py-3
                                        text-white
                                        transition
                                        hover:bg-blue-700
                                        "
                                    >

                                        <FaEdit />

                                    </Link>

                                    <button
                                        onClick={() => handleDelete(cabin.id)}
                                        className="
                                        rounded-xl
                                        bg-red-600
                                        px-5
                                        py-3
                                        text-white
                                        transition
                                        hover:bg-red-700
                                        "
                                    >

                                        <FaTrash />

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>

    );

}

export default Properties;