import Navbar from "../components/Navbar"
import SkillPredictor from "../components/SkillPredictor"
import DemandCard from "../components/DemandCard"
import SalaryCard from "../components/SalaryCard"
import ChartPanel from "../components/ChartPanel"

function Dashboard() {
    return (
        <div>
            <Navbar />

            <div className="dashboard-page">

                <div className="dashboard-header anim-fadeInUp">
                    <span className="badge badge-indigo" style={{ marginBottom: 12 }}>📊 Analytics Hub</span>
                    <h1>AI Skill Analytics <span className="gradient-text">Dashboard</span></h1>
                    <p>Real-time skill demand insights, salary benchmarks, and AI-powered predictions.</p>
                </div>

                <div className="anim-fadeInUp delay-1">
                    <SkillPredictor />
                </div>

                <div className="dashboard-grid anim-fadeInUp delay-2">
                    <DemandCard />
                    <SalaryCard />
                </div>

                <div className="anim-fadeInUp delay-3">
                    <ChartPanel />
                </div>

            </div>
        </div>
    )
}

export default Dashboard