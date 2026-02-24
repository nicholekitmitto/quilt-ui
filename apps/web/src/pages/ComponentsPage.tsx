import { useEffect, useState } from "react";
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

  if (loading) return <p>Loading components…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Components</h1>
      {components.length === 0 ? (
        <p>No components found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {components.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.key}</td>
                <td>{c.status}</td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
