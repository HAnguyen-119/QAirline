import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function BasicInfo({icon, number, info}) {
    return (
        <div className="basic-info">
            <FontAwesomeIcon icon={icon} size="6x"/>
            <div>{number}</div>
            <div>{info}</div>
        </div>
    )
}