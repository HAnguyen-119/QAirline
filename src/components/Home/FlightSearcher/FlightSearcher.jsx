import H1Text from "../../H1Text.jsx";
import Itinerary from "../../Booking/Itinerary/Itinerary.jsx";

import ('./FlightSearcher.css')

// eslint-disable-next-line react/prop-types
export default function FlightSearcher({isLightMode}) {
    return (
        <div className={`flightSearcherContainer${isLightMode ? "" : " dark"}`} >
            <h1>Enjoy the best experiences at QAirline !</h1>
            <div className={`flightSearcher${isLightMode ? "" : " dark"}`}>
                <Itinerary hasTitle={false}/>
            </div>
        </div>
    )
}