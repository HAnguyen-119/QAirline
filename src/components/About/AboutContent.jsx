import './AboutContent.css'
import {NavLink} from "react-router-dom";

export default function AboutContent({content, background, description, isLightMode}) {
    return (
        <div className={`about-content ${isLightMode ? "" : "dark"}`} style={{ backgroundImage: `url(${background})` }}>
            <h1>{content}</h1>
            <div>
                <div></div>
                <div>{description}</div>
            </div>
        </div>
    )
}