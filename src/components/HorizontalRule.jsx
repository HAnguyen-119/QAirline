import {useOutletContext} from "react-router-dom";

export default function HorizontalRule() {
    const isLightMode = useOutletContext()
    return (
        <hr className={isLightMode ? "" : " dark"}/>
    )
}