import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Button({ type, buttonClass, onClick, text, icon }) {
    return (
        <button type={type} className={buttonClass} onClick={onClick}>
            {icon && <FontAwesomeIcon icon={icon} style={{marginRight: '8px', fontSize: '1.2rem'}} />}
            {text}
        </button>
    );
}