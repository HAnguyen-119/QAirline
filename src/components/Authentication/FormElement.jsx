import React from "react"

export default function FormElement({htmlFor, description, type, id, value, onChange}) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <input type={type} id={id} value={value} onChange={onChange}/>
        </div>
    )
}