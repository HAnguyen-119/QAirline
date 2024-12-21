import React from "react";
import './Form.css';

export default function TitleSelector({ htmlFor, description, id, value, onChange, required }) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>
                {description} {required && <span style={{ color: 'red' }}>*</span>}
            </label>
            <select id={id} value={value} onChange={onChange} required={required} autoComplete={'off'}>
                <option value='MR'>Mr</option>
                <option value='MRS'>Mrs</option>
                <option value='MS'>Ms</option>
                <option value='DOCTOR'>Doctor</option>
                <option value='PROFESSOR'>Professor</option>
                <option value='BOY'>Boy</option>
                <option value='GIRL'>Girl</option>
            </select>
        </div>
    );
}