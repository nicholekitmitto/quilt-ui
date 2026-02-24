import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import all models so SQLAlchemy resolves relationships
import app.models.component  # noqa: F401
import app.models.release  # noqa: F401
import app.models.release_item  # noqa: F401

from app.api.components import router as components_router
from app.api.releases import router as releases_router

app = FastAPI(title="Quilt UI API")

cors_origins = os.environ.get("CORS_ORIGINS", "http://localhost:5173")
origins = [o.strip() for o in cors_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(components_router)
app.include_router(releases_router)

@app.get("/health")
def health():
    return {"ok": True}