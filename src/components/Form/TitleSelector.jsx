import React from "react";
import './Form.css';

export default function TitleSelector({ htmlFor, description, id, value, onChange, required }) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>
                {description} {required && <span style={{ color: 'red' }}>*</span>}
            </label>
            <select id={id} value={value} onChange={onChange} required={required}>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Ms'>Ms</option>
            </select>
        </div>
    );
}