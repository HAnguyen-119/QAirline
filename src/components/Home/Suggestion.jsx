// eslint-disable-next-line react/prop-types
export default function Suggestion({imageURL, location, price}) {
    return (
        <div className="suggestion">
            <div><img src={imageURL}/></div>
            <p>{location}</p>
            <p>{price}</p>
        </div>
    )
}