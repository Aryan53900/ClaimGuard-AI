import { useState } from "react";
import Navbar from "../components/Navbar";
import { api, downloadPdfReport } from "../services/api";
import ImageUpload from "../components/ImageUpload";
import VisionAnalysisCard from "../components/VisionAnalysisCard";

// Helper to convert File to Base64 so we can send it in the JSON payload
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Predict() {
  const [formData, setFormData] = useState({
    months_as_customer: 0,
    age: 0,
    policy_deductable: 0,
    policy_annual_premium: 0,
    umbrella_limit: 0,
    insured_zip: 0,
    capital_gains: 0,
    capital_loss: 0,
    incident_hour_of_the_day: 0,
    number_of_vehicles_involved: 0,
    bodily_injuries: 0,
    witnesses: 0,
    total_claim_amount: 0,
    injury_claim: 0,
    property_claim: 0,
    vehicle_claim: 0,
    auto_year: 2020,
    customer_tenure_days: 0,
    claim_to_premium_ratio: 0,
  });
  const [damageImage, setDamageImage] = useState<File | null>(null);
  const [fraudScore, setFraudScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState("Not Analyzed");
  const [loading, setLoading] = useState(false);
  const [visionResult, setVisionResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const analyzeClaim = async () => {
    try {
      setLoading(true);
      let probability = 0;

      if (damageImage) {
        const payload = new FormData();
        payload.append("claim_data", JSON.stringify(formData));
        payload.append("image", damageImage);

        const response = await api.post("/unified-report", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        probability = response.data.fraud_prediction?.probability ?? 0;
        setVisionResult(response.data.vision_analysis);
      } else {
        const response = await api.post("/predict", formData);
        probability = response.data.probability ?? 0;
        setVisionResult(null);
      }

      const score = Math.round(probability * 100);
      setFraudScore(score);

      if (score > 70) setRiskLevel("HIGH RISK");
      else if (score > 40) setRiskLevel("MEDIUM RISK");
      else setRiskLevel("LOW RISK");
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      let imageBase64 = "";
      if (damageImage) {
        imageBase64 = await fileToBase64(damageImage);
      }

      const payload = {
        total_claim_amount: formData.total_claim_amount,
        policy_deductable: formData.policy_deductable,
        fraud_score: fraudScore,
        damage_severity: visionResult?.damage_severity || "N/A",
        estimated_repair_cost: visionResult?.estimated_repair_cost || "₹0",
        damaged_parts: visionResult?.damaged_parts || [],
        image_base64: imageBase64 // Now the image is successfully sent to the backend!
      };

      const blob = await downloadPdfReport(payload);
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ClaimGuard_Report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download PDF:", err);
    }
  };

  const sections = [
    {
      title: "Customer Information",
      fields: [
        { name: "age", label: "Customer Age" },
        { name: "months_as_customer", label: "Customer Duration (Months)" },
        { name: "customer_tenure_days", label: "Customer Tenure (Days)" },
        { name: "insured_zip", label: "ZIP Code" },
      ],
    },
    {
      title: "Policy Information",
      fields: [
        { name: "policy_deductable", label: "Policy Deductible" },
        { name: "policy_annual_premium", label: "Annual Premium" },
        { name: "umbrella_limit", label: "Coverage Limit" },
        { name: "claim_to_premium_ratio", label: "Claim/Premium Ratio" },
      ],
    },
    {
      title: "Incident Information",
      fields: [
        { name: "incident_hour_of_the_day", label: "Incident Hour" },
        { name: "number_of_vehicles_involved", label: "Vehicles Involved" },
        { name: "bodily_injuries", label: "Bodily Injuries" },
        { name: "witnesses", label: "Witness Count" },
      ],
    },
    {
      title: "Claim Information",
      fields: [
        { name: "total_claim_amount", label: "Total Claim Amount" },
        { name: "injury_claim", label: "Injury Claim" },
        { name: "property_claim", label: "Property Claim" },
        { name: "vehicle_claim", label: "Vehicle Claim" },
        { name: "capital_gains", label: "Capital Gains" },
        { name: "capital_loss", label: "Capital Loss" },
        { name: "auto_year", label: "Vehicle Year" },
      ],
    },
  ];

  return (
    <div className="page">
      <Navbar />
      <section className="predict-page">
        <span className="section-tag">Fraud Prediction</span>
        <h1>Analyze Insurance Claim</h1>
        <p className="predict-subtitle">
          Enter all claim details and let ClaimGuard AI predict fraud probability.
        </p>

        <div className="predict-layout">
          <div className="predict-form card-shadow">
            <h2>Claim Details</h2>
            {sections.map((section) => (
              <div key={section.title} className="form-section">
                <h3>{section.title}</h3>
                <div className="section-grid">
                  {section.fields.map((field) => (
                    <div key={field.name} className="input-group">
                      <label>{field.label}</label>
                      <input
                        type="number"
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              className="primary-btn"
              onClick={analyzeClaim}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Claim"}
            </button>
          </div>

          <div className="result-card card-shadow">
            <ImageUpload onImageSelect={setDamageImage} />
            <VisionAnalysisCard result={visionResult} />
            <h2>Prediction Result</h2>
            <div
              className={`result-circle ${
                fraudScore > 70
                  ? "high-risk"
                  : fraudScore > 40
                  ? "medium-risk"
                  : "low-risk"
              }`}
            >
              {fraudScore}%
            </div>
            <h3>{riskLevel}</h3>
            <p>Fraud Probability: {fraudScore}%</p>
            <p>
              Prediction:
              {fraudScore > 50 ? " Fraudulent Claim" : " Genuine Claim"}
            </p>
            
            {riskLevel !== "Not Analyzed" && (
              <button 
                className="primary-btn" 
                onClick={handleDownloadPdf}
                style={{ marginTop: "20px", backgroundColor: "#0f172a" }}
              >
                Download PDF Report
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}