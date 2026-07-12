import { useEffect, useState } from "react";
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
} from "react-icons/fa";

import toast from "react-hot-toast";
import api from "../../services/api";

function Bookings() {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    async function loadBookings() {

        try {

            const response = await api.get(
                `/bookings/user/${user.id}`
            );

            setBookings(response.data);

        } catch (err) {

            console.error(err);

            toast.error("Unable to load bookings");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        if (user) {

            void loadBookings();

        } else {

            setLoading(false);

        }

    }, [user]);

    const cancelBooking = async (bookingId) => {

        if (!window.confirm("Cancel this booking?")) {

            return;

        }

        try {

            await api.put(
                `/bookings/${bookingId}/cancel`
            );

            toast.success("Booking Cancelled");

            loadBookings();

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to cancel booking");

        }

    };

    const statusColor = (status) => {

        switch (status) {

            case "CONFIRMED":

                return "bg-green-100 text-green-700";

            case "PENDING":

                return "bg-yellow-100 text-yellow-700";

            case "CANCELLED":

                return "bg-red-100 text-red-700";

            default:

                return "bg-slate-100 text-slate-700";

        }

    };

    const statusIcon = (status) => {

        switch (status) {

            case "CONFIRMED":

                return <FaCheckCircle />;

            case "PENDING":

                return <FaClock />;

            default:

                return <FaTimesCircle />;

        }

    };

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-4xl font-black">

                    Loading Bookings...

                </h1>

            </div>

        );

    }
    return (

        <main className="min-h-screen bg-slate-100 pt-36 pb-20">

            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-12">

                    <p className="font-bold uppercase tracking-[8px] text-teal-600">

                        MY BOOKINGS

                    </p>

                    <h1 className="mt-4 text-5xl font-black text-slate-900">

                        Booking History

                    </h1>

                    <p className="mt-4 text-xl text-slate-500">

                        View and manage all your reservations.

                    </p>

                </div>

                {

                    bookings.length === 0 ? (

                        <div className="rounded-3xl bg-white p-16 text-center shadow-xl">

                            <h2 className="text-4xl font-black">

                                No Bookings Yet

                            </h2>

                            <p className="mt-4 text-slate-500">

                                Your upcoming trips will appear here.

                            </p>

                        </div>

                    ) : (

                        <div className="space-y-8">

                            {

                                bookings.map((booking) => (

                                    <div
                                        key={booking.bookingId}
                                        className="rounded-[30px] bg-white p-8 shadow-xl"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <h2 className="text-3xl font-black">

                                                    {booking.cabinName}

                                                </h2>

                                                <div className="mt-3 flex items-center gap-3 text-slate-500">

                                                    <FaMapMarkerAlt className="text-teal-600"/>

                                                    WanderNest Luxury Stay

                                                </div>

                                            </div>

                                            <div
                                                className={`flex items-center gap-2 rounded-full px-5 py-3 font-bold ${statusColor(
                                                    booking.bookingStatus
                                                )}`}
                                            >

                                                {statusIcon(booking.bookingStatus)}

                                                {booking.bookingStatus}

                                            </div>

                                        </div>

                                        <div className="mt-8 grid gap-8 md:grid-cols-4">

                                            <div>

                                                <p className="text-sm font-semibold uppercase text-slate-400">

                                                    Check In

                                                </p>

                                                <div className="mt-3 flex items-center gap-2">

                                                    <FaCalendarAlt className="text-teal-600"/>

                                                    {booking.checkInDate}

                                                </div>

                                            </div>

                                            <div>

                                                <p className="text-sm font-semibold uppercase text-slate-400">

                                                    Check Out

                                                </p>

                                                <div className="mt-3 flex items-center gap-2">

                                                    <FaCalendarAlt className="text-teal-600"/>

                                                    {booking.checkOutDate}

                                                </div>

                                            </div>

                                            <div>

                                                <p className="text-sm font-semibold uppercase text-slate-400">

                                                    Guests

                                                </p>

                                                <h3 className="mt-2 text-2xl font-black">

                                                    {booking.guests}

                                                </h3>

                                            </div>

                                            <div>

                                                <p className="text-sm font-semibold uppercase text-slate-400">

                                                    Total Paid

                                                </p>

                                                <h3 className="mt-2 text-3xl font-black text-teal-600">

                                                    ₹{Number(
                                                    booking.totalAmount
                                                ).toLocaleString("en-IN")}

                                                </h3>

                                            </div>

                                        </div>

                                        {

                                            booking.bookingStatus !== "CANCELLED" && (

                                                <div className="mt-8 flex justify-end">

                                                    <button
                                                        onClick={() =>
                                                            cancelBooking(
                                                                booking.bookingId
                                                            )
                                                        }
                                                        className="
                                                        rounded-xl
                                                        bg-red-600
                                                        px-6
                                                        py-3
                                                        font-semibold
                                                        text-white
                                                        transition
                                                        hover:bg-red-700
                                                        "
                                                    >

                                                        Cancel Booking

                                                    </button>

                                                </div>

                                            )

                                        }

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

export default Bookings;
