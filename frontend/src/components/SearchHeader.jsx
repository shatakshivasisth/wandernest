import {
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUsers,
} from "react-icons/fa";

function SearchHeader() {
    return (
        <section className="mx-auto mt-10 max-w-[1700px] px-8">

            <div
                className="
                overflow-hidden
                rounded-[36px]
                bg-gradient-to-r
                from-slate-900
                via-teal-900
                to-cyan-700
                shadow-2xl
                "
            >

                {/* Content */}

                <div className="mx-auto flex max-w-6xl flex-col items-center px-10 py-16 text-center">

                    <p className="mb-4 text-sm font-bold uppercase tracking-[10px] text-teal-300">

                        FIND YOUR NEXT STAY

                    </p>

                    <h1 className="max-w-4xl text-6xl font-black leading-tight text-white">

                        Luxury Cabins Across India

                    </h1>

                    <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200">

                        Discover breathtaking mountain cabins,
                        lakeside retreats and unforgettable luxury
                        experiences across India's most beautiful
                        destinations.

                    </p>

                    {/* Search Bar */}

                    <div className="mt-14 w-full max-w-6xl">

                        <div
                            className="
                            rounded-[30px]
                            bg-white
                            p-3
                            shadow-2xl
                            "
                        >

                            <div className="grid grid-cols-5">

                                {/* Destination */}

                                <div className="flex items-center gap-4 border-r px-6 py-4">

                                    <FaMapMarkerAlt className="text-2xl text-teal-600"/>

                                    <div className="text-left">

                                        <p className="text-xs font-bold uppercase text-slate-400">

                                            Destination

                                        </p>

                                        <input
                                            type="text"
                                            placeholder="Manali"
                                            className="mt-1 w-full text-lg font-semibold outline-none"
                                        />

                                    </div>

                                </div>

                                {/* Check In */}

                                <div className="flex items-center gap-4 border-r px-6 py-4">

                                    <FaCalendarAlt className="text-2xl text-teal-600"/>

                                    <div className="text-left">

                                        <p className="text-xs font-bold uppercase text-slate-400">

                                            Check In

                                        </p>

                                        <input
                                            type="date"
                                            className="mt-1 outline-none"
                                        />

                                    </div>

                                </div>

                                {/* Check Out */}

                                <div className="flex items-center gap-4 border-r px-6 py-4">

                                    <FaCalendarAlt className="text-2xl text-teal-600"/>

                                    <div className="text-left">

                                        <p className="text-xs font-bold uppercase text-slate-400">

                                            Check Out

                                        </p>

                                        <input
                                            type="date"
                                            className="mt-1 outline-none"
                                        />

                                    </div>

                                </div>

                                {/* Guests */}

                                <div className="flex items-center gap-4 px-6 py-4">

                                    <FaUsers className="text-2xl text-teal-600"/>

                                    <div className="text-left">

                                        <p className="text-xs font-bold uppercase text-slate-400">

                                            Guests

                                        </p>

                                        <input
                                            type="number"
                                            defaultValue={2}
                                            className="mt-1 w-16 text-lg font-semibold outline-none"
                                        />

                                    </div>

                                </div>

                                {/* Search */}

                                <div className="flex items-center justify-center">

                                    <button
                                        className="
                                        flex
                                        h-16
                                        w-[90%]
                                        items-center
                                        justify-center
                                        gap-3
                                        rounded-2xl
                                        bg-gradient-to-r
                                        from-teal-600
                                        to-cyan-600
                                        text-lg
                                        font-bold
                                        text-white
                                        shadow-xl
                                        transition-all
                                        duration-300
                                        hover:scale-105
                                        "
                                    >

                                        <FaSearch />

                                        Search

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SearchHeader;