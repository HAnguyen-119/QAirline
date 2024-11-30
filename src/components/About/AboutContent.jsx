import './AboutContent.css'
import {NavLink} from "react-router-dom";

export default function AboutContent({content, page, background, description}) {
    return (
        <div className='about-content' style={{ backgroundImage: `url(${background})` }}>
            <NavLink to={`./${page}`} onClick={() => {
                document.getElementById("specific-content").scrollIntoView({behavior: "smooth"});
            }}>{content}</NavLink>
            <div>{description}</div>
        </div>
    )
}