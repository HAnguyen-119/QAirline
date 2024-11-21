import Logo from "./Logo.jsx";

export default function Footer() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px'}}>
            <Logo/>
            <p>Copyright © 2024, QAirLine, Inc.</p>
            BLAH BLAH THINGS
        </div>
    )
}