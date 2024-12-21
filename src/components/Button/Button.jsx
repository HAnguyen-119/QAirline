import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Button({ type, buttonClass, onClick, text, icon }) {
    return (
        <button type={type} className={buttonClass} onClick={onClick}>
            {icon && <FontAwesomeIcon icon={icon} />}
            {text}
        </button>
    );
}