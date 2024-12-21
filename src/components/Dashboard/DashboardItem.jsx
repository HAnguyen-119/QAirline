import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

export default function DashboardItem({icon, page, title, isAccount, children}) {
    return (
        <div className="dashboard-item">
            <div>
                <div><FontAwesomeIcon icon={icon}/></div>
                <div>{title}</div>
            </div>
            <div>{children}</div>
            <div>
                {isAccount ? <div className="change-password">Change password</div> :
                <NavLink to={`/admin/${page}`}>Manage</NavLink>}
            </div>
        </div>
    )
}