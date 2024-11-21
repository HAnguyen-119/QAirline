import FlightSearcher from "../../components/Home/FlightSearcher.jsx";

import "./home.css";
import {useOutletContext} from "react-router-dom";
import Subscribe from "../../components/Home/Subscribe.jsx";
import SuggestionContainer from "../../components/Home/SuggestionContainer.jsx";
import DiscountContainer from "../../components/Home/DiscountContainer.jsx";
import NewsContainer from "../../components/Home/NewsContainer.jsx";

export default function Home() {
    const isLightMode = useOutletContext();

    return (
        <div className="home">
            <h1 style={{marginTop: "3rem"}}>Enjoy the best experience at QAirline</h1>
            <FlightSearcher isLightMode={isLightMode}/>
            <hr className={isLightMode ? "" : " dark"}/>
            <h1>Recommendations</h1>
            <SuggestionContainer isLightMode={isLightMode}/>
            <hr className={isLightMode ? "" : " dark"}/>
            <h1>Discounts</h1>
            <DiscountContainer isLightMode={isLightMode}/>
            <hr className={isLightMode ? "" : " dark"}/>
            <h1>News</h1>
            <NewsContainer isLightMode={isLightMode}/>
            <hr className={isLightMode ? "" : " dark"}/>
            <Subscribe isLightMode={isLightMode}/>
        </div>
    )
}