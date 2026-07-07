import { useState, useEffect } from "react";

function CabinGallery({ images = [] }) {

    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {

        if (images.length > 0) {

            setSelectedImage(images[0]);

        }

    }, [images]);

    if (!images.length) {

        return (

            <div className="mb-10 h-[550px] rounded-[35px] bg-slate-200 flex items-center justify-center">

                <h2 className="text-3xl font-bold text-slate-500">

                    No Images Available

                </h2>

            </div>

        );

    }

    return (

        <div className="mb-12">

            <div className="overflow-hidden rounded-[35px] shadow-2xl">

                <img
                    src={selectedImage}
                    alt="Cabin"
                    className="h-[600px] w-full object-cover transition-all duration-500"
                />

            </div>

            <div className="mt-6 grid grid-cols-5 gap-5">

                {images.map((image, index) => (

                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`overflow-hidden rounded-2xl border-4 transition-all duration-300 ${
                            selectedImage === image
                                ? "border-teal-600"
                                : "border-transparent hover:border-slate-300"
                        }`}
                    >

                        <img
                            src={image}
                            alt=""
                            className="h-32 w-full object-cover"
                        />

                    </button>

                ))}

            </div>

        </div>

    );

}

export default CabinGallery;