import { useState, useRef, type ReactNode } from "react";
import "./Tooltip.scss";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: TooltipPosition;
}

export default function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  return (
    <span
      className="tooltip-wrapper"
      ref={triggerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className={`tooltip tooltip--${position}`}
          role="tooltip"
        >
          <span className="tooltip__arrow" />
          <span className="tooltip__body">{content}</span>
        </span>
      )}
    </span>
  );
}
