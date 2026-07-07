import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import CabinForm from "../../components/admin/CabinForm";

function AddCabin() {

    const navigate = useNavigate();

    const handleSubmit = async (form) => {

        try {

            await api.post("/cabins", form);

            toast.success("Property Added Successfully");

            navigate("/admin/properties");

        } catch (err) {

            console.error(err);

            toast.error("Failed to Add Property");

        }

    };

    return (

        <main className="min-h-screen bg-slate-100 py-36 px-8">

            <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">

                <div className="mb-10">

                    <h1 className="text-5xl font-black">

                        Add New Property

                    </h1>

                    <p className="mt-3 text-slate-500">

                        Fill all the details below.

                    </p>

                </div>

                <CabinForm

                    buttonText="Publish Property"

                    onSubmit={handleSubmit}

                />

            </div>

        </main>

    );

}

export default AddCabin;