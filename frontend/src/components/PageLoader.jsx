import SkeletonCard from "./SkeletonCard";

function PageLoader() {

    return (

        <section className="mx-auto max-w-[1700px] px-8 py-20">

            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />

            </div>

        </section>

    );

}

export default PageLoader;