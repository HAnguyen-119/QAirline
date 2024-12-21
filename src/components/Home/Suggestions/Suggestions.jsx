import Suggestion from "./Suggestion.jsx";

import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";

import ('./Suggestion.css')

export default function Suggestions() {
    const isLightMode = useOutletContext();

    const [destinationData, setDestinationData] = useState([]);
    const [randomDestination, setRandomDestination] = useState([]);

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

    useEffect(() => {
        if (destinationData.length > 0) {
            setRandomDestination(getRandomItems(destinationData, 8));
        }
    }, [destinationData]);

    const getRandomItems = (arr, numItems) => {
        const shuffled = [...arr]; // Copy the array to avoid modifying the original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
        }
        return shuffled.slice(0, numItems); // Take the first `numItems` items
    };

    window.onresize = () => {
        const suggestionWidth = document.querySelector(".suggestionContainer > div").offsetWidth;
        const suggestionContainer = document.querySelector(".suggestionContainer");
        suggestionContainer.style.transform = `translateX(${-suggestionWidth}px)`;
    }
    return (
        <div className="suggestionContainer">
            {randomDestination.map((dest) =>
                <Suggestion key={dest.id}
                imageURL={dest.imageUrl}
                location={dest.city.split(",")[0]}
                price={`From $${Math.floor(Math.random() * (600 - 100 + 1)) + 100}`}
                isLightMode={isLightMode}/>
            )}
        </div>
    )
}

