import Discount, {contents} from "./Discount.jsx";
import {NavLink} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function DiscountContainer({isLightMode}) {
    return (
        <>
            <div className="discountContainer">
                <Discount content={contents[0]} isLightMode={isLightMode}/>
                <Discount content={contents[1]} isLightMode={isLightMode}/>
                <Discount content={contents[2]} isLightMode={isLightMode}/>
                <Discount content={contents[3]} isLightMode={isLightMode}/>
            </div>
            <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/booking">See more discounts</NavLink>
        </>
    )
}