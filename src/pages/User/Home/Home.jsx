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

export default function Home() {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await userAPI.getAllPosts();
                const postsWithImages = await Promise.all(
                    posts.map(async (post) => {
                        const imageResponse = await userAPI.getPostImageById(post);
                        const imageUrl = URL.createObjectURL(imageResponse);
                        return { ...post, imageUrl };
                    })
                );
                setPostData(postsWithImages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const newsFilter = postData.filter(post => post.type === 'news').slice(0, 3);
    const discountFilter = postData.filter(post => post.type.toLowerCase() === 'discount').slice(0, 4);
    console.log(newsFilter)

    const isLightMode = useOutletContext();
    return (
        <div className="home">
            {/*Flight searcher section*/}
            {/*<H1Text style={{marginTop: "3rem"}} content={"Enjoy the best experience at QAirline"}/>*/}
            <FlightSearcher isLightMode={isLightMode}/>
            <HorizontalRule/>

            {/*Recommendations section*/}
            <H1Text content={"Recommendations"}/>
            <div className="suggestion-carousel">
                <Suggestions/>
            </div>
            <br/>
            <ButtonSlider/>
            <NavLink className={`more${isLightMode ? "" : " dark"}`} to="/explore">Explore more</NavLink>
            <HorizontalRule/>

            {/*Discounts section*/}
            <H1Text content={"Discounts"}/>
            <Discounts discountData={discountFilter} />
            <NavLink className={`more${isLightMode ? "" : " dark"}`} to="/explore">See more discounts</NavLink>
            <HorizontalRule/>

            {/*News section*/}
            <H1Text content={"News"}/>
            <NewsContainer newsData={newsFilter}/>
            <NavLink className={`more${isLightMode ? "" : " dark"}`} to="/explore">Read more</NavLink>
            <HorizontalRule/>

            {/*Subscribe section*/}
            <Subscribe isLightMode={isLightMode}/>
        </div>
    )
}