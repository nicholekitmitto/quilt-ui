import type { ComponentHistoryItem } from "../api/components";

interface Props {
  history: ComponentHistoryItem[];
}

export default function ComponentHistory({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {h.version} — {h.change_type}: {h.change_note}
          </li>
        ))}
      </ul>
    </div>
  );
}
