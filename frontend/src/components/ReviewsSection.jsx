import { useEffect, useState } from "react";
import {
    FaStar,
    FaUserCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

function ReviewsSection({ cabinId }) {

    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    async function loadReviews() {

        try {

            const response = await api.get(`/reviews/${cabinId}`);

            setReviews(response.data);

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        void loadReviews();

    }, [cabinId]);

    const submitReview = async () => {

        if (!user) {

            toast.error("Login first");

            return;

        }

        if (!comment.trim()) {

            toast.error("Write your review");

            return;

        }

        try {

            await api.post("/reviews", {

                userId: user.id,

                cabinId,

                rating,

                comment

            });

            toast.success("Review Added");

            setComment("");

            setRating(5);

            loadReviews();

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to add review");

        }

    };

    const average =

        reviews.length === 0

            ? 0

            : (

                reviews.reduce(

                    (sum, r) => sum + r.rating,

                    0

                ) / reviews.length

            ).toFixed(1);

    return (

        <div className="rounded-3xl bg-white p-10 shadow-xl">

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <h2 className="text-4xl font-black">

                        Guest Reviews

                    </h2>

                    <p className="mt-2 text-slate-500">

                        {reviews.length} Reviews

                    </p>

                </div>

                <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-6 py-3">

                    <FaStar className="text-yellow-500"/>

                    <span className="text-2xl font-black">

                        {average}

                    </span>

                </div>

            </div>

            <div className="mb-10 rounded-3xl bg-slate-50 p-8">

                <h3 className="mb-5 text-2xl font-bold">

                    Write Review

                </h3>

                <select
                    value={rating}
                    onChange={(e)=>

                        setRating(Number(e.target.value))

                    }

                    className="mb-5 w-full rounded-xl border p-4"
                >

                    <option value={5}>⭐⭐⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={1}>⭐</option>

                </select>

                <textarea

                    rows={5}

                    value={comment}

                    onChange={(e)=>

                        setComment(e.target.value)

                    }

                    className="w-full rounded-xl border p-4"

                    placeholder="Share your experience..."

                />

                <button

                    onClick={submitReview}

                    className="
                    mt-5
                    rounded-xl
                    bg-gradient-to-r
                    from-teal-600
                    to-cyan-600
                    px-8
                    py-4
                    font-bold
                    text-white
                    "

                >

                    Submit Review

                </button>

            </div>

            <div className="space-y-6">

                {

                    reviews.map((review)=>(

                        <div

                            key={review.reviewId}

                            className="rounded-2xl border p-6"

                        >

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-4">

                                    <FaUserCircle className="text-5xl text-teal-600"/>

                                    <div>

                                        <h3 className="text-xl font-bold">

                                            {review.userName}

                                        </h3>

                                        <p className="text-slate-500">

                                            {

                                                new Date(

                                                    review.createdAt

                                                ).toLocaleDateString()

                                            }

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2">

                                    <FaStar className="text-yellow-500"/>

                                    {review.rating}

                                </div>

                            </div>

                            <p className="mt-6 text-lg leading-8 text-slate-600">

                                {review.comment}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ReviewsSection;
