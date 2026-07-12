import api from "./api";

export const createOrder = async (bookingId, amount) => {
    const response = await api.post("/payments/create-order", {
        bookingId,
        amount,
    });

    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await api.post("/payments/verify", {
        razorpayOrderId: paymentData.razorpay_order_id,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpaySignature: paymentData.razorpay_signature,
    });

    return response.data;
};

export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => resolve(true);

        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
};
