import { Link, useLocation, useNavigate } from "react-router-dom"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const navLinks = [
    { to: "/",          label: "Home"      },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/market",    label: "Market"    },
    { to: "/forecast",  label: "Forecast"  },
    { to: "/roadmap",   label: "Roadmap"   },
  ]

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon">⚡</div>
        <span className="gradient-text">SkillAI</span>
      </Link>

      <div className="navlinks">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="nav-auth-group">
        {isLoggedIn ? (
          <>
            <span className="nav-user-badge">👤 Signed In</span>
            <button className="nav-btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"  className="nav-btn-login">Login</Link>
            <Link to="/signup" className="nav-btn-signup">Sign Up</Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar