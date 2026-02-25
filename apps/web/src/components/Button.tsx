import { useId } from "react";
import "./Button.scss";
import stitched from "./Stitched.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  variant?: string;
  enabled?: boolean;
  disabledTip?: string;
  stitchedClass?: keyof typeof stitched;
}

export default function Button({
  color,
  variant,
  enabled = true,
  disabledTip,
  stitchedClass,
  children,
  onClick,
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = !enabled;
  const tipId = useId();

  const classes = [
    "btn",
    variant && `btn-${variant}`,
    color && `btn-${color}`,
    stitchedClass && stitched[stitchedClass],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        className={classes}
        aria-disabled={isDisabled}
        aria-describedby={isDisabled && disabledTip ? tipId : undefined}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
      {isDisabled && disabledTip && (
        <span id={tipId} role="tooltip" className="btn-tooltip">
          {disabledTip}
        </span>
      )}
    </span>
  );
}
