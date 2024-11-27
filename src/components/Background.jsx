import BackgroundItem from "./BackgroundItem.jsx";

// eslint-disable-next-line react/prop-types
export default function Background({isLightMode}) {
    return (
        <div className="background">
            <BackgroundItem isLightMode={isLightMode} inset="20px 20px auto auto" light="src/assets/images/sun.png" dark="src/assets/images/moon.png"/>
            <BackgroundItem isLightMode={isLightMode} inset="50px auto auto 100px" light="src/assets/images/cloud.png" dark="src/assets/images/star.png"/>
            <BackgroundItem isLightMode={isLightMode} inset="auto 200px 60px auto" light="src/assets/images/cloud.png" dark="src/assets/images/star.png"/>
            <BackgroundItem isLightMode={isLightMode} inset="400px auto auto 400px" light="src/assets/images/cloud.png" dark="src/assets/images/star.png"/>
            <BackgroundItem isLightMode={isLightMode} inset="200px 400px auto auto" light="src/assets/images/cloud.png" dark="src/assets/images/star.png"/>
            <BackgroundItem isLightMode={isLightMode} inset="70px 70px auto auto" light="src/assets/images/cloud.png" dark="src/assets/images/star.png"/>
        </div>
    )
}