import {
    FaMountain,
    FaWater,
    FaTree,
    FaFire,
    FaHome,
    FaDog,
    FaSnowflake,
    FaUmbrellaBeach,
} from "react-icons/fa";

const categories = [
    { icon: <FaMountain />, title: "Mountains" },
    { icon: <FaWater />, title: "Lake View" },
    { icon: <FaTree />, title: "Forest" },
    { icon: <FaFire />, title: "Luxury" },
    { icon: <FaHome />, title: "Cabins" },
    { icon: <FaDog />, title: "Pet Friendly" },
    { icon: <FaSnowflake />, title: "Snow" },
    { icon: <FaUmbrellaBeach />, title: "Lakeside" },
];

function CategoryBar() {
    return (
        <section className="bg-white py-16">

            <div className="container mx-auto px-8">

                <div className="flex justify-center gap-10">

                    {categories.map((category) => (

                        <button
                            key={category.title}
                            className="group flex w-32 flex-col items-center"
                        >

                            <div className="rounded-full p-4 transition duration-300 group-hover:bg-teal-50">

                                <div className="text-4xl text-gray-600 transition duration-300 group-hover:-translate-y-1 group-hover:text-teal-600">

                                    {category.icon}

                                </div>

                            </div>

                            <span className="mt-3 text-lg font-semibold text-gray-700">

                                {category.title}

                            </span>

                            <div className="mt-4 h-1 w-0 rounded-full bg-teal-500 transition-all duration-300 group-hover:w-12"></div>

                        </button>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default CategoryBar;