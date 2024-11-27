// eslint-disable-next-line react/prop-types
export default function BackgroundItem({inset, isLightMode, light, dark}) {
    return (
        <div className="backgroundItem" style={{position: "fixed", inset: inset}}>
            <img src={isLightMode ? light : dark}/>
        </div>
    )
}