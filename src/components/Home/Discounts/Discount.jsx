import {NavLink} from "react-router-dom";
import {useState} from "react";

import ('./Discount.css')

// eslint-disable-next-line react/prop-types
export default function Discount({content, contentImage, isLightMode, details}) {
    const [isMoreDetails, setIsMoreDetails] = useState(false);

    const handleMoreDetails = () => {
        setIsMoreDetails(true);
    }

    const handleCancel = () => {
        setIsMoreDetails(false);
    }

    return (
        <div className={`discount${isLightMode ? "" : " dark"}`}>
            <div style={{backgroundImage: `url(${contentImage})`}}></div>
            <div>
                <p>{content}</p>
                <div onClick={handleMoreDetails}>More details</div>
            </div>
            {isMoreDetails ?
            <div className="details-container">
                <div></div>
                <div className="details">
                    <div style={{backgroundImage: `url("${contentImage}")`}}></div>
                    <div>{content}</div>
                    <div>{details}</div>
                    <div>
                        <div onClick={handleCancel}>OK</div>
                        <NavLink to="/booking">Book now</NavLink>
                    </div>
                </div>
            </div> : null }
        </div>
    )
}

export const contents = ["Christmas and New Year pack",
    "Save up to 10% when travel with groups",
    "20% off for students",
    "Fly to Viet Nam - 20% off"]
