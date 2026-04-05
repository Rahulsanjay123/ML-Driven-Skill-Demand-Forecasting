import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const login = async () => {
        if (!email || !password) { setError("Please fill in all fields."); return }
        setLoading(true)
        setError("")
        try {
            const res = await axios.post(
                "/api/auth/login",
                { email, password }
            )
            // Backend returns { token, user }
            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
            } else {
                setError("Login failed. Please try again.")
            }
        } catch (err) {
            const msg = err?.response?.data?.message || "Invalid email or password."
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column" }}>

            {/* Minimal nav */}
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">⚡</div>
                    <span className="gradient-text">SkillAI</span>
                </Link>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Don't have an account? <Link to="/signup" style={{ color: "var(--indigo)", fontWeight: 600 }}>Sign Up</Link>
                </div>
            </nav>

            {/* Auth card centered */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 24px",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background glow */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div className="auth-card anim-fadeInUp" style={{ position: "relative" }}>

                    <div className="auth-logo">
                        <div className="auth-logo-icon">⚡</div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to your SkillAI account</p>
                    </div>

                    {error && (
                        <div className="auth-error" style={{ marginBottom: 16 }}>{error}</div>
                    )}

                    <div className="auth-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && login()}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && login()}
                            />
                        </div>
                        <button className="auth-submit" onClick={login} disabled={loading}>
                            {loading ? "Signing in…" : "Sign In →"}
                        </button>
                    </div>

                    <div className="auth-footer">
                        Don't have an account?{" "}
                        <Link to="/signup">Create one free</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login