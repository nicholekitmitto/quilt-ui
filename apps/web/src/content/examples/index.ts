import type { ComponentExample } from "./types";
import { examples as button } from "./button";

const registry: Record<string, ComponentExample[]> = {
  button,
};

export function getExamples(componentKey: string): ComponentExample[] {
  return registry[componentKey] ?? [];
}
