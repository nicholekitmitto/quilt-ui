import Button from "../../components/Button";
import type { ComponentExample } from "./types";

export const examples: ComponentExample[] = [
  {
    title: "Button Variants",
    description: "Text, contained, outlined, and stitched styles",
    variants: [
      {
        label: "Text",
        render: () => <Button variant="text">Text</Button>,
      },
      {
        label: "Contained",
        render: () => <Button variant="contained">Contained</Button>,
      },
      {
        label: "Outlined",
        render: () => <Button variant="outlined">Outlined</Button>,
      },
      {
        label: "Stitched",
        render: () => (
          <Button variant="stitched">
            Stitched
          </Button>
        ),
      },
    ],
  },
  {
    title: "Disabled Variants",
    description: "Each variant with disabled state",
    variants: [
      {
        label: "Text",
        render: () => (
          <Button variant="text" enabled={false} disabledTip="Log in to continue">
            Text
          </Button>
        ),
      },
      {
        label: "Contained",
        render: () => (
          <Button variant="contained" enabled={false} disabledTip="Log in to continue">
            Contained
          </Button>
        ),
      },
      {
        label: "Outlined",
        render: () => (
          <Button variant="outlined" enabled={false} disabledTip="Log in to continue">
            Outlined
          </Button>
        ),
      },
      {
        label: "Stitched",
        render: () => (
          <Button variant="stitched" enabled={false} disabledTip="Log in to continue">
            Stitched
          </Button>
        ),
      },
    ],
  },
  {
    title: "Color",
    description: "Color applied to each variant",
    variants: [
      {
        label: "Text",
        render: () => <Button variant="text" color="primary">Text</Button>,
      },
      {
        label: "Contained",
        render: () => <Button variant="contained" color="success">Success</Button>,
      },
      {
        label: "Outlined",
        render: () => <Button variant="outlined" color="error">Error</Button>,
      },
      {
        label: "Stitched",
        render: () => (
          <Button variant="stitched" color="secondary">
            Secondary
          </Button>
        ),
      },
    ],
  },
];
