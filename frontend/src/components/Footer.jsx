import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-grid">

                    <div className="footer-brand">
                        <h3 className="gradient-text">⚡ SkillAI</h3>
                        <p>
                            AI-powered skill demand forecasting platform. Predict future career
                            opportunities using machine learning and real job-market analytics.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/forecast">Forecast</Link></li>
                            <li><Link to="/roadmap">Roadmap</Link></li>
                            <li><Link to="/market">Market</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Skills</h4>
                        <ul>
                            <li><a href="#">Artificial Intelligence</a></li>
                            <li><a href="#">Cloud Computing</a></li>
                            <li><a href="#">Cybersecurity</a></li>
                            <li><a href="#">Data Science</a></li>
                            <li><a href="#">Frontend Dev</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <span>© 2026 SkillAI Analytics. All rights reserved.</span>
                    <span>Built with ❤️ and Machine Learning</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer