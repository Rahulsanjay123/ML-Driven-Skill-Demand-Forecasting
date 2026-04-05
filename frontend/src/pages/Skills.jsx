import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { allSkillsList } from "../data/skills"

export default function Skills() {
    return (
        <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
            <Navbar />
            
            <div className="section">
                <div className="section-header anim-fadeInUp">
                    <span className="badge badge-indigo" style={{ marginBottom: 12 }}>🚀 2025–2026 Forecast</span>
                    <h2>Future <span className="gradient-text">Trending Skills</span></h2>
                    <p>Every skill identified by our ML engine for the upcoming market cycle.</p>
                </div>

                <div className="skills-full-grid anim-fadeInUp delay-1" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "16px",
                    marginTop: "40px"
                }}>
                    {allSkillsList.map((skill, index) => (
                        <div key={index} className="card" style={{ 
                            padding: "20px", 
                            fontSize: "0.95rem", 
                            fontWeight: 600,
                            textAlign: "center",
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-light)"
                        }}>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}