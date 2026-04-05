import { useState } from "react"
import axios from "axios"

function SkillPredictor() {
    const [skill, setSkill] = useState("")
    const [result, setResult] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const predictSkill = async () => {
        if (!skill.trim()) return
        setLoading(true)
        setError("")
        setResult(null)
        try {
            const res = await axios.post(
                "http://localhost:5001/api/predict",
                {
                    skill,
                    job_postings: 12000,
                    avg_salary: 140000,
                    growth_rate: 35,
                    difficulty: 7,
                    learning_months: 8,
                }
            )
            
            if (res.data.error) {
                setError(res.data.error)
            } else {
                setResult(res.data)
            }
        } catch (err) {
            setError("Prediction failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card" style={{ marginBottom: 24 }}>

            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 6 }}>
                🤖 AI Skill Demand Predictor
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: 20 }}>
                Enter any skill to get an instant AI-powered demand score.
            </p>

            <div className="forecast-search-box" style={{ marginBottom: result ? 20 : 0 }}>
                <span style={{ fontSize: "1.1rem" }}>🔍</span>
                <input
                    placeholder="AI, Cloud, Cybersecurity, React…"
                    value={skill}
                    onChange={e => setSkill(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && predictSkill()}
                />
                <button className="btn btn-primary" onClick={predictSkill} disabled={loading}>
                    {loading ? <span className="spinner" /> : "Predict"}
                </button>
            </div>

            {error && (
                <div style={{
                    padding: "12px 16px",
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    borderRadius: "var(--radius-sm)",
                    color: "rgb(239, 68, 68)",
                    fontSize: "0.85rem",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}>
                    <span>⚠️</span> {error}
                </div>
            )}

            {result && (
                <div style={{
                    padding: "20px",
                    background: "rgba(99,102,241,0.07)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: "var(--radius-sm)",
                    animation: "fadeInUp 0.4s ease both",
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 4 }}>{result.skill}</p>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                                Future Scope: <span style={{ color: "var(--emerald)", fontWeight: 600 }}>{result.future_scope}</span>
                            </p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{
                                fontSize: "2rem", fontWeight: 900,
                                background: "var(--gradient-hero)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}>
                                {result.demand_score}
                            </div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>/ 100</div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default SkillPredictor