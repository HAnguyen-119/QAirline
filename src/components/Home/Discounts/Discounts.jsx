import Discount from "./Discount.jsx";
import {useOutletContext} from "react-router-dom";
import {contents} from "./Discount.jsx";

import ('./Discount.css')

export default function Discounts() {
    const isLightMode = useOutletContext();
    return (
        <div className="discountContainer">
            <Discount content={contents[0]} isLightMode={isLightMode}/>
            <Discount content={contents[1]} isLightMode={isLightMode}/>
            <Discount content={contents[2]} isLightMode={isLightMode}/>
            <Discount content={contents[3]} isLightMode={isLightMode}/>
        </div>
    )
}

