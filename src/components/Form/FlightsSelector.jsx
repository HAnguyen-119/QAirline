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
    console.log(airports)
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <select id={id} value={value} onChange={onChange}>
                {Array.from(new Set(airports.map(airport => airport.region))).map(region => (
                    <optgroup label={region} key={region}>
                        {airports.filter(airport => airport.region === region).map(airport => (
                            <option value={airport.id} key={airport.id}>
                                {airport.name} ({airport.code})
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
}

