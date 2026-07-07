import Hero from "../../components/Hero";
import CategoryBar from "../../components/CategoryBar";
import FeaturedCabins from "../../components/FeaturedCabins";

function Home() {
    return (
        <>
            <Hero />

            <CategoryBar />

            <FeaturedCabins />
        </>
    );
}

export default Home;