import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Market from "./pages/Market"
import Forecast from "./pages/Forecast"
import Roadmap from "./pages/Roadmap"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

// Guard: redirect to /login if not authenticated
function PrivateRoute({ children }) {
    return localStorage.getItem("token") ? children : <Navigate to="/login" replace />
}

// Guard: redirect to /dashboard if already logged in
function PublicRoute({ children }) {
    return localStorage.getItem("token") ? <Navigate to="/dashboard" replace /> : children
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/market" element={<Market />} />

                {/* Auth pages — hidden when logged in */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

                {/* Protected pages — require login */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/forecast" element={<PrivateRoute><Forecast /></PrivateRoute>} />
                <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App