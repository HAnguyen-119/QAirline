import {next, prev} from "../../../utils/SuggestionNav.js";
import {useOutletContext} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";

import ('./ButtonSlider.css')

export default function ButtonSlider() {
    const isLightMode = useOutletContext()
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem"
        }}>
            <div className={`prev${isLightMode ? "" : " dark"}`} onClick={(e) => {
                prev();
                e.target.disabled = true;
                setTimeout(() => {
                    e.target.disabled = false
                }, 500)
            }}><FontAwesomeIcon icon={faCircleArrowLeft} size="2x"/></div>
            <p>o o o o o o o</p>
            <div className={`next${isLightMode ? "" : " dark"}`} onClick={(e) => {
                next();
                e.target.disabled = true;
                setTimeout(() => {
                    e.target.disabled = false
                }, 500)
            }}><FontAwesomeIcon icon={faCircleArrowRight} size="2x"/></div>
        </div>
    )
}