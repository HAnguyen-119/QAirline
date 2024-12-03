import './AboutContent.css'
import {NavLink} from "react-router-dom";

export default function AboutContent({content, page, background, description}) {
    return (
        <div className='about-content' style={{ backgroundImage: `url(${background})` }}>
            <NavLink to={`./${page}`} onClick={() => {
                let specificContent = document.querySelector(".specific-content");
                specificContent.style.display = "block";
                specificContent.scrollIntoView({behavior: "smooth"});
            }}>{content}</NavLink>
            <div>{description}</div>
        </div>
    )
}