import Suggestions from "../../../components/Home/Suggestions/Suggestions.jsx";
import FlightSearcher from "../../../components/Home/FlightSearcher/FlightSearcher.jsx";

import "./home.css";
import {NavLink, useOutletContext} from "react-router-dom";
import Discounts from "../../../components/Home/Discounts/Discounts.jsx";
import Subscribe from "../../../components/Home/Subscribe/Subscribe.jsx";
import NewsContainer from "../../../components/Home/News/NewsContainer.jsx";
import ButtonSlider from "../../../components/Home/Slider/ButtonSlider.jsx";
import HorizontalRule from "../../../components/HorizontalRule.jsx";
import H1Text from "../../../components/H1Text.jsx";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";
import {next, prev} from "../../../utils/SuggestionNav.js";
import Itinerary from "../../../components/Booking/Itinerary/Itinerary.jsx";

export default function Home() {
    const isLightMode = useOutletContext();
    const [postData, setPostData] = useState([]);
    const [discountIndex, setDiscountIndex] = useState(0);
    const [newsIndex, setNewsIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await userAPI.getAllPosts();
                const postsWithImages = await Promise.all(
                    posts.map(async (post) => {
                        const imageResponse = await userAPI.getPostImageById(post);
                        const imageUrl = URL.createObjectURL(imageResponse);
                        return {...post, imageUrl};
                    })
                );
                setPostData(postsWithImages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const newsData = postData.filter(post => post.type.toLowerCase() === 'news');
    const discountData = postData.filter(post => post.type.toLowerCase() === 'discount');
    console.log(discountData.length);
    console.log(newsData.length);

    const nextDiscount = () => {
        setDiscountIndex((discountIndex + 1) % discountData.length);
    }

    const prevDiscount = () => {
        setDiscountIndex((discountIndex + discountData.length - 1) % discountData.length);
    }

    const nextNews = () => {
        setNewsIndex((newsIndex + 1) % newsData.length);
    }

    const prevNews = () => {
        setNewsIndex((newsIndex + newsData.length - 1) % newsData.length);
    }

    const newsFilter = newsData.length > 3 ?
        (newsIndex <= newsData.length - 3 ?
        newsData.slice(newsIndex, newsIndex + 3) :
        newsData.slice(newsIndex, newsData.length).concat(newsData.slice(0, 3 - (newsData.length - newsIndex)))) : newsData;

    const discountFilter = discountData.length > 4 ?
        (discountIndex <= discountData.length - 4 ?
        discountData.slice(discountIndex, discountIndex + 4) :
        discountData.slice(discountIndex, discountData.length).concat(discountData.slice(0, 4 - (discountData.length - discountIndex)))) : discountData;

    return (
        <div className="home">
            {/*Flight searcher section*/}
            {/*<H1Text style={{marginTop: "3rem"}} content={"Enjoy the best experience at QAirline"}/>*/}
            <FlightSearcher isLightMode={isLightMode}/>
            {/*<Itinerary/>*/}
            <HorizontalRule/>

            {/*Recommendations section*/}
            <H1Text content={"Recommendations"}/>
            <div className="suggestion-carousel">
                <Suggestions/>
            </div>
            <br/>
            <ButtonSlider nextHandle={next} prevHandle={prev}/>
            <NavLink className={`more${isLightMode ? "" : " dark"}`} to="/explore">Explore more</NavLink>
            <HorizontalRule/>

            {/*Discounts section*/}
            <H1Text content={"Special Discounts"}/>
            <Discounts discountData={discountFilter} />
            {/*<NavLink className={`more${isLightMode ? "" : " dark"}`} to="/explore">See more discounts</NavLink>*/}
            <ButtonSlider nextHandle={nextDiscount} prevHandle={prevDiscount}/>
            <HorizontalRule/>

            {/*News section*/}
            <H1Text content={"Latest News"}/>
            <NewsContainer newsData={newsFilter}/>
            <ButtonSlider nextHandle={nextNews} prevHandle={prevNews}/>
            <HorizontalRule/>

            {/*Subscribe section*/}
            <Subscribe isLightMode={isLightMode}/>
        </div>
    )
}