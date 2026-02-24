from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.component import Component
from app.models.release import Release
from app.models.release_item import ReleaseItem


def seed():
    db: Session = SessionLocal()

    try:
        # Prevent duplicate seeding
        existing = db.query(Component).first()
        if existing:
            print("Database already seeded.")
            return

        # ---- Components ----
        button = Component(
            key="button",
            name="Button",
            description="Primary interactive control",
            status="stable",
        )

        modal = Component(
            key="modal",
            name="Modal",
            description="Overlay dialog component",
            status="stable",
        )

        card = Component(
            key="card",
            name="Card",
            description="Flexible content container",
            status="beta",
        )

        db.add_all([button, modal, card])
        db.flush()  # assigns IDs without committing

        # ---- Release ----
        release = Release(
            version="1.0.0",
            notes="Initial release of core components",
            commit_sha="abc1234",
        )

        db.add(release)
        db.flush()

        # ---- Release Items ----
        release_items = [
            ReleaseItem(
                release_id=release.id,
                component_id=button.id,
                change_type="major",
                change_note="Initial implementation",
            ),
            ReleaseItem(
                release_id=release.id,
                component_id=modal.id,
                change_type="major",
                change_note="Initial implementation",
            ),
            ReleaseItem(
                release_id=release.id,
                component_id=card.id,
                change_type="major",
                change_note="Initial implementation",
            ),
        ]

        db.add_all(release_items)

        db.commit()
        print("Database seeded successfully.")

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()


if __name__ == "__main__":
    seed()