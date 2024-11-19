import {NavLink} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Discount({content, isLightMode}) {
    return (
        <div className={`discount${isLightMode ? "" : "dark"}`}>
            <div></div>
            <div>
                <p>{content}</p>
                <NavLink to="/booking">More details</NavLink>
            </div>
        </div>
    )
}

export const contents = ["Christmas and New Year pack",
    "Save up to 10% when travel with groups",
    "20% off for students",
    "Fly to Viet Nam - 20% off"]
