import { useState } from "react";
import axios from "axios";

export default function Predict() {

  const [hours, setHours] = useState("");
  const [projects, setProjects] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {

    const response = await axios.post(
      "http://localhost:5000/api/predict",
      {
        hours,
        projects
      }
    );

    setResult(response.data);
  };

  return (
    <div>

      <h2>AI Career Prediction</h2>

      <input
        placeholder="Study Hours"
        onChange={(e) => setHours(e.target.value)}
      />

      <input
        placeholder="Projects Built"
        onChange={(e) => setProjects(e.target.value)}
      />

      <button onClick={handleSubmit}>Predict</button>

      {result && (
        <div>
          <h3>Prediction:</h3>
          <p>{result.prediction}</p>
        </div>
      )}

    </div>
  );
}