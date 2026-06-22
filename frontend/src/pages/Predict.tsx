
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Predict() {
  const [fraudScore, setFraudScore] = useState(0);
const [riskLevel, setRiskLevel] = useState("Not Analyzed");
  return (
    <div className="page">
      <Navbar />

      <section className="predict-page">

        <span className="section-tag">
          Fraud Prediction
        </span>

        <h1>Analyze Insurance Claim</h1>

        <p className="predict-subtitle">
          Enter claim information and let ClaimGuard AI
          predict fraud probability.
        </p>

        <div className="predict-layout">

          <div className="predict-form card-shadow">

            <h2>Claim Details</h2>

            <input
              type="number"
              placeholder="Claim Amount"
            />

            <input
              type="number"
              placeholder="Vehicle Age"
            />

            <input
              type="number"
              placeholder="Driver Age"
            />

            <select>
              <option>Accident Type</option>
              <option>Minor</option>
              <option>Major</option>
              <option>Total Loss</option>
            </select>

            <select>
              <option>Policy Type</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Gold</option>
            </select>

            <button
  className="primary-btn"
  onClick={() => {
    const score = Math.floor(Math.random() * 100);

    setFraudScore(score);

    if (score > 70) {
      setRiskLevel("HIGH RISK");
    } else if (score > 40) {
      setRiskLevel("MEDIUM RISK");
    } else {
      setRiskLevel("LOW RISK");
    }
  }}
>
  Analyze Claim
</button>

          </div>

          <div className="result-card card-shadow">

            <h2>Prediction Result</h2>

            <div className="result-circle">
  {fraudScore}%
</div>

<h3>{riskLevel}</h3>

            <h3>High Risk Claim</h3>

            <p>
              Recommendation:
              Manual Investigation Required
            </p>

          </div>

        </div>

      </section>
    </div>
  );
}