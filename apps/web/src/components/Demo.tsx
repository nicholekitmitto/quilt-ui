import Button from "./Button";
import Card from "./Card";
import Chip from "./Chip";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";
import heartSvg from "../assets/heart.svg";
import mushroomSvg from "../assets/mushroom.svg";
import "./Demo.scss";
import "./Modal.scss";

export default function Demo() {
  return (
    <div className="demo">
      <img src={mushroomSvg} alt="" className="demo__mushroom demo__mushroom--tr" aria-hidden="true" />
      <div className="demo__grid">
        {/* Left column */}
        <div className="demo__col">
          {/* Buttons section */}
          <div className="demo__section">
            <div className="demo__label">
              <Link to="/components/button"><Chip variant="stitched" icon={heartSvg} label="Buttons" color="var(--color-leather)" /></Link>
            </div>
            <div className="demo__row">
              <div className="demo__group">
                <span className="demo__caption">Contained</span>
                <Button variant="contained" color="primary">Primary</Button>
              </div>
              <div className="demo__group">
                <span className="demo__caption">Stitched</span>
                <Button variant="stitched" color="secondary">Stitched</Button>
              </div>
              <div className="demo__group">
                <span className="demo__caption">Ghost</span>
                <Button variant="outlined">Ghost</Button>
              </div>
            </div>
            <div className="demo__row">
              <div className="demo__group">
                <span className="demo__caption">Disabled</span>
                <Button variant="stitched" color="primary" enabled={false}>Disabled</Button>
              </div>
            </div>
          </div>

          {/* Component Card section */}
          <div className="demo__section">
            <div className="demo__label">
              <Link to="/components/card"><Chip variant="stitched" icon={heartSvg} label="Component Card" color="var(--color-leather)" /></Link>
            </div>
            <Card variant="quilted">
              <div className="demo__card-content">
                <div className="demo__card-header">
                  <Chip label="Stable" color="var(--color-secondary)" />
                  <strong>Card</strong>
                </div>
                <p>Represents a UI component with a title, detail text, and optional tags.</p>
                <div className="demo__card-actions">
                  <Button variant="stitched" color="primary">View Details</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right column */}
        <div className="demo__col">
          {/* Modal section */}
          <div className="demo__section">
            <div className="demo__label">
              <Link to="/components/modal"><Chip variant="stitched" icon={heartSvg} label="Modal" color="var(--color-leather)" /></Link>
            </div>
            <div className="modal" style={{ position: "relative", maxWidth: "100%" }}>
              <div className="modal-header">
                <h2>Delete Component?</h2>
                <button className="modal-close" aria-label="Close">✕</button>
              </div>
              <div className="modal-body">
                <p style={{ margin: "0 0 1rem" }}>Are you sure you want to delete this component? It cannot be undone.</p>
                <div className="demo__modal-actions">
                  <Button variant="text" textColor="#000">Cancel</Button>
                  <Button variant="stitched" color="accent">Delete</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tooltip section */}
          <div className="demo__section">
            <div className="demo__label">
              <Link to="/components/tooltip"><Chip variant="stitched" icon={heartSvg} label="Tooltip" color="var(--color-leather)" /></Link>
            </div>
            <div className="demo__tooltip-demo">
              <Tooltip content="This is a tooltip!" position="right">
                <Button variant="stitched" color="success">Hover me.</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
