import AppLogo from '../assets/images/logo.png'

export default function Logo() {
    return (
        // Add NavLink to Homepage
        <div className='logo'>
            <img src={AppLogo} alt="logo"/>
            <p>AIRLINE</p>
        </div>
    )
}