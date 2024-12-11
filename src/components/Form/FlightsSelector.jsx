import './Form.css';
import {useEffect, useState} from "react";
import userAPI from "../../api/userAPI.jsx";

export default function FlightsSelector({ htmlFor, description, id, value, onChange }) {
    const [airports, setAirports] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const airports = await userAPI.getAllAirports()
                setAirports(airports);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <select id={id} value={value} onChange={onChange}>
                {Array.from(new Set(airports.map(airport => airport.area))).map(area => (
                    <optgroup label={area} key={area}>
                        {airports.filter(airport => airport.area === area).map(airport => (
                            <option value={airport.id} key={airport.id}>
                                {airport.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
}

