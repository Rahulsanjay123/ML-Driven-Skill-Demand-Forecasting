import express from "express"
import axios from "axios"
import Skill from "../models/Skill.js"

const router = express.Router()

router.post("/", async (req, res) => {
    console.log("--- New Prediction Request ---")
    const { skill } = req.body
    
    try {
        const mlUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:5002/predict"
        console.log(`[Backend Proxy] Forwarding to internal ML Service at: ${mlUrl}`)
        
        // 1. Get prediction from ML service
        const response = await axios.post(mlUrl, req.body)
        const prediction = response.data
        
        // 2. Fetch metadata from DB if it exists
        let metadata = null
        try {
            metadata = await Skill.findOne({ name: new RegExp('^' + skill + '$', 'i') })
        } catch (dbErr) {
            console.log("[Backend] Metadata lookup skipped or failed")
        }

        console.log("[Backend Proxy] Success! Returning prediction + metadata")
        res.json({
            ...prediction,
            metadata: metadata || null
        })

    } catch (error) {
        console.error("[Backend Proxy] FAILED")
        console.error("Message:", error.message)
        res.status(500).json({ error: "Prediction failed", details: error.message })
    }
})

export default router