const axios = require("axios");

exports.predictSkills = async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Prediction failed" });
  }
};