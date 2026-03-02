import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import type { ComponentExample } from "./types";

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete Component?">
        <p>Are you sure you want to delete this component? It cannot be undone.</p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <Button variant="outlined" textColor="#4d3c3cff" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Delete</Button>
        </div>
      </Modal>
    </>
  );
}

export const examples: ComponentExample[] = [
  {
    title: "Modal",
    description: "Parchment-styled overlay dialog with stitched border and wobbly edges",
    variants: [
      {
        label: "Confirmation",
        render: () => <ModalDemo />,
      },
    ],
  },
];
