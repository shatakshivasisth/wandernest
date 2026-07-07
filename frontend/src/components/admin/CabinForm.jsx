import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function CabinForm({ initialData, onSubmit, buttonText }) {

    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        pricePerNight: "",
        capacity: "",
        bedrooms: "",
        bathrooms: "",
        hostName: "",
        imageUrls: []
    });

    useEffect(() => {

        if (initialData) {

            setForm({
                title: initialData.title || "",
                description: initialData.description || "",
                location: initialData.location || "",
                pricePerNight: initialData.pricePerNight || "",
                capacity: initialData.capacity || "",
                bedrooms: initialData.bedrooms || "",
                bathrooms: initialData.bathrooms || "",
                hostName: initialData.hostName || "",
                imageUrls: initialData.imageUrls || []
            });

        }

    }, [initialData]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const uploadImages = async (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        try {

            setUploading(true);

            const data = new FormData();

            files.forEach(file => {

                data.append("files", file);

            });

            const response = await api.post(
                "/images/upload-multiple",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setForm(prev => ({
                ...prev,
                imageUrls: [...prev.imageUrls, ...response.data]
            }));

            toast.success("Images Uploaded");

        } catch (err) {

            console.error(err);

            toast.error("Upload Failed");

        } finally {

            setUploading(false);

        }

    };

    const removeImage = (index) => {

        setForm(prev => ({

            ...prev,

            imageUrls: prev.imageUrls.filter((_, i) => i !== index)

        }));

    };

    const submit = (e) => {

        e.preventDefault();

        onSubmit({

            ...form,

            pricePerNight: Number(form.pricePerNight),

            capacity: Number(form.capacity),

            bedrooms: Number(form.bedrooms),

            bathrooms: Number(form.bathrooms)

        });

    };

    return (

        <form
            onSubmit={submit}
            className="space-y-8"
        >

            <div className="grid gap-6 md:grid-cols-2">

                <input
                    className="rounded-xl border p-4"
                    placeholder="Property Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <input
                    className="rounded-xl border p-4"
                    placeholder="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                />

                <input
                    className="rounded-xl border p-4"
                    type="number"
                    placeholder="Price Per Night"
                    name="pricePerNight"
                    value={form.pricePerNight}
                    onChange={handleChange}
                    required
                />

                <input
                    className="rounded-xl border p-4"
                    type="number"
                    placeholder="Capacity"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                />

                <input
                    className="rounded-xl border p-4"
                    type="number"
                    placeholder="Bedrooms"
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange}
                    required
                />

                <input
                    className="rounded-xl border p-4"
                    type="number"
                    placeholder="Bathrooms"
                    name="bathrooms"
                    value={form.bathrooms}
                    onChange={handleChange}
                    required
                />

            </div>

            <input
                className="w-full rounded-xl border p-4"
                placeholder="Host Name"
                name="hostName"
                value={form.hostName}
                onChange={handleChange}
                required
            />

            <textarea
                rows="5"
                className="w-full rounded-xl border p-4"
                placeholder="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
            />

            <div className="rounded-2xl border border-dashed border-slate-300 p-6">

                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">

                        Property Images

                    </h2>

                    <label
                        className="
                        cursor-pointer
                        rounded-xl
                        bg-teal-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        hover:bg-teal-700
                        "
                    >

                        {uploading ? "Uploading..." : "Choose Images"}

                        <input
                            type="file"
                            multiple
                            hidden
                            accept="image/*"
                            onChange={uploadImages}
                        />

                    </label>

                </div>

                {

                    form.imageUrls.length > 0 && (

                        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">

                            {

                                form.imageUrls.map((img, index) => (

                                    <div
                                        key={index}
                                        className="relative"
                                    >

                                        <img
                                            src={img}
                                            alt=""
                                            className="
                                            h-40
                                            w-full
                                            rounded-2xl
                                            object-cover
                                            shadow-lg
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="
                                            absolute
                                            right-2
                                            top-2
                                            rounded-full
                                            bg-red-600
                                            px-3
                                            py-1
                                            text-sm
                                            font-bold
                                            text-white
                                            "
                                        >

                                            ✕

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

            <button
                type="submit"
                disabled={uploading}
                className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-teal-600
                to-cyan-600
                py-5
                text-xl
                font-bold
                text-white
                transition
                hover:scale-[1.02]
                disabled:cursor-not-allowed
                disabled:opacity-50
                "
            >

                {uploading ? "Uploading Images..." : buttonText}

            </button>

        </form>

    );

}

export default CabinForm;