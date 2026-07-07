import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import {
    FaRobot,
    FaPaperPlane,
    FaMapMarkedAlt,
    FaSpinner,
} from "react-icons/fa";

function AIPlanner() {

    const [prompt, setPrompt] = useState("");

    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState("");

    const generatePlan = async () => {

        if (!prompt.trim()) {

            toast.error("Please enter your travel plan.");

            return;

        }

        try {

            setLoading(true);

            const res = await api.post("/ai/trip-plan", {

                prompt

            });

            setResponse(res.data.response);

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to generate plan.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <main className="min-h-screen bg-slate-100 pt-36 pb-20">

            <div className="mx-auto max-w-5xl">

                <div className="rounded-[35px] bg-white p-12 shadow-2xl">

                    <div className="mb-10 text-center">

                        <FaRobot className="mx-auto text-6xl text-teal-600"/>

                        <h1 className="mt-6 text-5xl font-black">

                            AI Trip Planner

                        </h1>

                        <p className="mt-4 text-lg text-slate-500">

                            Let Gemini AI create your perfect trip.

                        </p>

                    </div>

                    <textarea

                        rows={8}

                        value={prompt}

                        onChange={(e)=>setPrompt(e.target.value)}

                        className="w-full rounded-2xl border p-6"

                        placeholder="Example: Plan a 5 day honeymoon trip to Manali under ₹40,000 including sightseeing, cafes and adventure activities."

                    />
                    <button

                        onClick={generatePlan}

                        disabled={loading}

                        className="
                        mt-8
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-teal-600
                        to-cyan-600
                        py-5
                        text-xl
                        font-bold
                        text-white
                        transition
                        hover:scale-[1.01]
                        disabled:opacity-50
                        "

                    >

                        {

                            loading

                                ?

                                <>

                                    <FaSpinner className="animate-spin"/>

                                    Generating Your Trip...

                                </>

                                :

                                <>

                                    <FaPaperPlane/>

                                    Generate AI Trip

                                </>

                        }

                    </button>

                    {

                        response && (

                            <div className="mt-12 rounded-3xl border bg-slate-50 p-10">

                                <div className="mb-8 flex items-center gap-3">

                                    <FaMapMarkedAlt className="text-3xl text-teal-600"/>

                                    <h2 className="text-3xl font-black">

                                        Your AI Travel Plan

                                    </h2>

                                </div>

                                <div
                                    className="
                                    whitespace-pre-wrap
                                    leading-9
                                    text-slate-700
                                    text-lg
                                    "
                                >

                                    {response}

                                </div>

                            </div>

                        )

                    }

                </div>

            </div>

        </main>

    );

}

export default AIPlanner;