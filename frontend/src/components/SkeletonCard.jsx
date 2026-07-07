function SkeletonCard() {
    return (

        <div
            className="
            animate-pulse
            overflow-hidden
            rounded-[30px]
            bg-white
            shadow-lg
            "
        >

            <div className="h-72 bg-slate-200"></div>

            <div className="space-y-4 p-6">

                <div className="h-8 w-2/3 rounded bg-slate-200"></div>

                <div className="h-5 w-1/2 rounded bg-slate-200"></div>

                <div className="h-5 w-full rounded bg-slate-200"></div>

                <div className="mt-8 flex justify-between">

                    <div className="h-10 w-28 rounded bg-slate-200"></div>

                    <div className="h-12 w-32 rounded-full bg-slate-200"></div>

                </div>

            </div>

        </div>

    );
}

export default SkeletonCard;