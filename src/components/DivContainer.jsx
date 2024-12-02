import React from "react";

export default function DivContainer({ parentClass, children }) {
    return (
        <div className={parentClass}>
            {children}
        </div>
    );
}