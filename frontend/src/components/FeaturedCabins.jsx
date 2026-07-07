import { useEffect, useState } from "react";
import CabinCard from "./CabinCard";
import { getAllCabins } from "../services/cabinService";

function FeaturedCabins() {

    const [cabins, setCabins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCabins();

    }, []);

    const fetchCabins = async () => {

        try {

            const data = await getAllCabins();

            // Show only first 3 cabins on home page
            setCabins(data.slice(0, 3));

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="bg-gray-50 py-28">

            <div className="container mx-auto px-8">

                <div className="mb-20 text-center">

                    <p className="text-sm font-bold uppercase tracking-[8px] text-teal-600">

                        FEATURED STAYS

                    </p>

                    <h2 className="mt-4 text-5xl font-extrabold text-slate-900">

                        Discover Luxury Cabins

                    </h2>

                    <p className="mt-6 max-w-3xl mx-auto text-xl leading-9 text-gray-500">

                        Handpicked luxury stays surrounded by breathtaking mountains and forests.

                    </p>

                </div>

                {loading ? (

                    <div className="text-center text-2xl font-bold">

                        Loading Cabins...

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">

                        {cabins.map((cabin) => (

                            <CabinCard
                                key={cabin.id}
                                id={cabin.id}
                                image={
                                    cabin.imageUrls?.length
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

                )}

            </div>

        </section>

    );

}

export default FeaturedCabins;