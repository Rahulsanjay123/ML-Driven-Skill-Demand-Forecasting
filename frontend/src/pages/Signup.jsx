import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const register = async () => {
        if (!form.name || !form.email || !form.password) {
            setError("Please fill in all fields.")
            return
        }
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }
        setLoading(true)
        setError("")
        try {
            await axios.post(
                "http://localhost:5001/api/auth/register",
                form
            )
            setSuccess(true)
            setTimeout(() => navigate("/login"), 1500)
        } catch (err) {
            const msg = err?.response?.data?.error || err?.response?.data?.message || "Registration failed. This email may already be in use."
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
                    Already have an account? <Link to="/login" style={{ color: "var(--indigo)", fontWeight: 600 }}>Sign In</Link>
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
                    background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139,92,246,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div className="auth-card anim-fadeInUp" style={{ position: "relative" }}>

                    <div className="auth-logo">
                        <div className="auth-logo-icon">🚀</div>
                        <h2>Create Your Account</h2>
                        <p>Join SkillAI and start forecasting your future</p>
                    </div>

                    {error && (
                        <div className="auth-error" style={{ marginBottom: 16 }}>{error}</div>
                    )}

                    {success && (
                        <div style={{
                            padding: "12px 16px",
                            background: "rgba(16,185,129,0.1)",
                            border: "1px solid rgba(16,185,129,0.3)",
                            borderRadius: "var(--radius-sm)",
                            color: "var(--emerald)",
                            fontSize: "0.88rem",
                            marginBottom: 16,
                            textAlign: "center",
                        }}>
                            ✅ Account created! Redirecting to login…
                        </div>
                    )}

                    <div className="auth-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                disabled={success}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                disabled={success}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(min. 6 characters)</span></label>
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                onKeyDown={e => e.key === "Enter" && register()}
                                disabled={success}
                            />
                        </div>
                        <button className="auth-submit" onClick={register} disabled={loading || success}>
                            {loading ? "Creating account…" : success ? "✅ Account Created!" : "Create Account →"}
                        </button>
                    </div>

                    <div className="auth-footer">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup