import ('./FlightSearcher.css')

// eslint-disable-next-line react/prop-types
export default function FlightSearcher({isLightMode}) {
    return (
        <div className={`flightSearcherContainer${isLightMode ? "" : " dark"}`} >
            <h1>Enjoy the best experiences at QAirline !</h1>
            <div className={`flightSearcher${isLightMode ? "" : " dark"}`}>
                <div></div>
                <div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}><input type="radio" style={{width: "15px", height: "15px"}}/> One way <input type="radio" style={{width: "15px", height: "15px"}}/> Round trip</div>
                    <div style={{display: "flex"}}><span style={{width: "150px", margin: "0"}}>Number of guest</span><input type="text"/></div>
                    <input className="josefin-sans" type="text" placeholder="From..."/>
                    <input className="josefin-sans" type="text" placeholder="To..."/>
                    <button className="josefin-sans">Search Flight</button>
                </div>
            </div>
        </div>
    )
}