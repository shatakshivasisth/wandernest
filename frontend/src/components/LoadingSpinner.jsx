import { FaMountain } from "react-icons/fa";

function LoadingSpinner() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">

            <div className="text-center">

                <div
                    className="
                    mx-auto
                    flex
                    h-24
                    w-24
                    animate-spin
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-teal-500
                    border-t-transparent
                    "
                >

                    <FaMountain className="text-4xl text-teal-600" />

                </div>

                <h2 className="mt-8 text-3xl font-black text-slate-800">

                    Loading...

                </h2>

                <p className="mt-3 text-slate-500">

                    Preparing your luxury experience

                </p>

            </div>

        </div>
    );
}

export default LoadingSpinner;