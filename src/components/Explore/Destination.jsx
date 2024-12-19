import {NavLink} from "react-router-dom";

import './Destination.css'

export default function Destination({name, image, description}) {
    return (
        <div className="destination">
            <div>
                <div style={{backgroundImage: `url(${image})`}}></div>
                <h3>{name}</h3>
            </div>
            <div>
                <div>{name}</div>
                <div>{description}</div>
                <NavLink to="/booking">Book now</NavLink>
            </div>
        </div>
    )
}