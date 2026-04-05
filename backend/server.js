import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.js"
import predictionRoutes from "./routes/prediction.js"
import skillsRoutes from "./routes/skills.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/predict", predictionRoutes)
app.use("/api/skills", skillsRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skillforecast")

.then(() => {
    console.log("MongoDB Connected")
})

.catch((err) => {
    console.log(err)
})

// Start server
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})