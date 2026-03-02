import Tooltip from "../../components/Tooltip";
import Button from "../../components/Button";
import type { ComponentExample } from "./types";

export const examples: ComponentExample[] = [
  {
    title: "Tooltip Positions",
    description: "Tooltips can appear on any side of the trigger element",
    variants: [
      {
        label: "Top",
        render: () => (
          <Tooltip content="This is a tooltip!" position="top">
            <Button variant="stitched" color="success">Hover me</Button>
          </Tooltip>
        ),
      },
      {
        label: "Bottom",
        render: () => (
          <Tooltip content="Bottom tooltip" position="bottom">
            <Button variant="stitched" color="craft">Hover me</Button>
          </Tooltip>
        ),
      },
      {
        label: "Left",
        render: () => (
          <Tooltip content="Left tooltip" position="left">
            <Button variant="stitched" color="accent">Hover me</Button>
          </Tooltip>
        ),
      },
      {
        label: "Right",
        render: () => (
          <Tooltip content="Right tooltip" position="right">
            <Button variant="stitched" color="secondary">Hover me</Button>
          </Tooltip>
        ),
      },
    ],
  },
];
