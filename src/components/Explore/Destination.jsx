import {NavLink} from "react-router-dom";

import './Destination.css'

export default function Destination({name, image, description, isLightMode}) {
    return (
        <div className={`destination ${isLightMode ? '' : 'dark'}`}>
            <div>
                <div style={{backgroundImage: `url(${image})`}}></div>
                <h2>{name}</h2>
            </div>
            <div>
                <div>{name}</div>
                <div>{description}</div>
                <NavLink to="/booking">Book now</NavLink>
            </div>
        </div>
    )
}