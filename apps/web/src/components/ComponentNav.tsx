import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getComponents, type Component } from "../api/components";
import { getLatestRelease } from "../api/releases";

export default function ComponentNav() {
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
    <aside style={{ position: "sticky", top: 0, alignSelf: "flex-start", height: "100vh", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <h2><Link to="/">Quilt UI</Link></h2>
        {version && <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{version}</span>}
      </div>
      {loading && <p>Loading…</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {components.map((c) => (
          <li key={c.id}>
            <Link to={`/components/${c.key}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
