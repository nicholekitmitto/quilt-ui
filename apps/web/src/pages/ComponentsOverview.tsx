import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getComponents, type Component } from "../api/components";
import Button from "../components/Button";
import Chip from "../components/Chip";
import "./ComponentsOverview.scss";

const demos: Record<string, () => React.ReactNode> = {
  button: () => (
    <div className="overview-demo">
      <Button variant="contained">Click me</Button>
      <Button variant="stitched">Stitched</Button>
    </div>
  ),
  chip: () => (
    <div className="overview-demo">
      <Chip label="Stable" color="var(--color-success)" />
      <Chip label="Beta" color="var(--color-primary)" />
    </div>
  ),
};

export default function ComponentsOverview() {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComponents()
      .then(setComponents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Components</h1>
      <p>All available components in the library.</p>
      <div className="overview-grid">
        {components.map((c) => (
          <Link to={`/components/${c.key}`} key={c.id} className="overview-card">
            <div className="overview-card-preview">
              {demos[c.key] ? demos[c.key]() : <span className="overview-card-empty">No preview</span>}
            </div>
            <div className="overview-card-footer">
              <span className="overview-card-name">{c.name}</span>
              <Chip label={c.status} color={c.status === "stable" ? "var(--color-success)" : "var(--color-primary)"} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
