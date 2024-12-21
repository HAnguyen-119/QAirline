import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import userAPI from "../../api/userAPI.jsx";

export default function DashboardItem({icon, page, title, isAccount, children}) {
    const [isChanging, setIsChanging] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(JSON.parse(sessionStorage.getItem("userData")).password);
    // const [isValid, setIsValid] = useState(false);

    const handleChange = () => {
        setIsChanging(true);
    }

    const handleCancel = () => {
        setIsChanging(false);
    }

    const handleConfirm = () => {
        const newPass = document.getElementById("new-pass").value;
        const confirmPass = document.getElementById("confirm-pass").value;

        const isValid = newPass.length > 0 && newPass === confirmPass;

        try {
            if (isValid) {
                const newUserData = {
                    'email': JSON.parse(sessionStorage.getItem("userData")).email,
                    'currentPassword': JSON.parse(sessionStorage.getItem("userData")).password,
                    'newPassword': newPass,
                    'confirmationPassword': confirmPass
                }
                console.log(newUserData);
                userAPI.changePassword(newUserData);
                setCurrentPassword(newPass);
                setIsChanging(false);
            } else {
                window.alert("Confirm password/new password is empty or they do not match.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-item">
            <div>
                <div><FontAwesomeIcon icon={icon}/></div>
                <div>{title}</div>
            </div>
            <div>
                {isAccount ?
                    <div>
                        <ul>
                            <li>Email: {JSON.parse(sessionStorage.getItem("userData")).email}</li>
                            {isChanging ?
                                (<li>New Password: <span style={{color: "red"}}>*</span>
                                    <br/><input id="new-pass" type="password"/></li>) :
                                (<li>Password: <br/>
                                    <input type={`${isViewing ? "text" : "password"}`}
                                           value={currentPassword}/> <FontAwesomeIcon icon={isViewing ? faEyeSlash : faEye}
                                                     onClick={() => {setIsViewing(!isViewing)}}/></li>)}
                            {isChanging ? <li>Confirm: <span style={{color: "red"}}>*</span><br/><input id="confirm-pass" type="password"/>
                            </li> : null}
                        </ul>
                    </div> : children}
            </div>
            <div>
            {isAccount ? ( isChanging ?
                        <div className="changing-password-bt">
                            <div className="cancel" onClick={handleCancel}>Cancel</div>
                            <div className="confirm" onClick={handleConfirm}>Confirm</div>
                        </div> :
                    <div className="change-password" onClick={handleChange}>Change password</div>) :
                <NavLink to={`/admin/${page}`}>Manage</NavLink>}
            </div>
        </div>
    )
}