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

export const newsContents = [["12 Sep 24", "Flights to ASEAN countries cancelled due to the impact of Yagi typhoon", "https://static-images.vnncdn.net/vps_images_publish/000001/00000Q/2024/9/3/meteorologists-warn-of-potential-super-typhoon-yagi-in-east-sea-af43df6b9a5e4f5fab8355e4520671e6-2071.jpg?width=0&s=1phAasbcYML4Xc6WQDMexw"],
                                   ["6 Oct 24", "Introduce our latest plane model", "https://cdn10.bigcommerce.com/s-xyp4jdqv/product_images/uploaded_images/blank747.jpg"],
                                   ["3 Nov 24", "QAirline is now available in Viet Nam", "https://kampatour.com/pic/news/1b26bb3d-1cb7-4ad1-b161-dcf194e08ba6.jpg"]];