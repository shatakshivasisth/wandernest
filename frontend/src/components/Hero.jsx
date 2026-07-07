import hero from "../assets/images/hero.jpg";
import SearchBar from "./SearchBar";

function Hero() {
    return (
        <section className="relative min-h-screen">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${hero})`
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24">

                <div className="max-w-5xl text-center">

                    <p className="uppercase tracking-[10px] text-teal-300 font-semibold mb-8">

                        LUXURY CABIN EXPERIENCE

                    </p>

                    <h1 className="text-7xl md:text-8xl font-black text-white leading-tight">

                        Escape Into

                        <span className="block text-teal-400">
                            Nature
                        </span>

                    </h1>

                    <p className="mt-8 text-xl text-gray-200 leading-9 max-w-4xl mx-auto">

                        Find handpicked luxury cabins surrounded by mountains,
                        forests and lakes.

                    </p>

                </div>

                {/* 👇 THIS IS THE IMPORTANT CHANGE */}
                <div className="mt-20 w-full flex justify-center">

                    <SearchBar />

                </div>

            </div>

        </section>
    );
}

export default Hero;