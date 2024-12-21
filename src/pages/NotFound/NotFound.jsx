import './NotFound.css'
import {NavLink} from "react-router-dom";

export default function NotFound({isAdmin}) {
    return (
        <div className="not-found">
            <div style={{backgroundImage: `url('${isAdmin ? ".." : "."}/src/assets/images/404.png')`}}></div>
            <div>
                <h1>Oops! Page not found</h1>
                <div>The page you are looking for doesn't exist or another error occurred.</div>
                <NavLink to={`${isAdmin ? "/admin" :"/"}`}> {isAdmin ? "Dashboard" : "Home"}</NavLink>
            </div>
        </div>
    )
}