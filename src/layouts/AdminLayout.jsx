import NavBar from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import {useState} from "react";

import "./AdminLayout.css"

export default function AdminLayout() {
    const [lightMode, setLightMode] = useState(true);

    function switchMode() {
        setLightMode(!lightMode);
    }

    return (
        <div className={`mainPage josefin-sans${lightMode ? "" : " dark"}`}>
            <header>
                <NavBar isAdmin={true} switchMode={switchMode} isLightMode={lightMode} />
            </header>
            <main>
                <Outlet context={lightMode}/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}