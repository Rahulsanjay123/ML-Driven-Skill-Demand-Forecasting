import express from "express"
import axios from "axios"

const router = express.Router()

router.post("/", async (req, res) => {

    try {

        const response = await axios.post(
            process.env.ML_SERVICE_URL || "http://127.0.0.1:5000/predict",
            req.body
        )

        res.json(response.data)

    } catch (error) {

        res.status(500).json({
            error: "Prediction failed"
        })
    }

})

export default router