import Suggestions from "../../../components/Home/Suggestions/Suggestions.jsx";
import FlightSearcher from "../../../components/Home/FlightSearcher/FlightSearcher.jsx";

import "./home.css";
import {NavLink, useOutletContext} from "react-router-dom";
import Discounts from "../../../components/Home/Discounts/Discounts.jsx";
import Subscribe from "../../../components/Home/Subscribe/Subscribe.jsx";
import NewsContainer from "../../../components/Home/News/NewsContainer.jsx";
import ButtonSlider from "../../../components/Home/Slider/ButtonSlider.jsx";
import HorizontalRule from "../../../components/HorizontalRule.jsx";
import H1Text from "../../../components/H1Text.jsx";

export default function Home() {
    const isLightMode = useOutletContext();
    return (
        <div className="home">
            {/*Flight searcher section*/}
            {/*<H1Text style={{marginTop: "3rem"}} content={"Enjoy the best experience at QAirline"}/>*/}
            <FlightSearcher isLightMode={isLightMode}/>
            <HorizontalRule/>

            {/*Recommendations section*/}
            <H1Text content={"Recommendations"}/>
            <div className="suggestion-carousel">
                <Suggestions/>
            </div>
            <br/>
            <ButtonSlider/>
            <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
            <HorizontalRule/>

            {/*Discounts section*/}
            <H1Text content={"Discounts"}/>
            <Discounts/>
            <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/booking">See more discounts</NavLink>
            <HorizontalRule/>

            {/*News section*/}
            <H1Text content={"News"}/>
            <NewsContainer/>
            <HorizontalRule/>

            {/*Subscribe section*/}
            <Subscribe isLightMode={isLightMode}/>
        </div>
    )
}