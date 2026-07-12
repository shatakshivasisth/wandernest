import { useEffect, useState } from "react";
import CabinCard from "./CabinCard";
import { getAllCabins } from "../services/cabinService";

function CabinGrid() {

    const [cabins, setCabins] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadCabins() {

        try {

            const data = await getAllCabins();

            setCabins(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        void loadCabins();

    }, []);

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                <div className="text-2xl font-bold text-teal-600">

                    Loading Luxury Cabins...

                </div>

            </div>

        );

    }

    return (

        <section>

            {/* Top */}

            <div className="mb-10 flex items-center justify-between rounded-3xl bg-white px-8 py-6 shadow-lg">

                <div>

                    <h2 className="text-3xl font-black text-slate-900">

                        {cabins.length} Properties Found

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Premium luxury stays across India.

                    </p>

                </div>

                <div className="rounded-full bg-teal-50 px-6 py-3 font-semibold text-teal-700">

                    Live Database

                </div>

            </div>

            {/* Cards */}

            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

                {cabins.map((cabin) => (

                    <CabinCard
                        key={cabin.id}
                        id={cabin.id}
                        image={
                            cabin.imageUrls && cabin.imageUrls.length > 0
                                ? cabin.imageUrls[0]
                                : "/placeholder.jpg"
                        }
                        title={cabin.title}
                        location={cabin.location}
                        price={cabin.pricePerNight}
                        rating={cabin.rating}
                    />

                ))}

            </div>

        </section>

    );

}

export default CabinGrid;
