type Props = {

    result:any
  
  }
  
  export default function VisionAnalysisCard({
  
    result
  
  }:Props){
  
    if(!result) return null;
  
    return(
  
  <div className="vision-card card-shadow">
  
  <h2>
  🤖 AI Damage Analysis
  </h2>
  
  <p>
  
  <strong>
  Severity:
  </strong>
  
  {result.damage_severity}
  
  </p>
  
  <p>
  
  <strong>
  Estimated Repair:
  </strong>
  
  {result.estimated_repair_cost}
  
  </p>
  
  <div>
  
  <h3>
  Damaged Parts
  </h3>
  
  <ul>
  
  {result.damaged_parts.map(
  
  (part:string)=>(
  
  <li key={part}>
  {part}
  </li>
  
  )
  
  )}
  
  </ul>
  
  </div>
  
  <div>
  
  <h3>
  Fraud Indicators
  </h3>
  
  <ul>
  
  {result.fraud_indicators.map(
  
  (item:string)=>(
  
  <li key={item}>
  {item}
  </li>
  
  )
  
  )}
  
  </ul>
  
  </div>
  
  <p>
  
  {result.summary}
  
  </p>
  
  </div>
  
  );
  
  }