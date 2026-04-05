import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, Cell
} from "recharts"
import { chartSkills } from "../data/skills"

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "#111827",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "0.88rem",
            }}>
                <p style={{ color: "#94a3b8", marginBottom: 4 }}>{label}</p>
                <p style={{ color: "#6366f1", fontWeight: 700 }}>
                    Demand Score: {payload[0].value}
                </p>
            </div>
        )
    }
    return null
}

// Custom tick — renders each bar's label angled so all 12 fit
const CustomXAxisTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
        <text
            x={0} y={0} dy={4}
            textAnchor="end"
            transform="rotate(-40)"
            fill="#94a3b8"
            fontSize={11}
            fontFamily="Inter, sans-serif"
        >
            {payload.value}
        </text>
    </g>
)

function ChartPanel() {
    return (
        <div className="chart-section">
            <h2>📊 Top Future Skills by Demand Score</h2>
            <p>ML-predicted demand scores across major technology domains for 2025–2026.</p>
            <ResponsiveContainer width="100%" height={360}>
                <BarChart
                    data={chartSkills}
                    margin={{ top: 8, right: 16, left: -16, bottom: 60 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="skill"
                        tick={<CustomXAxisTick />}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={false}
                        interval={0}
                    />
                    <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={false}
                        domain={[50, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.07)" }} />
                    <Bar dataKey="demand" radius={[6, 6, 0, 0]}>
                        {chartSkills.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ChartPanel