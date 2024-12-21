import ('./News.css');

// eslint-disable-next-line react/prop-types
export default function News({date, title, content, contentImage, isLightMode}) {
    return (
        <div className={`news${isLightMode ? '' : ' dark'}`}>
            <div style={{borderRight: `2px solid var(--${isLightMode ? " dark" : " light"})`}}>{date}</div>
            <div>
                <div style={{backgroundImage: `url(${contentImage})`}}></div>
                <div>{title}</div>
                <div>{content}</div>
            </div>
        </div>
    )
}
