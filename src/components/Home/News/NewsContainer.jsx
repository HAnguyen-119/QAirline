import News, {newsContents} from "./News.jsx";
import {useOutletContext} from "react-router-dom";

import ('./News.css')

export default function NewsContainer({newsData}) {
    const isLightMode = useOutletContext();
    return (
        <div className={`newsContainer${isLightMode ? "" : " dark"}`}>
            {newsData.map(news =>
                <News key={news.id} date={news.postedTime.substring(0, 10)} content={news.title} contentImage={news.imageUrl} isLightMode={isLightMode} />
            )}
            {/*<News date={newsContents[0][0]} content={newsContents[0][1]} contentImage={newsContents[0][2]} isLightMode={isLightMode}/>*/}
            {/*<News date={newsContents[1][0]} content={newsContents[1][1]} contentImage={newsContents[1][2]} isLightMode={isLightMode}/>*/}
            {/*<News date={newsContents[2][0]} content={newsContents[2][1]} contentImage={newsContents[2][2]} isLightMode={isLightMode}/>*/}
        </div>
    )
}