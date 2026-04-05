import express from "express"
import axios from "axios"

const router = express.Router()

router.post("/", async (req, res) => {
    console.log("--- New Prediction Request ---")
    
    try {
        // In a single-service setup on Render, the Flask app runs on localhost:5002
        const mlUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:5002/predict"
        console.log(`[Backend Proxy] Forwarding to internal ML Service at: ${mlUrl}`)
        
        const response = await axios.post(mlUrl, req.body)
        
        console.log("[Backend Proxy] Success from ML Service")
        res.json(response.data)

    } catch (error) {
        console.error("[Backend Proxy] FAILED")
        console.error("Message:", error.message)
        
        if (error.response) {
            console.error("ML Service Error Details:", error.response.data)
        }
        
        res.status(500).json({
            error: "Prediction failed",
            details: error.message,
            hint: "Check if the Python ML service successfully started on port 5002."
        })
    }
})

export default router