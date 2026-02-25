import { useParams } from "react-router-dom";
import { useComponentDetail } from "../hooks/useComponentDetail";
import ComponentHeader from "../components/ComponentHeader";
import ComponentHistory from "../components/ComponentHistory";
import ComponentExamples from "../components/ComponentExamples";

export default function ComponentDetailPage() {
  const { key } = useParams<{ key: string }>();
  const { component, history, loading, error } = useComponentDetail(key);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!component) return <p>Component not found.</p>;

  return (
    <div>
      <ComponentHeader component={component} />
      <ComponentExamples componentKey={component.key} />
      <ComponentHistory history={history} />
    </div>
  );
}
