import type { ReactNode } from "react";

export interface ExampleVariant {
  label: string;
  render: () => ReactNode;
}

export interface ComponentExample {
  title: string;
  description: string;
  variants: ExampleVariant[];
}
