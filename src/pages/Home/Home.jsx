import Suggestion from "../../components/Home/Suggestion.jsx";
import FlightSearcher from "../../components/Home/FlightSearcher.jsx";

import "./home.css";

export default function Home() {
    return (
        <>
            <FlightSearcher/>
            <br/>
            <h1>Recommendations</h1>
            <div className="suggestionContainer">
                <Suggestion imageURL="https://www.travelguide.net/media/new-york.jpeg" location="New York" price="100 USD"/>
                <Suggestion imageURL="https://media.timeout.com/images/106181719/750/562/image.jpg" location="Paris" price="100 USD"/>
                <Suggestion imageURL="https://ik.imagekit.io/tvlk/blog/2022/06/thap-tokyo-nhat-ban-2.jpg?tr=c-at_max?tr=c-at_max" location="Tokyo" price="100 USD"/>
                <Suggestion imageURL="https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg" location="Sydney" price="100 USD"/>
                <Suggestion imageURL="https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg" location="Ho Chi Minh City" price="100 USD"/>
            </div>
        </>
    )
}