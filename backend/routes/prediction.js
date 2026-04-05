import express from "express"
import axios from "axios"

const router = express.Router()

router.post("/", async (req, res) => {
    console.log("--- New Prediction Request ---")
    console.log("Body:", JSON.stringify(req.body, null, 2))
    
    try {
        const mlUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:5000/predict"
        console.log(`[Backend Proxy] Forwarding to: ${mlUrl}`)
        
        const response = await axios.post(mlUrl, req.body)
        
        console.log("[Backend Proxy] Success from ML Service")
        console.log("Response Data:", JSON.stringify(response.data, null, 2))
        
        res.json(response.data)

    } catch (error) {
        console.error("[Backend Proxy] FAILED")
        console.error("Message:", error.message)
        
        if (error.response) {
            console.error("ML Service Error Data:", JSON.stringify(error.response.data, null, 2))
            console.error("Status:", error.response.status)
        } else if (error.request) {
            console.error("No response from ML Service. Is it running on port 5000?")
        }
        
        res.status(500).json({
            error: "Prediction failed",
            details: error.message,
            hint: "Check if the ML service is running on port 5000"
        })
    }
    console.log("------------------------------")
})

export default router