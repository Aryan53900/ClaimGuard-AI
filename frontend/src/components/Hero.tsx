import StatsCard from "./StatsCard";

export default function Hero() {
  return (
    <section className="hero-grid">

      {/* LEFT SIDE */}
      <div className="hero-content">
        <span className="hero-badge">
          AI Fraud Detection Platform
        </span>

        <h1>
          AI Powered
          <br />
          Insurance Fraud
          <br />
          Detection
        </h1>

        <p>
          Detect suspicious claims instantly using machine learning,
          risk scoring and fraud analytics.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Analyze Claim →
          </button>

          <button className="secondary-btn">
            Dashboard
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hero-right">

        <StatsCard
          title="Fraud Rate"
          value="18.2%"
          subtitle="Across all claims"
        />

        <StatsCard
          title="Claims Processed"
          value="1248"
          subtitle="This month"
        />

        <div className="shield-card">
          <div className="shield-circle">
            <span>AI</span>
          </div>

          <h3>Fraud Shield</h3>

          <p>
            Real-time risk detection powered by machine learning.
          </p>
        </div>

      </div>
    </section>
  );
}