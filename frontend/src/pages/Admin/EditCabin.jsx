import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import CabinForm from "../../components/admin/CabinForm";

function EditCabin() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [cabin, setCabin] = useState(null);

    useEffect(() => {

        loadCabin();

    }, []);

    const loadCabin = async () => {

        try {

            const response = await api.get(`/cabins/${id}`);

            setCabin(response.data);

        } catch (err) {

            console.error(err);

            toast.error("Unable to load property");

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (form) => {

        try {

            await api.put(`/cabins/${id}`, form);

            toast.success("Property Updated Successfully");

            navigate("/admin/properties");

        } catch (err) {

            console.error(err);

            toast.error("Update Failed");

        }

    };

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-3xl font-bold">

                    Loading...

                </h1>

            </div>

        );

    }

    return (

        <main className="min-h-screen bg-slate-100 py-36 px-8">

            <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">

                <div className="mb-10">

                    <h1 className="text-5xl font-black">

                        Edit Property

                    </h1>

                    <p className="mt-3 text-slate-500">

                        Update cabin details.

                    </p>

                </div>

                <CabinForm
                    initialData={cabin}
                    buttonText="Update Property"
                    onSubmit={handleSubmit}
                />

            </div>

        </main>

    );

}

export default EditCabin;