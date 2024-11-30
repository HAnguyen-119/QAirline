export default function BasicInfo({icon, number, info}) {
    return (
        <div className="basic-info">
            <div style={{margin : "10px"}}><img src={icon}/></div>
            <div>{number}</div>
            <div>{info}</div>
        </div>
    )
}