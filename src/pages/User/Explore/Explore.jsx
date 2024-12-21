import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";
import Destination from "../../../components/Explore/Destination.jsx";

import './Explore.css'

export default function Explore() {
    const isLightMode = useOutletContext();

    const [region, setRegion] = useState("Asia");
    const [regionIndex, setRegionIndex] = useState(0);
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

    const regions = ["Asia", "Europe", "Africa", "America", "Oceania"];
    const destinationFiltered = destinationData.filter((dest) => dest.region === region);
    const handleActive = (index) => {
        setRegionIndex(index);
    }

    return (
        <div className='explore-container'>
            <div className='explore'>
                <h1>Explore our destinations</h1>
                <div style={{alignSelf: "center", textAlign: "center"}}>QAirline provides flights to over 50 destinations around the world</div>
                <div className="destination-container">
                    <div className={`regions ${isLightMode ? "" : "dark"}`}>
                        {regions.map((region, index) => (
                            <div key={index}
                                 onClick={() => 
                                 {handleActive(index); setRegion(region)}}
                                 style={{backgroundColor: regionIndex === index ?
                                         isLightMode ? "var(--dark)" : "var(--light)" :
                                         isLightMode ? "var(--light)" : "var(--dark)",
                                         color: regionIndex === index ?
                                         isLightMode ? "var(--light)" : "var(--dark)" :
                                         isLightMode ? "var(--dark)" : "var(--light)" }}>
                                 {region}
                            </div>
                        ))}
                    </div>
                    <div className="destinations">
                        {destinationFiltered.map((dest) =>
                            <Destination key={dest.id}
                                         name={dest.city.split(",")[0]}
                                         description={dest.description}
                                         image={dest.imageUrl}
                                         isLightMode={isLightMode}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}