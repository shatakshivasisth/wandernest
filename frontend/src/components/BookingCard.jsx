import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
    FaCalendarAlt,
    FaUsers,
    FaShieldAlt,
    FaCheckCircle,
} from "react-icons/fa";

import api from "../services/api";

function BookingCard({ cabin }) {

    const [checkInDate, setCheckInDate] = useState("");

    const [checkOutDate, setCheckOutDate] = useState("");

    const [guests, setGuests] = useState(1);

    const user = JSON.parse(localStorage.getItem("user"));

    const nights = useMemo(() => {

        if (!checkInDate || !checkOutDate) return 1;

        const start = new Date(checkInDate);

        const end = new Date(checkOutDate);

        const diff = Math.ceil(

            (end - start) / (1000 * 60 * 60 * 24)

        );

        return diff > 0 ? diff : 1;

    }, [checkInDate, checkOutDate]);

    const serviceFee = 999;

    const taxes = 599;

    const total =

        cabin.pricePerNight * nights +

        serviceFee +

        taxes;

    const handleBooking = async () => {

        if (!user) {

            toast.error("Please login first");

            return;

        }

        if (!checkInDate) {

            toast.error("Select Check-In Date");

            return;

        }

        if (!checkOutDate) {

            toast.error("Select Check-Out Date");

            return;

        }

        if (new Date(checkOutDate) <= new Date(checkInDate)) {

            toast.error("Check-Out must be after Check-In");

            return;

        }

        try {

            await api.post("/bookings", {

                userId: user.id,

                cabinId: cabin.id,

                checkInDate,

                checkOutDate,

                guests

            });

            toast.success("🎉 Booking Successful");

            window.location.href = "/bookings";

        }

        catch (error) {

            console.error(error);

            toast.error("Booking Failed");

        }

    };
    return (

        <div
            className="
            sticky
            top-36
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-2xl
            "
        >

            {/* Price */}

            <div className="mb-8">

                <div className="flex items-end gap-2">

                    <h2 className="text-5xl font-black text-teal-600">

                        ₹{Number(cabin.pricePerNight).toLocaleString("en-IN")}

                    </h2>

                    <span className="mb-2 text-slate-500">

                        / night

                    </span>

                </div>

                <p className="mt-2 text-slate-500">

                    Free cancellation before check-in

                </p>

            </div>

            {/* Check In */}

            <div className="mb-5">

                <label className="mb-2 flex items-center gap-2 font-semibold">

                    <FaCalendarAlt className="text-teal-600"/>

                    Check In

                </label>

                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) =>
                        setCheckInDate(e.target.value)
                    }
                    className="w-full rounded-2xl border p-4"
                />

            </div>

            {/* Check Out */}

            <div className="mb-5">

                <label className="mb-2 flex items-center gap-2 font-semibold">

                    <FaCalendarAlt className="text-teal-600"/>

                    Check Out

                </label>

                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) =>
                        setCheckOutDate(e.target.value)
                    }
                    className="w-full rounded-2xl border p-4"
                />

            </div>

            {/* Guests */}

            <div className="mb-8">

                <label className="mb-2 flex items-center gap-2 font-semibold">

                    <FaUsers className="text-teal-600"/>

                    Guests

                </label>

                <select
                    value={guests}
                    onChange={(e) =>
                        setGuests(Number(e.target.value))
                    }
                    className="w-full rounded-2xl border p-4"
                >

                    {[1,2,3,4,5,6,7,8].map(num => (

                        <option
                            key={num}
                            value={num}
                        >

                            {num} Guest{num>1?"s":""}

                        </option>

                    ))}

                </select>

            </div>

            {/* Book */}

            <button
                onClick={handleBooking}
                className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-teal-600
                to-cyan-600
                py-4
                text-lg
                font-bold
                text-white
                transition
                hover:scale-[1.02]
                "
            >

                Reserve Now

            </button>

            {/* Price */}

            <div className="mt-8 border-t pt-6">

                <div className="mb-3 flex justify-between">

                    <span>

                        ₹{Number(cabin.pricePerNight).toLocaleString("en-IN")} × {nights} night{nights>1?"s":""}

                    </span>

                    <span>

                        ₹{(
                        cabin.pricePerNight*nights
                    ).toLocaleString("en-IN")}

                    </span>

                </div>

                <div className="mb-3 flex justify-between">

                    <span>

                        Service Fee

                    </span>

                    <span>

                        ₹{serviceFee.toLocaleString("en-IN")}

                    </span>

                </div>

                <div className="mb-5 flex justify-between">

                    <span>

                        Taxes

                    </span>

                    <span>

                        ₹{taxes.toLocaleString("en-IN")}

                    </span>

                </div>

                <div className="flex justify-between border-t pt-5">

                    <span className="text-xl font-bold">

                        Total

                    </span>

                    <span className="text-2xl font-black text-teal-600">

                        ₹{total.toLocaleString("en-IN")}

                    </span>

                </div>

            </div>

            <div className="mt-8 rounded-2xl bg-green-50 p-5">

                <div className="mb-2 flex items-center gap-2 text-green-700">

                    <FaShieldAlt/>

                    <span className="font-semibold">

                        Secure Booking

                    </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-green-700">

                    <FaCheckCircle/>

                    Instant Confirmation

                </div>

            </div>

        </div>

    );

}

export default BookingCard;