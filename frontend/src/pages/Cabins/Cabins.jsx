import SearchHeader from "../../components/SearchHeader";
import Filters from "../../components/Filters";
import CabinGrid from "../../components/CabinGrid";

function Cabins() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-100 to-white">

            {/* Navbar Space */}

            <div className="h-28"></div>

            {/* Hero */}

            <SearchHeader />

            {/* Main Content */}

            <section className="mx-auto mt-20 max-w-[1700px] px-8">

                <div className="grid grid-cols-12 gap-10">

                    {/* ================= LEFT FILTER ================= */}

                    <aside className="col-span-3">

                        <div className="sticky top-32">

                            <Filters />

                        </div>

                    </aside>

                    {/* ================= RIGHT ================= */}

                    <section className="col-span-9">

                        {/* Heading */}

                        <div className="mb-14">

                            <p className="text-sm font-bold uppercase tracking-[8px] text-teal-600">

                                PREMIUM COLLECTION

                            </p>

                            <div className="mt-5 flex items-center justify-between">

                                <div>

                                    <h1 className="text-5xl font-black text-slate-900">

                                        Browse Luxury Cabins

                                    </h1>

                                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-500">

                                        Choose from premium mountain cabins,
                                        lakeside retreats, luxury forest stays
                                        and unforgettable destinations across India.

                                    </p>

                                </div>

                                {/* Sort */}

                                <div>

                                    <select
                                        className="
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-7
                                        py-4
                                        font-semibold
                                        shadow-lg
                                        outline-none
                                        transition
                                        hover:border-teal-500
                                        "
                                    >

                                        <option>Recommended</option>

                                        <option>Highest Rated</option>

                                        <option>Newest</option>

                                        <option>Price Low → High</option>

                                        <option>Price High → Low</option>

                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* Cards */}

                        <CabinGrid />

                    </section>

                </div>

            </section>

        </main>
    );
}

export default Cabins;