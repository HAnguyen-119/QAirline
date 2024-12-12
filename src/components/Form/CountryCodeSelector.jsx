import React from 'react';
import DivContainer from '../DivContainer.jsx';
import codes from '../../data/CountryCode.js';

export default function CountryCodeSelector({ htmlFor, description, id, value, onChange }) {
    return (
        <DivContainer parentClass={'form-wrapper'}>
            <label htmlFor={htmlFor}>{description}</label>
            <select id={id} value={value} onChange={onChange}>
                {codes.map(({ countryCodes, country }) => (
                    countryCodes.map(code => (
                        <option key={code} value={code}>
                            {country} ({code})
                        </option>
                    ))
                ))}
            </select>
        </DivContainer>
    );
}