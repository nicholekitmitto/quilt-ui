import { Link } from "react-router-dom";
import type { Component } from "../api/components";
import Chip from "./Chip";
import "./ComponentHeader.scss";

interface Props {
  component: Component;
}

export default function ComponentHeader({ component }: Props) {
  return (
    <header className="component-header">
      <nav className="component-header-breadcrumb">
        <Link to="/components">Components</Link>
        <span> / </span>
        <span>{component.name}</span>
      </nav>
      <h1 className="color-secondary">{component.name}</h1>
      <div className="component-header-meta">
        <Chip label={component.status} color="var(--color-secondary)" />
        <p>{component.description}</p>
      </div>
    </header>
  );
}
