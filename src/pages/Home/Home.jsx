import Suggestion from "../../components/Home/Suggestion.jsx";
import FlightSearcher from "../../components/Home/FlightSearcher.jsx";

import "./home.css";
import {NavLink, useOutletContext} from "react-router-dom";
import {useState} from "react";
import Discount from "../../components/Home/Discount.jsx";
import {contents} from "../../components/Home/Discount.jsx";
import News, {newsContents} from "../../components/Home/News.jsx";
import Subscribe from "../../components/Home/Subscribe.jsx";

export default function Home() {
    const isLightMode = useOutletContext();
    const [viewport, setViewport] = useState("0");

    function next() {
        const suggestionWidth = document.querySelector(".suggestion").offsetWidth;
        const suggestionContainer = document.querySelector(".suggestionContainer");
        const gap = parseFloat(getComputedStyle(suggestionContainer).gap)
        setViewport(vp => (parseInt(vp) - (suggestionWidth + gap)).toString());
    }

    function prev() {
        const suggestionWidth = document.querySelector(".suggestion").offsetWidth;
        const suggestionContainer = document.querySelector(".suggestionContainer");
        const gap = parseFloat(getComputedStyle(suggestionContainer).gap)
        setViewport(vp => (parseInt(vp) + (suggestionWidth + gap)).toString());
    }

    return (
        <div className="home">
            <h1 style={{marginTop: "3rem"}}>Enjoy the best experience at QAirline</h1>
            <FlightSearcher isLightMode={isLightMode}/>
            <hr className={isLightMode ? "" : "dark"}/>
            <h1>Recommendations</h1>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                <div className="suggestionContainer" style={{transform: `translate(${viewport}px, 0px)`}}>
                    <Suggestion imageURL="https://www.travelguide.net/media/new-york.jpeg" location="New York"
                                price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://media.timeout.com/images/106181719/750/562/image.jpg" location="Paris"
                                price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://ik.imagekit.io/tvlk/blog/2022/06/thap-tokyo-nhat-ban-2.jpg?tr=c-at_max?tr=c-at_max"
                        location="Tokyo" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg"
                        location="Sydney" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg"
                                location="Ho Chi Minh City" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://media.istockphoto.com/id/1143539287/vi/anh/eo-bi%E1%BB%83n-amsterdam-h%C3%A0-lan-c%C3%B3-s%C3%B4ng-amstel.jpg?s=612x612&w=0&k=20&c=9-TKGqrzO42BI1Cbos7wJSJV6iP82ACjS-Q7AoK8c0E="
                        location="Amsterdam" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://www.vietnamairlines.com/~/media/Images/Discovery/England/London/canh%20dep/986x906/London_canhdep_986x906.jpg"
                        location="London" price="100 USD" isLightMode={isLightMode}/>
                </div>
            </div>
            <br/>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem"
            }}>
                <button className={`prev ${isLightMode ? "" : "dark"}`} onClick={() => prev()}></button>
                <p>o o o o o</p>
                <button className={`next ${isLightMode ? "" : "dark"}`} onClick={() => next()}></button>
            </div>
            <hr className={isLightMode ? "" : "dark"}/>
            <h1>Discounts</h1>
            <div className="discountContainer">
                <Discount content={contents[0]} isLightMode={isLightMode}/>
                <Discount content={contents[1]} isLightMode={isLightMode}/>
                <Discount content={contents[2]} isLightMode={isLightMode}/>
                <Discount content={contents[3]} isLightMode={isLightMode}/>
            </div>
            <NavLink className={`moreDiscount ${isLightMode ? "" : "dark"}`} to="/booking">See more discounts</NavLink>
            <hr className={isLightMode ? "" : "dark"}/>
            <h1>News</h1>
            <div className={`newsContainer ${isLightMode ? "" : "dark"}`}>
                <News date={newsContents[0][0]} content={newsContents[0][1]} contentImage={newsContents[0][2]} isLightMode={isLightMode}/>
                <News date={newsContents[1][0]} content={newsContents[1][1]} contentImage={newsContents[1][2]} isLightMode={isLightMode}/>
                <News date={newsContents[2][0]} content={newsContents[2][1]} contentImage={newsContents[2][2]} isLightMode={isLightMode}/>
            </div>

            <hr className={isLightMode ? "" : "dark"}/>
            <Subscribe isLightMode={isLightMode}/>
        </div>
    )
}