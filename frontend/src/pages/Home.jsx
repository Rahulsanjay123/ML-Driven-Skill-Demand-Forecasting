import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { skillsBriefData } from "../data/skills"

const features = [
    { icon: "🤖", color: "rgba(99,102,241,0.15)", title: "AI Forecast Engine", desc: "ML models trained on millions of job postings predict skill demand 12–24 months ahead." },
    { icon: "📊", color: "rgba(6,182,212,0.15)", title: "Market Insights", desc: "Real-time analytics on global tech hiring trends, sector growth, and salary data." },
    { icon: "🗺️", color: "rgba(139,92,246,0.15)", title: "Learning Roadmaps", desc: "Step-by-step career paths with curated resources, timelines, and milestones." },
    { icon: "💰", color: "rgba(16,185,129,0.15)", title: "Salary Intelligence", desc: "Benchmark your worth with role-specific compensation data from top tech companies." },
    { icon: "⚡", color: "rgba(245,158,11,0.15)", title: "Instant Predictions", desc: "Get demand forecasts in seconds — just enter a skill name and let the AI do the rest." },
    { icon: "📁", color: "rgba(244,63,94,0.15)", title: "Skills Database", desc: "18+ skill domains across AI, Cloud, Security, FinTech, HealthTech, Blockchain, and more." },
]

const howSteps = [
    { num: "1", title: "Enter a Skill", desc: "Type any technology skill into the Forecast engine — from Python to Quantum Computing." },
    { num: "2", title: "AI Analyzes the Market", desc: "Our ML model scores demand, growth rate, and future scope from 2.4M+ real job postings." },
    { num: "3", title: "Plan Your Career Path", desc: "Use the Roadmap page to build a personalised learning plan with timeline and milestones." },
]

function Home() {
    return (
        <div>
            <Navbar />

            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="hero">
                <div className="hero-bg" />
                <div className="hero-glow-1" />
                <div className="hero-glow-2" />
                
                <div className="hero-eyebrow anim-fadeInUp">
                    <span className="badge badge-indigo">🚀 Next-Gen Skill Intelligence</span>
                </div>
                <h1 className="anim-fadeInUp delay-1">
                    Master the Skills of<br />
                    <span className="gradient-text">The AI Revolution</span>
                </h1>
                <p className="anim-fadeInUp delay-2">
                    Leverage advanced ML models to forecast technology demand, benchmark salaries, 
                    and build your ultimate learning roadmap. Stay ahead in a rapidly evolving market.
                </p>
                <div className="hero-cta anim-fadeInUp delay-3">
                    <Link to="/forecast" className="btn btn-primary">⚡ Try AI Forecast</Link>
                    <Link to="/market" className="btn btn-outline">📊 Market Insights</Link>
                </div>
                <div className="hero-scroll-hint">
                    <span>↓</span>
                    <span>Scroll to explore</span>
                </div>
            </section>

            {/* ── Stats ────────────────────────────────────────── */}
            <div className="stats-row">
                <div className="stats-inner">
                    {[
                        { num: "18+", label: "Skill Domains Tracked" },
                        { num: "2.4M", label: "Job Postings Parsed" },
                        { num: "94%", label: "Forecast Accuracy" },
                        { num: "12", label: "Industry Sectors Covered" },
                    ].map(s => (
                        <div className="stat-item anim-fadeInUp" key={s.label}>
                            <div className="stat-number">{s.num}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Features ─────────────────────────────────────── */}
            <div className="section">
                <div className="section-header anim-fadeInUp">
                    <span className="badge badge-indigo" style={{ marginBottom: 14 }}>Platform Features</span>
                    <h2>Everything You Need to <span className="gradient-text">Stay Ahead</span></h2>
                    <p>From raw skill predictions to curated learning roadmaps — all in one platform.</p>
                </div>
                <div className="features-grid">
                    {features.map((f, i) => (
                        <div className={`feature-card anim-fadeInUp delay-${i % 3 + 1}`} key={f.title}>
                            <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Skills Brief (from central data) ────────────── */}
            <div style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
                <div className="section">
                    <div className="section-header anim-fadeInUp">
                        <span className="badge badge-cyan" style={{ marginBottom: 14 }}>18+ Skill Domains</span>
                        <h2>Brief About <span className="gradient-text">Top In-Demand Skills</span></h2>
                        <p>Explore what each skill is about, its demand level, and tools to learn — across AI, Web3, FinTech, HealthTech, and more.</p>
                    </div>
                    <div className="skills-brief-grid">
                        {skillsBriefData.map((skill, i) => (
                            <div className={`skill-brief-card anim-fadeInUp delay-${i % 3 + 1}`} key={skill.name}>
                                <div className="skill-brief-header">
                                    <span className="skill-brief-icon">{skill.icon}</span>
                                    <span className={`badge ${skill.badgeClass}`}>{skill.demand}</span>
                                </div>
                                <h3>{skill.name}</h3>
                                <p>{skill.desc}</p>
                                <div className="skill-tags">
                                    {skill.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── How It Works ─────────────────────────────────── */}
            <div className="section">
                <div className="section-header anim-fadeInUp">
                    <span className="badge badge-green" style={{ marginBottom: 14 }}>How It Works</span>
                    <h2>Simple. Powerful. <span className="gradient-text">Accurate.</span></h2>
                    <p>Three steps to unlock your career intelligence.</p>
                </div>
                <div className="how-steps">
                    {howSteps.map((s, i) => (
                        <div className={`how-step anim-fadeInUp delay-${i + 1}`} key={s.title}>
                            <div className="how-step-number">{s.num}</div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CTA Banner ───────────────────────────────────── */}
            <div className="section" style={{ paddingTop: 0 }}>
                <div className="cta-banner anim-fadeInUp">
                    <h2>Ready to Forecast Your <span className="gradient-text">Dream Skill?</span></h2>
                    <p>Enter any of our 18+ tracked skill domains and see AI-powered demand predictions, salary ranges, and more.</p>
                    <Link to="/forecast" className="btn btn-primary">🚀 Start Forecasting — It's Free</Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home