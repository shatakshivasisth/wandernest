import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaCheckCircle, FaShieldAlt, FaUsers } from "react-icons/fa";
import api from "../services/api";
import { createOrder, loadRazorpayScript, verifyPayment } from "../services/paymentService";

function BookingCard({ cabin }) {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const nights = useMemo(() => {
        if (!checkInDate || !checkOutDate) return 1;
        const difference = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / 86400000);
        return difference > 0 ? difference : 1;
    }, [checkInDate, checkOutDate]);

    const total = cabin.pricePerNight * nights;
    const today = new Date().toISOString().split("T")[0];

    const handleBooking = async () => {
        if (!user) return toast.error("Please login first");
        if (!checkInDate || !checkOutDate) return toast.error("Select your check-in and check-out dates");
        if (new Date(checkOutDate) <= new Date(checkInDate)) return toast.error("Check-out must be after check-in");
        if (guests > cabin.capacity) return toast.error(`This cabin accommodates up to ${cabin.capacity} guests`);

        let bookingId;
        let paymentCompleted = false;
        let cancellationPromise;

        const cancelPendingBooking = () => {
            if (!bookingId || paymentCompleted) return Promise.resolve(false);
            if (cancellationPromise) return cancellationPromise;

            cancellationPromise = api.delete(`/bookings/${bookingId}`)
                .then(() => true)
                .catch((error) => {
                    console.error("Unable to cancel pending booking:", error);
                    toast.error("Unable to cancel the pending booking. Please contact support.");
                    return false;
                });

            return cancellationPromise;
        };

        try {
            setIsProcessing(true);
            const booking = await api.post("/bookings", {
                userId: user.id,
                cabinId: cabin.id,
                checkInDate,
                checkOutDate,
                guests,
            });

            bookingId = booking.data.bookingId;
            const razorpayLoaded = await loadRazorpayScript();

            if (!razorpayLoaded) {
                await cancelPendingBooking();
                toast.error("Unable to load the payment service. Please try again.");
                setIsProcessing(false);
                return;
            }

            const order = await createOrder(bookingId, booking.data.totalAmount);
            const checkout = new window.Razorpay({
                key: order.key,
                amount: order.amount,
                currency: order.currency,
                name: "WanderNest",
                description: `Reservation for ${cabin.title}`,
                order_id: order.orderId,
                prefill: { name: user.fullName, email: user.email },
                theme: { color: "#0d9488" },
                handler: async (payment) => {
                    try {
                        await verifyPayment(payment);
                        paymentCompleted = true;
                        toast.success("Payment successful. Your booking is confirmed.");
                        window.location.assign("/bookings");
                    } catch (error) {
                        console.error(error);
                        if (await cancelPendingBooking()) {
                            toast.error("Payment verification failed. The pending booking was cancelled.");
                        }
                    } finally {
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: async () => {
                        if (await cancelPendingBooking()) {
                            toast("Payment cancelled. Your pending booking was removed.");
                        }
                        setIsProcessing(false);
                    },
                },
            });

            checkout.on("payment.failed", async () => {
                if (await cancelPendingBooking()) {
                    toast.error("Payment failed. Your pending booking was cancelled.");
                }
                setIsProcessing(false);
            });

            checkout.open();
        } catch (error) {
            console.error(error);
            await cancelPendingBooking();
            toast.error(error.response?.data?.message || "Unable to start your booking.");
            setIsProcessing(false);
        }
    };

    return (
        <aside className="sticky top-36 rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="mb-8">
                <div className="flex items-end gap-2">
                    <h2 className="text-5xl font-black text-teal-600">₹{Number(cabin.pricePerNight).toLocaleString("en-IN")}</h2>
                    <span className="mb-2 text-slate-500">/ night</span>
                </div>
                <p className="mt-2 text-slate-500">Free cancellation before check-in</p>
            </div>

            <label className="mb-5 block font-semibold"><span className="mb-2 flex items-center gap-2"><FaCalendarAlt className="text-teal-600" />Check in</span><input type="date" min={today} value={checkInDate} onChange={(event) => setCheckInDate(event.target.value)} className="w-full rounded-2xl border p-4" /></label>
            <label className="mb-5 block font-semibold"><span className="mb-2 flex items-center gap-2"><FaCalendarAlt className="text-teal-600" />Check out</span><input type="date" min={checkInDate || today} value={checkOutDate} onChange={(event) => setCheckOutDate(event.target.value)} className="w-full rounded-2xl border p-4" /></label>
            <label className="mb-8 block font-semibold"><span className="mb-2 flex items-center gap-2"><FaUsers className="text-teal-600" />Guests</span><select value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="w-full rounded-2xl border p-4">{Array.from({ length: Math.max(1, Math.min(cabin.capacity || 1, 20)) }, (_, index) => index + 1).map((number) => <option key={number} value={number}>{number} Guest{number > 1 ? "s" : ""}</option>)}</select></label>

            <button onClick={handleBooking} disabled={isProcessing} className="w-full rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 py-4 text-lg font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60">{isProcessing ? "Preparing secure payment..." : "Reserve Now"}</button>

            <div className="mt-8 space-y-3 border-t pt-6 text-slate-700">
                <div className="flex justify-between"><span>₹{Number(cabin.pricePerNight).toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}</span><span>₹{(cabin.pricePerNight * nights).toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between border-t pt-5"><span className="text-xl font-bold">Total</span><span className="text-2xl font-black text-teal-600">₹{total.toLocaleString("en-IN")}</span></div>
            </div>

            <div className="mt-8 rounded-2xl bg-green-50 p-5 text-green-700"><div className="mb-2 flex items-center gap-2 font-semibold"><FaShieldAlt />Secure payment</div><div className="flex items-center gap-2 text-sm"><FaCheckCircle />Instant confirmation after payment</div></div>
        </aside>
    );
}

export default BookingCard;
