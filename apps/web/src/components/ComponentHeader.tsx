import type { Component } from "../api/components";

interface Props {
  component: Component;
}

export default function ComponentHeader({ component }: Props) {
  return (
    <div>
      <h1>{component.name}</h1>
      <p>{component.description}</p>
      <p>Status: {component.status}</p>
    </div>
  );
}
