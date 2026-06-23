import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const recentPredictions = [
    {
      id: "CLM-1001",
      score: "87%",
      risk: "High",
    },
    {
      id: "CLM-1002",
      score: "65%",
      risk: "Medium",
    },
    {
      id: "CLM-1003",
      score: "22%",
      risk: "Low",
    },
    {
      id: "CLM-1004",
      score: "91%",
      risk: "High",
    },
  ];
const pieData = [
  {
    name: "Fraud",
    value: 227,
  },
  {
    name: "Genuine",
    value: 1021,
  },
];

const barData = [
  {
    month: "Jan",
    claims: 120,
  },
  {
    month: "Feb",
    claims: 145,
  },
  {
    month: "Mar",
    claims: 167,
  },
  {
    month: "Apr",
    claims: 132,
  },
  {
    month: "May",
    claims: 188,
  },
  {
    month: "Jun",
    claims: 214,
  },
];

const COLORS = [
  "#2563eb",
  "#93c5fd",
];
  return (
    <div className="page">
      <Navbar />
      

      <section className="dashboard-page">
        <span className="section-tag">
          Analytics Dashboard
        </span>
        

        <h1>Fraud Monitoring Center</h1>

        {/* Stats Cards */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Claims</h3>
            <h2>1,248</h2>
          </div>

          <div className="stat-card">
            <h3>Fraud Claims</h3>
            <h2>227</h2>
          </div>

          <div className="stat-card">
            <h3>Fraud Rate</h3>
            <h2>18.2%</h2>
          </div>

          <div className="stat-card">
            <h3>Average Risk</h3>
            <h2>62%</h2>
          </div>

        </div>

        {/* Charts Section */}

        <div className="chart-section">

          <div className="chart-card">

            <h2>Fraud Distribution</h2>

            <div className="chart-area">

  <ResponsiveContainer
    width="100%"
    height={300}
  >
    <PieChart>

      <Pie
        data={pieData}
        dataKey="value"
        outerRadius={100}
      >
        {pieData.map((_, index) => (
          <Cell
            key={index}
            fill={COLORS[index]}
          />
        ))}
      </Pie>

      <Tooltip />

    </PieChart>
  </ResponsiveContainer>

</div>

          </div>

          <div className="chart-card">

            <h2>Monthly Claims</h2>

            <div className="chart-area">

<ResponsiveContainer
  width="100%"
  height={300}
>
  <BarChart data={barData}>

    <XAxis dataKey="month" />

    <YAxis />

    <Tooltip />

    <Bar
      dataKey="claims"
      fill="#2563eb"
      radius={[8, 8, 0, 0]}
    />

  </BarChart>
</ResponsiveContainer>

</div>

          </div>

        </div>

        {/* Recent Predictions */}

        <div className="table-card">

          <h2>Recent Predictions</h2>

          <table>

            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Fraud Score</th>
                <th>Risk Level</th>
              </tr>
            </thead>

            <tbody>

              {recentPredictions.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.id}</td>
                  <td>{claim.score}</td>
                  <td>{claim.risk}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>
    </div>
  );
}