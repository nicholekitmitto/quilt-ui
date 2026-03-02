import "./Chip.scss";

interface ChipProps {
  label: string;
  color?: string;
  variant?: "default" | "stitched" | "major" | "minor" | "patch";
  icon?: string;
  className?: string;
}

export default function Chip({ label, color, variant = "default", icon, className }: ChipProps) {
  const classes = [
    "chip",
    variant !== "default" && `chip-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      style={color ? { "--chip-color": color } as React.CSSProperties : undefined}
    >
      {icon && <img src={icon} alt="" className="chip__icon" />}
      {label}
    </span>
  );
}
