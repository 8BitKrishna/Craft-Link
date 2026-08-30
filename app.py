"""
FastAPI service boundary. Routes contain NO business logic — they only
parse input, call ai_service.py / embedding_service.py, and shape the
HTTP response. This keeps the module easy to test and easy for a
teammate to read.
"""

import logging

from fastapi import FastAPI, File, HTTPException, UploadFile
from pydantic import BaseModel

from schemas import ProductAttributes, ProductListing
from ai_service import (
    analyze_product_image,
    validate_attributes,
    generate_catalog,
    translate_catalog,
    build_search_text,
)
from embedding_service import generate_embedding

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

app = FastAPI(title="CraftLink AI Engine")


class TranslateRequest(BaseModel):
    listing: ProductListing
    language: str


class EmbeddingRequest(BaseModel):
    text: str


@app.post("/products/analyze")
async def analyze_endpoint(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(status_code=422, detail="Uploaded file is empty")

        mime_type = file.content_type or "image/jpeg"
        attributes = analyze_product_image(image_bytes, mime_type)
        attributes = validate_attributes(attributes)

        return {"attributes": attributes.model_dump()}

    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        logger.error("analyze_endpoint failed: %s", type(exc).__name__)
        raise HTTPException(status_code=500, detail="Image analysis failed, please retry")


@app.post("/products/generate-catalog")
async def generate_catalog_endpoint(attributes: ProductAttributes):
    try:
        listing = generate_catalog(attributes)
        return {"listing": listing.model_dump()}

    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        logger.error("generate_catalog_endpoint failed: %s", type(exc).__name__)
        raise HTTPException(status_code=500, detail="Catalog generation failed, please retry")


@app.post("/products/translate")
async def translate_endpoint(request: TranslateRequest):
    try:
        translated = translate_catalog(request.listing, request.language)
        return {"language": request.language, "listing": translated.model_dump()}

    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        logger.error("translate_endpoint failed: %s", type(exc).__name__)
        raise HTTPException(status_code=500, detail="Translation failed, please retry")


@app.post("/products/embedding")
async def embedding_endpoint(request: EmbeddingRequest):
    try:
        vector = generate_embedding(request.text)
        return {"embedding": vector}

    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        logger.error("embedding_endpoint failed: %s", type(exc).__name__)
        raise HTTPException(status_code=500, detail="Embedding generation failed, please retry")


@app.get("/health")
async def health():
    return {"status": "ok"}
