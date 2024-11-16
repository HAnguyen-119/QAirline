import Suggestion from "../../components/Home/Suggestion.jsx";
import FlightSearcher from "../../components/Home/FlightSearcher.jsx";

import "./home.css";
import {useOutletContext} from "react-router-dom";

export default function Home() {
    const isLightMode = useOutletContext();
    return (
        <div className="home">
            <h1>Enjoy the best experience at QAirline</h1>
            <FlightSearcher isLightMode={isLightMode}/>
            <h1>Recommendations</h1>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "scroll", overflowY: "hidden"}}>
                <div className="suggestionContainer">
                    <Suggestion imageURL="https://www.travelguide.net/media/new-york.jpeg" location="New York" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://media.timeout.com/images/106181719/750/562/image.jpg" location="Paris" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://ik.imagekit.io/tvlk/blog/2022/06/thap-tokyo-nhat-ban-2.jpg?tr=c-at_max?tr=c-at_max" location="Tokyo" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg" location="Sydney" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg" location="Ho Chi Minh City" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://media.istockphoto.com/id/1143539287/vi/anh/eo-bi%E1%BB%83n-amsterdam-h%C3%A0-lan-c%C3%B3-s%C3%B4ng-amstel.jpg?s=612x612&w=0&k=20&c=9-TKGqrzO42BI1Cbos7wJSJV6iP82ACjS-Q7AoK8c0E=" location="Amsterdam" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://www.vietnamairlines.com/~/media/Images/Discovery/England/London/canh%20dep/986x906/London_canhdep_986x906.jpg" location="London" price="100 USD" isLightMode={isLightMode}/>
                </div>
            </div>
            <h1>Discounts</h1>
            <h1>Services</h1>
            <h1>News</h1>
        </div>
    )
}