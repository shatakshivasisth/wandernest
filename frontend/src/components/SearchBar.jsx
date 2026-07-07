import {
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUsers
} from "react-icons/fa";

function SearchBar() {
    return (
        <div className="w-full max-w-7xl px-6">

            <div className="bg-white rounded-full shadow-2xl p-2">

                <div className="flex flex-col lg:flex-row items-stretch">

                    {/* Destination */}
                    <div className="flex-1 px-8 py-5 border-b lg:border-b-0 lg:border-r hover:bg-gray-50 transition">

                        <div className="flex gap-4 items-center">

                            <FaMapMarkerAlt className="text-teal-600 text-xl"/>

                            <div className="w-full">

                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Destination
                                </p>

                                <input
                                    type="text"
                                    placeholder="Shimla"
                                    className="w-full bg-transparent outline-none text-lg font-semibold"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Check In */}
                    <div className="flex-1 px-8 py-5 border-b lg:border-b-0 lg:border-r hover:bg-gray-50 transition">

                        <div className="flex gap-4 items-center">

                            <FaCalendarAlt className="text-teal-600 text-xl"/>

                            <div>

                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Check In
                                </p>

                                <input
                                    type="date"
                                    className="bg-transparent outline-none text-lg font-semibold"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Check Out */}
                    <div className="flex-1 px-8 py-5 border-b lg:border-b-0 lg:border-r hover:bg-gray-50 transition">

                        <div className="flex gap-4 items-center">

                            <FaCalendarAlt className="text-teal-600 text-xl"/>

                            <div>

                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Check Out
                                </p>

                                <input
                                    type="date"
                                    className="bg-transparent outline-none text-lg font-semibold"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Guests */}
                    <div className="flex-1 px-8 py-5 border-b lg:border-b-0 hover:bg-gray-50 transition">

                        <div className="flex gap-4 items-center">

                            <FaUsers className="text-teal-600 text-xl"/>

                            <div>

                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Guests
                                </p>

                                <input
                                    type="number"
                                    defaultValue="2"
                                    className="bg-transparent outline-none text-lg font-semibold w-16"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Search Button */}
                    <div className="flex items-center justify-center px-4">

                        <button
                            className="flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-full bg-teal-600 px-8 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-teal-700"
                        >
                            <FaSearch />
                            Search
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SearchBar;