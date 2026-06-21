import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">ClaimGuard AI</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/predict">Predict</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}