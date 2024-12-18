export default function DashboardItem({icon, title, children}) {
    return (
        <div className="dashboard-item">
            <div>
                <div><img src={icon}/></div>
                <div>{title}</div>
            </div>
            <div>{children}</div>
        </div>
    )
}