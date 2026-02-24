import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getComponents, type Component } from "../api/components";

export default function ComponentsPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getComponents()
      .then(setComponents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <aside>
        <h2>Components</h2>
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
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
