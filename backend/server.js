import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

import authRoutes from "./routes/auth.js"
import predictionRoutes from "./routes/prediction.js"
import skillsRoutes from "./routes/skills.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors()) // Temporarily allow all origins for deployment

app.use(express.json())

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Skill Forecasting API is running successfully!" })
})

app.use("/api/auth", authRoutes)
app.use("/api/predict", predictionRoutes)
app.use("/api/skills", skillsRoutes)

// --- SPAWN ML SERVICE (SINGLE SERVICE MODE) ---
if (process.env.NODE_ENV === 'production') {
  console.log("--- Starting ML Service as Child Process ---")
  const pythonProcess = spawn('python3', [path.join(__dirname, 'ml-service', 'app.py')], {
    env: { ...process.env, PORT: '5002' }
  })

  pythonProcess.stdout.on('data', (data) => console.log(`[ML-Service]: ${data}`))
  pythonProcess.stderr.on('data', (data) => console.error(`[ML-Service-Error]: ${data}`))
  
  process.on('exit', () => pythonProcess.kill())
}

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skillforecast"
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("MongoDB Connected")
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err.message)
})

// Start server
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app