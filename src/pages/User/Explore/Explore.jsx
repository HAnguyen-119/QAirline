import Suggestions from "../../../components/Home/Suggestions/Suggestions.jsx";
import ButtonSlider from "../../../components/Home/Slider/ButtonSlider.jsx";
import {NavLink, useOutletContext} from "react-router-dom";
import HorizontalRule from "../../../components/HorizontalRule.jsx";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";
import Destination from "../../../components/Explore/Destination.jsx";

import './Explore.css'

export default function Explore() {
    const isLightMode = useOutletContext();

    const [region, setRegion] = useState("Asia");
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


    return (
        <div className='explore-container'>
            <div className='explore'>
                <h1>Explore our destinations !</h1>
                <div style={{alignSelf: "center"}}>QAirline provides flights to over 50 destinations around the world</div>
                <div className="destination-container">
                    <div className="regions" style={{alignSelf: "center"}}>
                        <div>Asia</div>
                        <div>Europe</div>
                        <div>America</div>
                        <div>Africa</div>
                        <div>Oceania</div>
                    </div>
                    <div className="destinations">
                        {postData.map((post) =>
                            <Destination key={post.id}
                                         name={post.title}
                                         description={post.content}
                                         image={post.imageUrl} />
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}