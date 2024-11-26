import {next, prev} from "../../../utils/SuggestionNav.js";
import {useOutletContext} from "react-router-dom";

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
            <button className={`prev${isLightMode ? "" : " dark"}`} onClick={(e) => {
                prev();
                e.target.disabled = true;
                setTimeout(() => {
                    e.target.disabled = false
                }, 500)
            }}></button>
            <p>o o o o o</p>
            <button className={`next${isLightMode ? "" : " dark"}`} onClick={(e) => {
                next();
                e.target.disabled = true;
                setTimeout(() => {
                    e.target.disabled = false
                }, 500)
            }}></button>
        </div>
    )
}