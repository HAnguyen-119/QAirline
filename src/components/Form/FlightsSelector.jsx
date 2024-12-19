import React, { useState, useEffect } from 'react';
import userAPI from "../../api/userAPI.jsx";
import DivContainer from "../DivContainer.jsx";
import './FlightsSelector.css';

export default function FlightsSelector({ htmlFor, description, id, value, onChange }) {
    const [query, setQuery] = useState('');
    const [filteredSuggestion, setFilteredSuggestion] = useState([]);
    const [airports, setAirports] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const airports = await userAPI.getAllAirports();
                setAirports(airports);
                const uniqueRegions = [...new Set(airports.map(airport => airport.region))];
                setRegions(uniqueRegions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleFocus = () => {
        if (!isFocus && query.trim() !== '') {
            setQuery('');
            setFilteredSuggestion(airports);
        }
        setIsFocus(true);
        if (query.trim() === '') {
            setFilteredSuggestion(airports);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);
        filterSuggestions(input, selectedRegion);
    };

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        filterSuggestions(query, region);
    };

    const filterSuggestions = (input, region) => {
        let filtered = airports;
        if (region !== '') {
            filtered = filtered.filter(airport => airport.region === region);
        }
        if (input.trim() !== '') {
            filtered = filtered.filter(airport =>
                airport.name.toLowerCase().startsWith(input.toLowerCase()) ||
                airport.code.toLowerCase().startsWith(input.toLowerCase())
            );
        }
        setFilteredSuggestion(filtered);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(`${suggestion.name} (${suggestion.code})`);
        onChange({ target: { value: suggestion.id } });
        setFilteredSuggestion([]);
    };

    const handleBlur = () => {
        setTimeout(() => { setFilteredSuggestion([]);
        setSelectedRegion('');
        setIsFocus(false);
        }, 300);
    };

    return (
        <DivContainer parentClass='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <input
                type='text'
                id={id}
                className='airport-input'
                value={query}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required={true}
            />
            {isFocus && (
                <div className="suggestions-airport-container">
                    <div className="region-container">
                        {regions.map((region, index) => (
                            <span key={index} className={`region-item ${selectedRegion === region ? 'active' : ''}`} onMouseDown={(e) => { e.preventDefault(); handleRegionChange(region); }}>
                                {region}
                            </span>
                        ))}
                    </div>
                    <div className="suggestions-airport">
                        {filteredSuggestion.map((airport, index) => (
                            <span
                                key={index}
                                onClick={() => handleSuggestionClick(airport)}
                                className="suggestion-item"
                            >
                                {airport.name} ({airport.code})
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </DivContainer>
    );
}