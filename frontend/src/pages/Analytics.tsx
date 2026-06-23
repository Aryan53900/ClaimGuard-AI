import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {
  const riskData = [
    { month: "Jan", risk: 42 },
    { month: "Feb", risk: 55 },
    { month: "Mar", risk: 48 },
    { month: "Apr", risk: 71 },
    { month: "May", risk: 63 },
    { month: "Jun", risk: 82 },
  ];

  const categoryData = [
    { category: "Auto", count: 95 },
    { category: "Property", count: 62 },
    { category: "Health", count: 48 },
    { category: "Travel", count: 27 },
  ];

  return (
    <div className="page">
      <Navbar />

      <section className="analytics-page">

        <span className="section-tag">
          Advanced Analytics
        </span>

        <h1>Fraud Intelligence Center</h1>

        <div className="analytics-grid">

          <div className="chart-card">

            <h2>Risk Trend</h2>

            <div className="chart-area">

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={riskData}>

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#2563eb"
                    strokeWidth={4}
                  />

                </LineChart>
              </ResponsiveContainer>

            </div>

          </div>

          <div className="chart-card">

            <h2>Fraud Categories</h2>

            <div className="chart-area">

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={categoryData}>

                  <XAxis dataKey="category" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <div className="insight-card">

          <h2>AI Insights</h2>

          <ul>

            <li>
              Fraud activity increased
              19% during the last quarter.
            </li>

            <li>
              Auto insurance claims
              contribute the highest fraud rate.
            </li>

            <li>
              Claims with multiple witnesses
              show lower fraud probability.
            </li>

            <li>
              High-value claims require
              additional verification.
            </li>

          </ul>

        </div>

      </section>
    </div>
  );
}