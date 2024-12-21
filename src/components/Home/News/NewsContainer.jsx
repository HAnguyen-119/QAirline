import News from "./News.jsx";
import {useOutletContext} from "react-router-dom";

import ('./News.css')

export default function NewsContainer({newsData}) {
    const isLightMode = useOutletContext();
    return (
        <div className={`newsContainer${isLightMode ? "" : " dark"}`}>
            {newsData.map(news =>
                <News key={news.id}
                      date={news.postedTime.substring(0, 10)}
                      title={news.title}
                      content={news.content}
                      contentImage={news.imageUrl}
                      isLightMode={isLightMode} />
            )}
        </div>
    )
}