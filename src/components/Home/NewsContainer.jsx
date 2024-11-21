import News, {newsContents} from "./News.jsx";

// eslint-disable-next-line react/prop-types
export default function NewsContainer({isLightMode}) {
    return (
        <div className={`newsContainer${isLightMode ? "" : " dark"}`}>
            <News date={newsContents[0][0]} content={newsContents[0][1]} contentImage={newsContents[0][2]}
                  isLightMode={isLightMode}/>
            <News date={newsContents[1][0]} content={newsContents[1][1]} contentImage={newsContents[1][2]}
                  isLightMode={isLightMode}/>
            <News date={newsContents[2][0]} content={newsContents[2][1]} contentImage={newsContents[2][2]}
                  isLightMode={isLightMode}/>
        </div>
    )
}