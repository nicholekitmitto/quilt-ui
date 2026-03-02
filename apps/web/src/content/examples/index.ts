import type { ComponentExample } from "./types";
import { examples as button } from "./button";
import { examples as card } from "./card";
import { examples as tooltip } from "./tooltip";

const registry: Record<string, ComponentExample[]> = {
  button,
  card,
  tooltip,
};

export function getExamples(componentKey: string): ComponentExample[] {
  return registry[componentKey] ?? [];
}
