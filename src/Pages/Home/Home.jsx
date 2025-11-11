import { useState,useEffect } from "react";
import Banner from "../../Component/Banner/Banner.jsx"
import RecentProduct from "../../Component/RecentProduct/RecentProduct.jsx"
import WinterCareTips from "../../Component/WinterCareTips/WinterCareTips.jsx"
import MeetOurVets from "../../Component/MeetOurVets/MeetOurVets.jsx"
import Loader from "../../Component/Loader/Loader.jsx"
const Root = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <div>
                <Banner></Banner>
                <RecentProduct></RecentProduct>
                <WinterCareTips></WinterCareTips>
                <MeetOurVets></MeetOurVets>
            </div>

        </>
    );
};

export default Root;