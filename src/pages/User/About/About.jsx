import './About.css'
import AboutContent from "../../components/About/AboutContent.jsx";
import {Outlet} from "react-router-dom";

export default function About() {
    return (
        <div className='about'>
            <div className='about-content-container'>
                <AboutContent content='QAirline Company' page='company' background='https://images.indianexpress.com/2024/08/Worlds-10-Best-Airlines-in-2024-The-dominance-of-Asian-and-Middle-Eastern-carriers-is-evident-with-seven-of-the-top-10-spots-going-to-airlines-from-these-regions.-Source-Qatar-Airways-Official-.jpg'/>
                <AboutContent content='Partners' page='partners' background='https://image.cnbcfm.com/api/v1/image/106174405-1570711107124gettyimages-1083841638.jpeg?v=1570711118&w=1600&h=900'/>
                <AboutContent content='Career' page='career' background='https://bcp.cdnchinhphu.vn/334894974524682240/2024/6/22/anh-minh-hoa-3-1719021267699277678465.jpg'/>
            </div>
            <div className="specific-content">
                <Outlet></Outlet>
            </div>
        </div>
    )
}