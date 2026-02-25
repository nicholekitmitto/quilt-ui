import { useId } from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  variant: string;
  enabled?: boolean;
  disabledTip?: string;
  borderColor?: string;
}

export default function Button({
  color,
  variant,
  enabled = true,
  disabledTip,
  borderColor,
  children,
  onClick,
  className,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = !enabled;
  const tipId = useId();

  const classes = [
    "btn",
    variant && `btn-${variant}`,
    color && `btn-${color}`,
    isDisabled && "disabled",
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

  const btnStyle = {
    ...style,
    ...(borderColor ? { "--btn-border-color": borderColor } : {}),
  } as React.CSSProperties;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        className={classes}
        style={btnStyle}
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
