import NavBar from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import {useState} from "react";

import "./MainLayout.css"

export default function MainLayout() {
    const [lightMode, setLightMode] = useState(true);

    function switchMode() {
        setLightMode(!lightMode);
    }

    return (
        <div className={`mainPage josefin-sans${lightMode ? "" : " dark"}`}>
            <header>
                <NavBar isAdmin={false} switchMode={switchMode} isLightMode={lightMode} />
            </header>
            <main>
                {/*<Background isLightMode={lightMode}/>*/}
                <Outlet context={lightMode}/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}