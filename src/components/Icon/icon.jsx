import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Icon({ name, iconName }) {
    return (
        <span className={name}>
            <FontAwesomeIcon icon={iconName}/>
        </span>
    );
}