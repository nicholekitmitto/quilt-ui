import Button from "./Button";
import Card from "./Card";
import Chip from "./Chip";
import Tooltip from "./Tooltip";
import heartSvg from "../assets/heart.svg";
import mushroomSvg from "../assets/mushroom.svg";
import "./Demo.scss";

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
              <Chip variant="stitched" icon={heartSvg} label="Buttons" color="var(--color-leather)" />
            </div>
            <div className="demo__row">
              <div className="demo__group">
                <span className="demo__caption">Primary</span>
                <Button variant="stitched" color="primary">Primary</Button>
              </div>
              <div className="demo__group">
                <span className="demo__caption">Secondary</span>
                <Button variant="stitched" color="secondary">Secondary</Button>
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
              <div className="demo__group">
                <span className="demo__caption">Craft</span>
                <Button variant="stitched" color="craft">Craft</Button>
              </div>
              <div className="demo__group">
                <span className="demo__caption">Accent</span>
                <Button variant="stitched" color="accent">Accent</Button>
              </div>
            </div>
          </div>

          {/* Component Card section */}
          <div className="demo__section">
            <div className="demo__label">
              <Chip variant="stitched" icon={heartSvg} label="Component Card" color="var(--color-leather)" />
            </div>
            <Card variant="quilted">
              <div className="demo__card-content">
                <div className="demo__card-header">
                  <Chip label="Stable" color="var(--color-success-chip)" />
                  <strong>Card</strong>
                </div>
                <p>Represents a UI component with a title, detail text, and optional tags.</p>
                <div className="demo__card-actions">
                  <Chip label="Example Tag" />
                  <Button variant="stitched" color="accent">View Details</Button>
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
              <Chip variant="stitched" icon={heartSvg} label="Modal" color="var(--color-leather)" />
            </div>
            <Card variant="stitched">
              <div className="demo__modal-content">
                <h3>Delete Component?</h3>
                <p>Are you sure you want to delete this component. It cannot be undone.</p>
                <div className="demo__modal-actions">
                  <Button variant="outlined">Cancel</Button>
                  <Button variant="stitched" color="accent">Delete</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Tooltip section */}
          <div className="demo__section">
            <div className="demo__label">
              <Chip variant="stitched" icon={heartSvg} label="Tooltip" color="var(--color-leather)" />
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
