import type { ReactNode } from "react";
import "./Card.component.scss";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "quilted" | "stitched";
  className?: string;
}

export default function Card({ children, variant = "default", className }: CardProps) {
  const classes = [
    "quilt-card",
    variant !== "default" && `quilt-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
