import Button from "../../components/Button";
import type { ComponentExample } from "./types";

export const examples: ComponentExample[] = [
  {
    title: "Button Variants",
    description: "Primary, secondary, disabled, stitched, and patch styles",
    variants: [
      {
        label: "Primary",
        render: () => <Button variant="primary">Primary</Button>,
      },
      {
        label: "Secondary",
        render: () => <Button variant="secondary">Secondary</Button>,
      },
      {
        label: "Disabled",
        render: () => (
          <Button variant="primary" enabled={false} disabledTip="Log in to continue">
            Disabled
          </Button>
        ),
      },
      {
        label: "Stitched",
        render: () => (
          <Button variant="secondary" stitchedClass="stitchedSecondary">
            Stitched
          </Button>
        ),
      },
      {
        label: "Patch",
        render: () => <Button variant="patch">Patch</Button>,
      },
    ],
  },
];
