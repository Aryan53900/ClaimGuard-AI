type Props = {
    title: string;
    value: string;
    subtitle: string;
  };
  
  export default function StatsCard({
    title,
    value,
    subtitle,
  }: Props) {
    return (
      <div className="stats-card">
        <h4>{title}</h4>
  
        <h2>{value}</h2>
  
        <p>{subtitle}</p>
      </div>
    );
  }