import { useState,useEffect } from "react";
import Banner from "../../Component/Banner/Banner.jsx"
import RecentProduct from "../../Component/RecentProduct/RecentProduct.jsx"
import ExportImportSolution from "../../Component/ExportImportSolution/ExportImportSolution.jsx"
import LogisticsExperts from "../../Component/LogisticsExperts/LogisticsExperts.jsx"
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
                <ExportImportSolution></ExportImportSolution>
                <LogisticsExperts></LogisticsExperts>
            </div>

        </>
    );
};

export default Root;