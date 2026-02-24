import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Quilt UI</h1>
      <p>A component registry for tracking, versioning, and managing your shared UI components.</p>
      <nav>
        <Link to="/components">Browse Components →</Link>
      </nav>
    </div>
  );
}
