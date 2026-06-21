import FeatureCard from "./FeatureCard";

export default function Services() {
  return (
    <section className="services">

      <span className="section-tag">
        Core Capabilities
      </span>

      <h2>
        AI Powered Fraud Intelligence
      </h2>

      <div className="service-grid">

        <FeatureCard
          icon="🛡️"
          title="Fraud Detection"
          desc="Identify suspicious claims using machine learning."
        />

        <FeatureCard
          dark
          icon="📈"
          title="Risk Scoring"
          desc="Assign real-time risk levels to claims."
        />

        <FeatureCard
          dark
          icon="📄"
          title="Document Verification"
          desc="Validate uploaded claim documents."
        />

        <FeatureCard
          icon="📊"
          title="Claim Analytics"
          desc="Understand fraud patterns and trends."
        />

      </div>

    </section>
  );
}