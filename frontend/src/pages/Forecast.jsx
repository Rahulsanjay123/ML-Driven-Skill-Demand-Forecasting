import { useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

const skillDetails = {
    default: {
        about: "This skill is increasingly demanded across the technology sector. AI models predict strong continued growth over the next 3 years.",
        pros: [
            "High and growing market demand",
            "Applicable across multiple industries",
            "Strong salary and compensation packages",
            "Rich learning resources available online",
        ],
        cons: [
            "Competitive job market at entry-level",
            "Requires continuous learning to stay current",
            "May need complementary skills to stand out",
        ],
        steps: [
            { title: "Learn the Fundamentals", desc: "Start with official documentation and beginner courses." },
            { title: "Build Practice Projects", desc: "Apply what you learn in small, real-world projects." },
            { title: "Earn a Certification", desc: "Validate your skills with a recognized certification." },
            { title: "Contribute & Network", desc: "Join communities, contribute to open-source, and grow." },
        ],
    },
}

function getForecastLevel(score) {
    if (score >= 80) return { label: "Very High", badge: "badge-indigo" }
    if (score >= 65) return { label: "High", badge: "badge-green" }
    if (score >= 50) return { label: "Moderate", badge: "badge-amber" }
    return { label: "Emerging", badge: "badge-rose" }
}

function Forecast() {
    const [skill, setSkill] = useState("")
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState("about")
    
    // Skill Parameter states
    const [jobPostings, setJobPostings] = useState(10000)
    const [avgSalary, setAvgSalary] = useState(120000)
    const [growthRate, setGrowthRate] = useState(30)
    const [difficulty, setDifficulty] = useState(7)
    const [learningMonths, setLearningMonths] = useState(8)

    const predict = async () => {
        if (!skill.trim()) return
        setLoading(true)
        setError("")
        setResult(null)
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api"
            
            // 1. Get Prediction from ML proxy
            const predictRes = await axios.post(
                `${baseUrl}/predict`,
                {
                    skill,
                    job_postings: jobPostings || 10000,
                    avg_salary: avgSalary || 120000,
                    growth_rate: growthRate || 30,
                    difficulty: difficulty || 7,
                    learning_months: learningMonths || 8,
                }
            )
            
            // 2. Try to get detailed metadata from backend
            let skillMetadata = null
            try {
                const metadataRes = await axios.get(`${baseUrl}/skills/${skill}`)
                skillMetadata = metadataRes.data
            } catch (err) {
                console.log("No metadata found for this skill, using defaults.")
            }

            setResult({
                ...predictRes.data,
                metadata: skillMetadata || skillDetails.default
            })
            setActiveTab("about")
        } catch (err) {
            setError("Could not fetch prediction. Please ensure the backend is running.")
        } finally {
            setLoading(false)
        }
    }

    const detail = result?.metadata || skillDetails.default
    const level = result ? getForecastLevel(result.demand_score) : null

    return (
        <div>
            <Navbar />

            <div className="forecast-page">

                <div className="forecast-header anim-fadeInUp">
                    <span className="badge badge-indigo" style={{ marginBottom: 14 }}>⚡ AI Forecast Engine</span>
                    <h1>Skill <span className="gradient-text">Demand Forecast</span></h1>
                    <p>Enter any technology skill to get an AI-powered demand score, future scope, and personalised roadmap.</p>
                </div>

                {/* Search Box */}
                <div className="forecast-search-box anim-fadeInUp delay-1">
                    <span style={{ fontSize: "1.2rem" }}>🔍</span>
                    <input
                        placeholder="Enter a skill (e.g. React, Python, Kubernetes, Cybersecurity…)"
                        value={skill}
                        onChange={e => setSkill(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && predict()}
                    />
                    <button className="btn btn-primary" onClick={predict} disabled={loading}>
                        {loading ? <span className="spinner" /> : "Predict"}
                    </button>
                </div>

                {/* Advanced Options Toggle */}
                <div className="advanced-options anim-fadeInUp delay-2">
                    <details>
                        <summary>⚙️ Advanced Forecast Parameters (Optional)</summary>
                        <div className="options-grid">
                            <div className="option-item">
                                <label>Job Postings</label>
                                <input type="number" value={jobPostings} onChange={e => setJobPostings(Number(e.target.value))} />
                            </div>
                            <div className="option-item">
                                <label>Avg Salary ($)</label>
                                <input type="number" value={avgSalary} onChange={e => setAvgSalary(Number(e.target.value))} />
                            </div>
                            <div className="option-item">
                                <label>Growth Rate (%)</label>
                                <input type="number" value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))} />
                            </div>
                            <div className="option-item">
                                <label>Difficulty (1-10)</label>
                                <input type="number" value={difficulty} onChange={e => setDifficulty(Number(e.target.value))} />
                            </div>
                            <div className="option-item">
                                <label>Learning Months</label>
                                <input type="number" value={learningMonths} onChange={e => setLearningMonths(Number(e.target.value))} />
                            </div>
                        </div>
                    </details>
                </div>

                {error && <div className="auth-error anim-fadeIn" style={{ marginBottom: 24 }}>{error}</div>}

                {/* Result */}
                {result && (
                    <div className="forecast-result">

                        <div className="result-card">
                            <div className="result-card-header">
                                <div>
                                    <div className="result-skill-name gradient-text">{result.skill}</div>
                                    <span className={`badge ${level.badge}`}>{level.label} Demand</span>
                                </div>
                                <div className="demand-score-ring">
                                    <div className="demand-score-number">{result.demand_score}</div>
                                    <div className="demand-score-label">Demand Score / 100</div>
                                </div>
                            </div>

                            <div className="result-meta">
                                <div className="result-meta-item">
                                    <div className="label">Future Scope</div>
                                    <div className="value" style={{ color: "var(--emerald)", fontSize: "0.9rem" }}>{result.future_scope}</div>
                                </div>
                                <div className="result-meta-item">
                                    <div className="label">Market Trend</div>
                                    <div className="value" style={{ color: "var(--indigo)" }}>📈 Growing</div>
                                </div>
                                <div className="result-meta-item">
                                    <div className="label">Recommendation</div>
                                    <div className="value" style={{ color: "var(--amber)", fontSize: "0.88rem" }}>
                                        {result.demand_score >= 70 ? "✅ High Priority" : "⚡ Worth Learning"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skill Detail Panel */}
                        <div className="skill-detail-panel">
                            <div className="skill-detail-tabs">
                                {["about", "pros-cons", "roadmap"].map(tab => (
                                    <button
                                        key={tab}
                                        className={`skill-tab ${activeTab === tab ? "active" : ""}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab === "about" ? "📖 About" : ""}
                                        {tab === "pros-cons" ? "⚖️ Pros & Cons" : ""}
                                        {tab === "roadmap" ? "🗺️ Roadmap" : ""}
                                    </button>
                                ))}
                            </div>

                            <div className="skill-tab-content">

                                {activeTab === "about" && (
                                    <div className="anim-fadeIn">
                                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
                                            {detail.about}
                                        </p>
                                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                                            Based on our ML forecast model trained on 2.4M+ job postings,
                                            <strong style={{ color: "var(--text-primary)" }}> {result.skill}</strong> shows
                                            a demand score of <strong style={{ color: "var(--indigo)" }}>{result.demand_score}/100</strong> with
                                            a future scope rated as <strong style={{ color: "var(--emerald)" }}>{result.future_scope}</strong>.
                                            This makes it a {level.label.toLowerCase()}-priority skill to invest in right now.
                                        </p>
                                    </div>
                                )}

                                {activeTab === "pros-cons" && (
                                    <div className="pros-cons-grid anim-fadeIn">
                                        <div className="pros-col">
                                            <h4>✅ Why Learn {result.skill}</h4>
                                            <ul className="pros-cons-list">
                                                {detail.pros.map(p => <li key={p}>{p}</li>)}
                                            </ul>
                                        </div>
                                        <div className="cons-col">
                                            <h4>⚠️ Challenges to Consider</h4>
                                            <ul className="pros-cons-list">
                                                {detail.cons.map(c => <li key={c}>{c}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "roadmap" && (
                                    <div className="roadmap-steps-list anim-fadeIn">
                                        {detail.steps.map((step, i) => (
                                            <div className="roadmap-step-item" key={step.title}>
                                                <div className="step-num">{i + 1}</div>
                                                <div className="step-text">
                                                    <strong>{step.title}</strong>
                                                    {step.desc}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default Forecast