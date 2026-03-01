import type { ComponentHistoryItem } from "../api/components";
import "./ComponentHistory.scss";
import "./Chip.scss";

interface Props {
  history: ComponentHistoryItem[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function chipColor(changeType: string): string {
  switch (changeType.toLowerCase()) {
    case "major": return "chip-major";
    case "minor": return "chip-minor";
    case "patch": return "chip-patch";
    default: return "chip-minor";
  }
}

export default function ComponentHistory({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <section className="history">
      <div className="history-list">
        {history.map((h, i) => (
          <div key={i} className="history-row">
            <span className={`chip chip-stitched ${chipColor(h.change_type)}`}>
              {h.change_type.charAt(0).toUpperCase() + h.change_type.slice(1)}
            </span>
            <span className="history-version">{h.version}</span>
            <span className="history-date">{formatDate(h.released_at)}</span>
            <span className="history-note">{h.change_note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
