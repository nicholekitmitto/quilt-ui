import "./Chip.scss";

interface ChipProps {
  label: string;
  color?: string;
}

export default function Chip({ label, color }: ChipProps) {
  return (
    <span
      className="chip"
      style={color ? { "--chip-color": color } as React.CSSProperties : undefined}
    >
      {label}
    </span>
  );
}
