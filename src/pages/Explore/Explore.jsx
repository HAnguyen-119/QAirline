import Suggestions from "../../components/Home/Suggestions/Suggestions.jsx";
import ButtonSlider from "../../components/Home/Slider/ButtonSlider.jsx";
import {NavLink, useOutletContext} from "react-router-dom";
import HorizontalRule from "../../components/HorizontalRule.jsx";



export default function Explore() {
    const isLightMode = useOutletContext();
    return (
        <div className='explore-container'>
            <div className='explore'>
                <h1>Explore</h1>
            </div>
            <div className='places'>
                <h2>Popular Destinations</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
            <div className='places'>
                <h2>Most Visited</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
            <div className='places'>
                <h2>Best Deals</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
            <div className='places'>
                <h2>Upcoming Events & Seasonal Destinations</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
            <div className='places'>
                <h2>Personalized Recommendations</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
            <div className='places'>
                <h2>Top-Rated Flights</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
            <div className='places'>
                <h2>Trending Searches</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
            <div className='places'>
                <h2>Best Deals</h2>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                    <Suggestions/>
                </div>
                <br/>
                <ButtonSlider/>
                <NavLink className={`moreDiscount${isLightMode ? "" : " dark"}`} to="/Explore">See more places</NavLink>
                <HorizontalRule/>
            </div>
        </div>
    )
}