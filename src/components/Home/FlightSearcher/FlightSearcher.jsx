import H1Text from "../../H1Text.jsx";
import Itinerary from "../../Booking/Itinerary/Itinerary.jsx";
import {useEffect, useState} from "react";

import ('./FlightSearcher.css')

// eslint-disable-next-line react/prop-types
export default function FlightSearcher({isLightMode}) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
    }

    return (
        <div className={`flightSearcherContainer${isLightMode ? "" : " dark"}`} >
            <h1>Enjoy the best experiences at QAirline !</h1>
            <div className={`flightSearcher${isLightMode ? "" : " dark"} ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
                <Itinerary hasTitle={false}/>
            </div>
        </div>
    )
}