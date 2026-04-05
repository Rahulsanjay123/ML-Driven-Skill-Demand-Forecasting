import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { marketSectors } from "../data/skills"

const stats = [
    { icon: "💼", value: "4.2M+", label: "Open Tech Jobs Globally" },
    { icon: "📈", value: "23%", label: "YoY Growth in AI Hiring" },
    { icon: "💰", value: "$128k", label: "Median Tech Salary (US)" },
    { icon: "🌏", value: "68%", label: "Companies Expanding Tech Teams" },
]

const trends = [
    {
        icon: "🧠",
        title: "Generative AI is Reshaping Every Role",
        desc: "ChatGPT, Copilot, and custom LLMs are being embedded into products across every sector. Prompt engineering and AI integration skills are becoming baseline requirements.",
    },
    {
        icon: "🏗️",
        title: "Cloud-Native is the New Default",
        desc: "Containerisation, serverless computing, and managed services are no longer optional. Greenfield projects are cloud-first by default — legacy migration is accelerating.",
    },
    {
        icon: "🔐",
        title: "Security is Everyone's Job",
        desc: "DevSecOps practices are being mandated by regulators and insurers alike. Developers with security knowledge command 20–40% salary premiums.",
    },
    {
        icon: "🔗",
        title: "Web3 & Decentralised Finance Maturing",
        desc: "After the 2022 crash, institutional DeFi and enterprise blockchain are gaining real traction. Solidity and Rust engineers are scarce.",
    },
    {
        icon: "⚡",
        title: "Edge Computing & IoT Expansion",
        desc: "With 5G maturing, edge deployments are outgrowing centralised cloud. IoT data processing at the edge is an emerging high-demand specialisation.",
    },
    {
        icon: "💊",
        title: "HealthTech Boom Post-Pandemic",
        desc: "AI diagnostics, EHR modernisation, and wearables are driving extraordinary healthcare technology investment. Domain-specific engineering is at a premium.",
    },
]

const regions = [
    { flag: "🇺🇸", name: "United States", jobs: "1.8M+ openings" },
    { flag: "🇬🇧", name: "United Kingdom", jobs: "320k+ openings" },
    { flag: "🇩🇪", name: "Germany", jobs: "280k+ openings" },
    { flag: "🇮🇳", name: "India", jobs: "750k+ openings" },
    { flag: "🇸🇬", name: "Singapore", jobs: "95k+ openings" },
    { flag: "🇦🇺", name: "Australia", jobs: "180k+ openings" },
    { flag: "🇨🇦", name: "Canada", jobs: "240k+ openings" },
    { flag: "🇦🇪", name: "UAE", jobs: "110k+ openings" },
]

function Market() {
    return (
        <div>
            <Navbar />

            <div className="market-page">

                <div className="market-header anim-fadeInUp">
                    <span className="badge badge-cyan" style={{ marginBottom: 14 }}>Live Market Intelligence</span>
                    <h1>Technology <span className="gradient-text">Market Insights</span></h1>
                    <p>Real-time data on global technology hiring trends, salary benchmarks, and sector-level demand across 12 industry verticals.</p>
                </div>

                {/* Stats */}
                <div className="market-stats-row">
                    {stats.map((s, i) => (
                        <div className={`market-stat-card anim-fadeInUp delay-${i + 1}`} key={s.label}>
                            <div className="market-stat-icon">{s.icon}</div>
                            <div className="market-stat-value">{s.value}</div>
                            <div className="market-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Sector Cards — from central data (12 sectors) */}
                <div className="section-header anim-fadeInUp" style={{ textAlign: "left", marginBottom: 28 }}>
                    <h2>📡 Sector <span className="gradient-text">Growth Index</span></h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                        Year-over-year job posting growth across 12 technology sectors.
                    </p>
                </div>
                <div className="sector-grid" style={{ marginBottom: 56, gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {marketSectors.map((s, i) => (
                        <div className={`sector-card anim-fadeInUp delay-${i % 3 + 1}`} key={s.name}>
                            <div className="sector-card-top">
                                <span className="sector-icon">{s.icon}</span>
                                <span className="sector-growth" style={s.growthStyle}>{s.growth}</span>
                            </div>
                            <div className="sector-name">{s.name}</div>
                            <div className="sector-desc">{s.desc}</div>
                            <div className="sector-tags">
                                {s.tags.map(t => <span className="sector-tag" key={t}>{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Key Trends */}
                <div className="section-header anim-fadeInUp" style={{ textAlign: "left", marginBottom: 28 }}>
                    <h2>🔥 Key Market <span className="gradient-text">Trends</span></h2>
                </div>
                <div className="trends-list" style={{ marginBottom: 56 }}>
                    {trends.map((t, i) => (
                        <div className={`trend-item anim-fadeInUp delay-${i % 2 + 1}`} key={t.title}>
                            <div className="trend-icon">{t.icon}</div>
                            <div className="trend-content">
                                <h4>{t.title}</h4>
                                <p>{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Regions */}
                <div className="section-header anim-fadeInUp" style={{ textAlign: "left", marginBottom: 28 }}>
                    <h2>🌍 Top Hiring <span className="gradient-text">Regions</span></h2>
                </div>
                <div className="regions-grid">
                    {regions.map((r, i) => (
                        <div className={`region-card anim-fadeInUp delay-${i % 4 + 1}`} key={r.name}>
                            <div className="region-flag">{r.flag}</div>
                            <div className="region-name">{r.name}</div>
                            <div className="region-jobs">{r.jobs}</div>
                        </div>
                    ))}
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Market