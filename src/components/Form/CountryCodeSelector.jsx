import React, { useState } from 'react';
import DivContainer from '../DivContainer.jsx';
import codes from '../../data/CountryCode.js';

import './CountryCodeSelector.css';

export default function CountryCodeSelector({ htmlFor, description}) {
    const [query, setQuery] = useState('');
    const [filteredSuggestion, setFilteredSuggestion] = useState([]);

    const handleFocus = () => {
        if (query.trim() === '') {
            setFilteredSuggestion(codes);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input.trim() === '') {
            setFilteredSuggestion(codes);
        } else {
            const filtered = codes.filter((code) => {
                return code.country.toLowerCase().startsWith(input.toLowerCase()) ||
                    code.countryCodes.some(c => c.startsWith(input));
            });
            setFilteredSuggestion(filtered);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.country + ' (+' + suggestion.countryCodes + ')');
        setFilteredSuggestion([]);
    };

    const handleBlur = () => {
        setTimeout(() => setFilteredSuggestion([]), 300);
    };

    return (
        <DivContainer parentClass={'form-wrapper country'}>
            <label htmlFor={htmlFor}>{description}</label>
            <input
                type='text'
                className='country-input'
                value={query}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {filteredSuggestion.length > 0 && (
                <ul className="suggestions">
                    {filteredSuggestion.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(item)}
                            className="suggestion-item"
                        >
                            {item.country} (+{item.countryCodes})
                        </li>
                    ))}
                </ul>
            )}
        </DivContainer>
    );
}