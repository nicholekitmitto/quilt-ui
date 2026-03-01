import { useParams } from "react-router-dom";
import { useComponentDetail } from "../hooks/useComponentDetail";
import ComponentHeader from "../components/ComponentHeader";
import ComponentHistory from "../components/ComponentHistory";
import ComponentExamples from "../components/ComponentExamples";
import "./ComponentDetailPage.scss";

export default function ComponentDetailPage() {
  const { key } = useParams<{ key: string }>();
  const { component, history, loading, error } = useComponentDetail(key);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!component) return <p>Component not found.</p>;

  return (
    <div className="detail">
      <ComponentHeader component={component} />

      <section className="detail-section">
        <div className="detail-section-number">01</div>
        <h2 className="detail-section-label">Examples</h2>
        <ComponentExamples componentKey={component.key} />
      </section>

      <section className="detail-section">
        <div className="detail-section-number">02</div>
        <h2 className="detail-section-label">History</h2>
        <ComponentHistory history={history} />
      </section>
    </div>
  );
}
