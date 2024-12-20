import Suggestion from "./Suggestion.jsx";

import vnuImage from "../../../assets/images/vnu.jpg";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";

import ('./Suggestion.css')

export default function Suggestions() {
    const isLightMode = useOutletContext();

    const [destinationData, setDestinationData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const airports = await userAPI.getAllAirports();
                setDestinationData(airports);
                console.log(airports);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const getRandomItems = (arr, numItems) => {
        const shuffled = [...arr]; // Copy the array to avoid modifying the original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
        }
        return shuffled.slice(0, numItems); // Take the first `numItems` items
    };

    const suggestionDestination = getRandomItems(destinationData, 8);

    window.onresize = () => {
        const suggestionWidth = document.querySelector(".suggestionContainer > div").offsetWidth;
        const suggestionContainer = document.querySelector(".suggestionContainer");
        suggestionContainer.style.transform = `translateX(${-suggestionWidth}px)`;
    }
    return (
        <div className="suggestionContainer">
            {suggestionDestination.map((dest) =>
                <Suggestion key={dest.id}
                imageURL={dest.imageUrl}
                location={dest.city.split(",")[0]}
                price={`From $${Math.floor(Math.random() * (600 - 100 + 1)) + 100}`}
                isLightMode={isLightMode}/>
            )}
            {/*<Suggestion imageURL={vnuImage} location="University of Engineering and Technology" price="66USD" isLightMode={isLightMode}/>*/}
            {/*<Suggestion imageURL="https://www.travelguide.net/media/new-york.jpeg" location="New York"*/}
            {/*            price="100 USD" isLightMode={isLightMode}/>*/}
            {/*<Suggestion imageURL="https://media.timeout.com/images/106181719/750/562/image.jpg" location="Paris"*/}
            {/*            price="100 USD" isLightMode={isLightMode}/>*/}
            {/*<Suggestion*/}
            {/*    imageURL="https://ik.imagekit.io/tvlk/blog/2022/06/thap-tokyo-nhat-ban-2.jpg?tr=c-at_max?tr=c-at_max"*/}
            {/*    location="Tokyo" price="100 USD" isLightMode={isLightMode}/>*/}
            {/*<Suggestion*/}
            {/*    imageURL="https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg"*/}
            {/*    location="Sydney" price="100 USD" isLightMode={isLightMode}/>*/}
            {/*<Suggestion imageURL="https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg"*/}
            {/*            location="Ho Chi Minh City" price="100 USD" isLightMode={isLightMode}/>*/}
            {/*<Suggestion*/}
            {/*    imageURL="https://media.istockphoto.com/id/1143539287/vi/anh/eo-bi%E1%BB%83n-amsterdam-h%C3%A0-lan-c%C3%B3-s%C3%B4ng-amstel.jpg?s=612x612&w=0&k=20&c=9-TKGqrzO42BI1Cbos7wJSJV6iP82ACjS-Q7AoK8c0E="*/}
            {/*    location="Amsterdam" price="100 USD" isLightMode={isLightMode}/>*/}
            {/*<Suggestion*/}
            {/*    imageURL="https://www.vietnamairlines.com/~/media/Images/Discovery/England/London/canh%20dep/986x906/London_canhdep_986x906.jpg"*/}
            {/*    location="London" price="100 USD" isLightMode={isLightMode}/>*/}
        </div>
    )
}

