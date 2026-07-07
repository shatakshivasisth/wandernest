import { Link } from "react-router-dom";
import {
    FaHome,
    FaPlus,
    FaUsers,
    FaCalendarCheck,
    FaChartBar,
} from "react-icons/fa";

function Dashboard() {

    const cards = [

        {
            title: "Properties",
            value: "24",
            icon: <FaHome />,
            color: "bg-teal-600",
            link: "/admin/properties",
        },

        {
            title: "Bookings",
            value: "152",
            icon: <FaCalendarCheck />,
            color: "bg-blue-600",
            link: "/admin/bookings",
        },

        {
            title: "Users",
            value: "67",
            icon: <FaUsers />,
            color: "bg-purple-600",
            link: "/admin/users",
        },

        {
            title: "Revenue",
            value: "₹2.4L",
            icon: <FaChartBar />,
            color: "bg-green-600",
            link: "/admin/revenue",
        },

    ];

    return (

        <main className="min-h-screen bg-slate-100 p-10">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-5xl font-black">

                        Admin Dashboard

                    </h1>

                    <p className="mt-3 text-slate-500">

                        Manage your WanderNest platform

                    </p>

                </div>

                <Link
                    to="/admin/add-cabin"
                    className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-teal-600
                    px-8
                    py-4
                    font-bold
                    text-white
                    shadow-lg
                    hover:bg-teal-700
                    "
                >

                    <FaPlus />

                    Add Property

                </Link>

            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                {cards.map((card, index) => (

                    <Link
                        key={index}
                        to={card.link}
                        className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
                    >

                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white ${card.color}`}>

                            {card.icon}

                        </div>

                        <h2 className="mt-6 text-3xl font-black">

                            {card.value}

                        </h2>

                        <p className="mt-2 text-slate-500">

                            {card.title}

                        </p>

                    </Link>

                ))}

            </div>

        </main>

    );

}

export default Dashboard;