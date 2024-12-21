import Discount from "./Discount.jsx";
import {useOutletContext} from "react-router-dom";

import ('./Discount.css')

export default function Discounts({discountData}) {
    const isLightMode = useOutletContext();
    return (
        <div className="discountContainer">
            {discountData.map(discount =>
                <Discount key={discount.id}
                          content={discount.title}
                          contentImage={discount.imageUrl}
                          isLightMode={isLightMode}
                          details={discount.content}/>
            )}
            {/*<Discount content={contents[0]} isLightMode={isLightMode}/>*/}
            {/*<Discount content={contents[1]} isLightMode={isLightMode}/>*/}
            {/*<Discount content={contents[2]} isLightMode={isLightMode}/>*/}
            {/*<Discount content={contents[3]} isLightMode={isLightMode}/>*/}
        </div>
    )
}

