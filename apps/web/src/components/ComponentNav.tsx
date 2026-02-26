import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComponents, type Component } from "../api/components";
import { getLatestRelease } from "../api/releases";
import "./ComponentNav.scss";

export default function ComponentNav() {
  const { key: activeKey } = useParams<{ key: string }>();
  const [components, setComponents] = useState<Component[]>([]);
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getComponents(), getLatestRelease()])
      .then(([comps, release]) => {
        setComponents(comps);
        setVersion(release?.version ?? null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="comp-nav">
      <div className="comp-nav-header">
        <Link to="/" className="comp-nav-title">Quilt UI</Link>
        {version && <span className="comp-nav-version">{version}</span>}
      </div>
      <p className="comp-nav-section-label">Components</p>
      {loading && <p className="comp-nav-status">Loading…</p>}
      {error && <p className="comp-nav-status">Error: {error}</p>}
      <ul className="comp-nav-list">
        {components.map((c) => (
          <li key={c.id}>
            <Link
              to={`/components/${c.key}`}
              className={`comp-nav-link${c.key === activeKey ? " comp-nav-link--active" : ""}`}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
