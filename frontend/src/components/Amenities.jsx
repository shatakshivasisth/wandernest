import {
    FaWifi,
    FaParking,
    FaFire,
    FaSnowflake,
    FaHotTub,
    FaTv,
    FaUtensils,
    FaMountain,
} from "react-icons/fa";

const amenities = [
    {
        icon: <FaWifi />,
        title: "High-Speed WiFi",
        desc: "Unlimited 500 Mbps Internet",
    },
    {
        icon: <FaParking />,
        title: "Free Parking",
        desc: "Private parking available",
    },
    {
        icon: <FaFire />,
        title: "Fireplace",
        desc: "Indoor wooden fireplace",
    },
    {
        icon: <FaHotTub />,
        title: "Hot Tub",
        desc: "Private outdoor jacuzzi",
    },
    {
        icon: <FaUtensils />,
        title: "Modern Kitchen",
        desc: "Fully equipped kitchen",
    },
    {
        icon: <FaSnowflake />,
        title: "Air Conditioning",
        desc: "Heating & cooling system",
    },
    {
        icon: <FaTv />,
        title: "Smart TV",
        desc: "Netflix & Prime included",
    },
    {
        icon: <FaMountain />,
        title: "Mountain View",
        desc: "Panoramic Himalayan views",
    },
];

function Amenities() {
    return (
        <section>

            <div className="mb-10">

                <p className="uppercase tracking-[6px] text-teal-600 font-semibold">

                    WHAT YOU GET

                </p>

                <h2 className="mt-3 text-4xl font-black text-slate-900">

                    Premium Amenities

                </h2>

                <p className="mt-3 text-lg text-slate-500">

                    Everything you need for a relaxing and luxurious stay.

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {amenities.map((item, index) => (

                    <div
                        key={index}
                        className="
                        flex
                        items-start
                        gap-5
                        rounded-3xl
                        border
                        border-slate-100
                        bg-slate-50
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-xl
                        "
                    >

                        <div
                            className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-teal-500
                            to-cyan-500
                            text-2xl
                            text-white
                            shadow-lg
                            "
                        >

                            {item.icon}

                        </div>

                        <div>

                            <h3 className="text-xl font-bold text-slate-900">

                                {item.title}

                            </h3>

                            <p className="mt-2 text-slate-500 leading-7">

                                {item.desc}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Amenities;