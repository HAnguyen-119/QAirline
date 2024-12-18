import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

export default function DashboardItem({icon, page, title, children}) {
    return (
        <div className="dashboard-item">
            <div>
                <div><FontAwesomeIcon icon={icon}/></div>
                <div>{title}</div>
            </div>
            <div>{children}</div>
            <div><NavLink to={`/admin/${page}`}>Manage</NavLink></div>
        </div>
    )
}