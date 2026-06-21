type Props = {
    title: string;
    desc: string;
    dark?: boolean;
    icon?: string;
  };
  
  export default function FeatureCard({
    title,
    desc,
    dark = false,
    icon = "✦",
  }: Props) {
    return (
      <div className={`feature-card ${dark ? "dark-card" : ""}`}>
        <div className="feature-top">
          <span className="feature-icon">
            {icon}
          </span>
        </div>
  
        <h3>{title}</h3>
  
        <p>{desc}</p>
  
        <button className="feature-btn">
          Learn More →
        </button>
      </div>
    );
  }