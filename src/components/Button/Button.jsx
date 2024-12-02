import React from "react";

export default function Button({ parentClass, type, buttonClass, onClick, text }) {
    return (
        <button type={type} className={buttonClass} onClick={onClick}>
            {text}
        </button>
    );
}