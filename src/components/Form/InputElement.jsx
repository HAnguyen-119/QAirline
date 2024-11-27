import React from "react"

import ('./Form.css')

export default function InputElement({htmlFor, description, type, id, value, onChange}) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <input type={type} id={id} value={value} onChange={onChange}/>
        </div>
    )
}