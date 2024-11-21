import Suggestion from "./Suggestion.jsx";
import vnuImage from "../../assets/images/vnu.jpg";

// eslint-disable-next-line react/prop-types
export default function SuggestionContainer({isLightMode}) {
    function next() {
        const suggestionWidth = document.querySelector(".suggestion").offsetWidth;
        const suggestionContainer = document.querySelector(".suggestionContainer");
        const gap = parseFloat(getComputedStyle(suggestionContainer).gap)
        suggestionContainer.style.transform = `translateX(${-2 * (suggestionWidth + gap)}px)`;
        suggestionContainer.style.transition = "transform 0.5s ease";
        setTimeout(() => {
            const first = suggestionContainer.firstChild;
            suggestionContainer.removeChild(first);
            suggestionContainer.appendChild(first);
            suggestionContainer.style.transform = `translateX(${- suggestionWidth - gap}px)`;
            suggestionContainer.style.transition = "none";
        }, 500);
    }

    function prev() {
        const suggestionWidth = document.querySelector(".suggestion").offsetWidth;
        const suggestionContainer = document.querySelector(".suggestionContainer");
        const gap = parseFloat(getComputedStyle(suggestionContainer).gap)
        suggestionContainer.style.transform = `translateX(0)`;
        suggestionContainer.style.transition = "transform 0.5s ease";
        setTimeout(() => {
            const last = suggestionContainer.lastChild;
            suggestionContainer.removeChild(last);
            suggestionContainer.insertBefore(last, suggestionContainer.firstChild);
            suggestionContainer.style.transform = `translateX(${- suggestionWidth - gap}px)`;
            suggestionContainer.style.transition = "none";
        }, 500);
    }
    return (
        <>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden"}}>
                <div className="suggestionContainer">
                    <Suggestion imageURL={vnuImage} location="University of Engineering and Technology" price="66USD"
                                isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://www.travelguide.net/media/new-york.jpeg" location="New York"
                                price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://media.timeout.com/images/106181719/750/562/image.jpg" location="Paris"
                                price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://ik.imagekit.io/tvlk/blog/2022/06/thap-tokyo-nhat-ban-2.jpg?tr=c-at_max?tr=c-at_max"
                        location="Tokyo" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg"
                        location="Sydney" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion imageURL="https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg"
                                location="Ho Chi Minh City" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://media.istockphoto.com/id/1143539287/vi/anh/eo-bi%E1%BB%83n-amsterdam-h%C3%A0-lan-c%C3%B3-s%C3%B4ng-amstel.jpg?s=612x612&w=0&k=20&c=9-TKGqrzO42BI1Cbos7wJSJV6iP82ACjS-Q7AoK8c0E="
                        location="Amsterdam" price="100 USD" isLightMode={isLightMode}/>
                    <Suggestion
                        imageURL="https://www.vietnamairlines.com/~/media/Images/Discovery/England/London/canh%20dep/986x906/London_canhdep_986x906.jpg"
                        location="London" price="100 USD" isLightMode={isLightMode}/>
                </div>
            </div>
            <br/>
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
        </>
    )
}