// eslint-disable-next-line react/prop-types
export default function FlightSearcher({isLightMode}) {
    return (
        <div className={`flightSearcherContainer ${isLightMode ? "" : "dark"}`} style={
            {backgroundImage:"url('https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2024/05/ascend-airways-fleet-boeing-737-800-ly-tfs-exterior-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}>
            <div className={`flightSearcher ${isLightMode ? "" : "dark"}`}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}><input type="radio" style={{width: "15px", height: "15px"}}/> One way <input type="radio" style={{width: "15px", height: "15px"}}/> Round trip</div>
                <div style={{display: "flex"}}><span style={{width: "200px", margin: "0"}}>Number of guest</span><input type="text"/></div>
                <input className="josefin-sans" type="text" placeholder="From..."/>
                <input className="josefin-sans" type="text" placeholder="To..."/>
                <button className="josefin-sans">Search Flight</button>
            </div>
        </div>
    )
}