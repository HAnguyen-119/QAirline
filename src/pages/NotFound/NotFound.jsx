import './NotFound.css'
import {NavLink} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found">
            <div style={{backgroundImage: "url('./src/assets/images/404.png')"}}></div>
            <div>
                <h1>Oops! Page not found</h1>
                <div>The page you are looking for doesn't exist or another error occurred.</div>
                <NavLink to="/">Home</NavLink>
            </div>
        </div>
    )
}