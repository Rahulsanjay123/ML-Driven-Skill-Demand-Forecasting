import { demandItems } from "../data/skills"

function DemandCard() {
    // Show top 8 on dashboard card
    const visible = demandItems.slice(0, 8)

    return (
        <div className="card">

            <p className="demand-card-title">📈 Skill Demand Insights</p>
            <p className="demand-card-subtitle">
                Fastest growing skills in the global technology market right now.
            </p>

            {visible.map(d => (
                <div className="demand-item" key={d.name}>
                    <div className="demand-item-header">
                        <span className="demand-item-name">{d.name}</span>
                        <span className="demand-item-pct" style={{ color: "var(--indigo)" }}>{d.pct}%</span>
                    </div>
                    <div className="demand-bar-bg">
                        <div
                            className="demand-bar-fill"
                            style={{ width: `${d.pct}%`, background: d.color }}
                        />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default DemandCard