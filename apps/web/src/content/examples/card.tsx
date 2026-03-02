import Card from "../../components/Card";
import type { ComponentExample } from "./types";

export const examples: ComponentExample[] = [
  {
    title: "Card Variants",
    description: "Default, stitched, and quilted card styles",
    variants: [
      {
        label: "Stitched",
        render: () => (
          <Card variant="stitched">
            <p>A card with an inset dashed stitch border.</p>
          </Card>
        ),
      },
      {
        label: "Quilted",
        render: () => (
          <Card variant="quilted">
            <p>A quilted card with perpendicular blanket stitching.</p>
          </Card>
        ),
      },
    ],
  },
];
