import React from "react";
import './Form.css';

export default function InputElement({htmlFor, description, type, id, value, name, onChange, required, checked, minDate}) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>
                {description} {required && <span style={{color: 'red'}}>*</span>}
            </label>
            <input type={type} id={id} value={value} onChange={onChange} name={name} required={required}
                   checked={checked} min={minDate}/>
        </div>
    );
}