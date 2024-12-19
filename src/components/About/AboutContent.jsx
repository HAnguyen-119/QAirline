import './AboutContent.css'
import {NavLink} from "react-router-dom";

export default function AboutContent({content, background, description}) {
    return (
        <div className='about-content' style={{ backgroundImage: `url(${background})` }}>
            <h1>{content}</h1>
            <div>
                <div></div>
                <div>{description}</div>
            </div>
        </div>
    )
}