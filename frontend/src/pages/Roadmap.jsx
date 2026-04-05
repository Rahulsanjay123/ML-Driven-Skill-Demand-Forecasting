import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { roadmapTracks } from "../data/skills"

function Roadmap() {
    const [activeTrack, setActiveTrack] = useState(roadmapTracks[0].id)
    const track = roadmapTracks.find(t => t.id === activeTrack)

    return (
        <div>
            <Navbar />

            <div className="roadmap-page">

                <div className="roadmap-page-header anim-fadeInUp">
                    <span className="badge" style={{ background: "rgba(139,92,246,0.15)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.3)", marginBottom: 14 }}>
                        🗺️ Career Roadmaps
                    </span>
                    <h1>Predicted Skill <span className="gradient-text">Career Roadmaps</span></h1>
                    <p>
                        Explore AI-predicted learning paths for 9 in-demand skill domains — complete with
                        pros, cons, salary ranges, timelines, and step-by-step guidance.
                    </p>
                </div>

                {/* Track Selector Tabs */}
                <div className="roadmap-track-tabs anim-fadeInUp delay-1">
                    {roadmapTracks.map(t => (
                        <button
                            key={t.id}
                            className={`track-tab ${activeTrack === t.id ? "active" : ""}`}
                            onClick={() => setActiveTrack(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Track Content */}
                <div className="roadmap-track-content" key={activeTrack}>

                    <div className="roadmap-track-overview">

                        <div className="track-info card">
                            <h2>{track.name}</h2>
                            <p>{track.desc}</p>
                            <div className="track-meta-chips">
                                <span className="track-meta-chip">⏱ {track.timeline}</span>
                                <span className="track-meta-chip">💰 {track.salary}</span>
                                <span className="track-meta-chip">⚡ {track.difficulty}</span>
                            </div>
                        </div>

                        <div className="track-pros-cons">
                            <h3>Pros &amp; Cons</h3>
                            <div className="pros-cons-compact">
                                <div className="pc-pros">
                                    <div className="pc-col-title">✅ Pros</div>
                                    {track.pros.map(p => <div className="pc-item" key={p}>{p}</div>)}
                                </div>
                                <div className="pc-cons">
                                    <div className="pc-col-title">❌ Cons</div>
                                    {track.cons.map(c => <div className="pc-item" key={c}>{c}</div>)}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Timeline Steps */}
                    <div className="roadmap-timeline card">
                        <h3>📍 Step-by-Step Roadmap</h3>
                        <div className="timeline-steps">
                            {track.steps.map((step, i) => (
                                <div className="timeline-step" key={step.title}>
                                    <div className={`timeline-dot ${i < 2 ? "done" : ""}`} />
                                    <div className="timeline-step-body">
                                        <h4>Step {i + 1}: {step.title}</h4>
                                        <p>{step.desc}</p>
                                        <span className="duration">{step.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Roadmap