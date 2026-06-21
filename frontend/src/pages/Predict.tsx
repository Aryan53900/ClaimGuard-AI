import Navbar from "../components/Navbar";
export default function Predict() {
    return (
        <div className="page">
              <Navbar />
      <div className="page">
  
        <div className="predict-header">
          <span className="section-tag">
            Fraud Prediction
          </span>
  
          <h1>Analyze Insurance Claim</h1>
  
          <p>
            Enter claim details and let ClaimGuard AI
            predict fraud probability.
          </p>
        </div>
  
        <div className="predict-layout">
  
          <div className="predict-form">
  
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
  
            <button>
              Analyze Claim
            </button>
  
          </div>
  
          <div className="result-card">
  
            <h2>Prediction Result</h2>
  
            <div className="result-score">
              87%
            </div>
  
            <h3>High Risk Claim</h3>
  
            <p>
              Recommendation:
              Manual Investigation Required
            </p>
  
          </div>
  
        </div>
  
      </div>
      </div>
    );
  }
