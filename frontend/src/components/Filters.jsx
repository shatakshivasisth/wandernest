import { useState } from "react";
import {
    FaFilter,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaUsers,
    FaStar,
    FaBroom,
    FaWifi,
    FaParking,
    FaFire,
    FaSnowflake,
} from "react-icons/fa";

function Filters() {

    const [price, setPrice] = useState(15000);

    return (

        <div
            className="
            rounded-[35px]
            bg-white
            p-8
            shadow-2xl
            border
            border-slate-100
            "
        >

            {/* Header */}

            <div className="mb-10 flex items-center gap-4">

                <div
                    className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-teal-600
                    to-cyan-600
                    text-white
                    shadow-xl
                    "
                >

                    <FaFilter className="text-2xl"/>

                </div>

                <div>

                    <h2 className="text-3xl font-black text-slate-900">

                        Filters

                    </h2>

                    <p className="text-slate-500">

                        Refine your search

                    </p>

                </div>

            </div>

            {/* Destination */}

            <div className="mb-8">

                <label className="mb-3 flex items-center gap-2 font-semibold">

                    <FaMapMarkerAlt className="text-teal-600"/>

                    Destination

                </label>

                <select
                    className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-5
                    py-4
                    outline-none
                    focus:border-teal-600
                    "
                >

                    <option>Anywhere</option>
                    <option>Manali</option>
                    <option>Shimla</option>
                    <option>Kasol</option>
                    <option>Nainital</option>
                    <option>Mussoorie</option>

                </select>

            </div>

            {/* Budget */}

            <div className="mb-8">

                <div className="mb-3 flex items-center gap-2 font-semibold">

                    <FaRupeeSign className="text-teal-600"/>

                    Budget

                </div>

                <input
                    type="range"
                    min="3000"
                    max="30000"
                    step="1000"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    className="w-full accent-teal-600"
                />

                <div className="mt-3 flex justify-between">

                    <span>

                        ₹3,000

                    </span>

                    <span
                        className="
                        rounded-full
                        bg-teal-100
                        px-4
                        py-2
                        font-bold
                        text-teal-700
                        "
                    >

                        ₹{Number(price).toLocaleString()}

                    </span>

                </div>

            </div>

            {/* Guests */}

            <div className="mb-8">

                <label className="mb-3 flex items-center gap-2 font-semibold">

                    <FaUsers className="text-teal-600"/>

                    Guests

                </label>

                <select
                    className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-5
                    py-4
                    outline-none
                    "
                >

                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5 Guests</option>

                </select>

            </div>

            {/* Rating */}

            <div className="mb-8">

                <div className="mb-4 flex items-center gap-2 font-semibold">

                    <FaStar className="text-yellow-500"/>

                    Minimum Rating

                </div>

                <div className="grid grid-cols-2 gap-3">

                    {["3+","4+","4.5+","5★"].map(item=>(

                        <button
                            key={item}
                            className="
                            rounded-2xl
                            border
                            py-3
                            font-semibold
                            transition
                            hover:bg-teal-600
                            hover:text-white
                            "
                        >

                            {item}

                        </button>

                    ))}

                </div>

            </div>

            {/* Amenities */}

            <div className="mb-10">

                <h3 className="mb-5 text-lg font-bold">

                    Amenities

                </h3>

                <div className="space-y-4">

                    <label className="flex items-center gap-3">

                        <input type="checkbox"/>

                        <FaWifi className="text-teal-600"/>

                        WiFi

                    </label>

                    <label className="flex items-center gap-3">

                        <input type="checkbox"/>

                        <FaParking className="text-teal-600"/>

                        Parking

                    </label>

                    <label className="flex items-center gap-3">

                        <input type="checkbox"/>

                        <FaFire className="text-teal-600"/>

                        Fireplace

                    </label>

                    <label className="flex items-center gap-3">

                        <input type="checkbox"/>

                        <FaSnowflake className="text-teal-600"/>

                        Air Conditioning

                    </label>

                </div>

            </div>

            {/* Buttons */}

            <button
                className="
                mb-4
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-teal-600
                to-cyan-600
                py-4
                text-lg
                font-bold
                text-white
                shadow-lg
                transition
                hover:scale-[1.02]
                "
            >

                Apply Filters

            </button>

            <button
                className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-slate-200
                py-4
                font-semibold
                transition
                hover:bg-slate-100
                "
            >

                <FaBroom/>

                Reset Filters

            </button>

        </div>

    );

}

export default Filters;