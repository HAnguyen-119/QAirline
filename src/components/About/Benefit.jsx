export default function Benefit({image, content}) {
    return (
        <div className="benefit">
            <div><img src={image}/></div>
            <p>{content}</p>
        </div>
    )
}