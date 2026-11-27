
from typing import Literal

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import select, desc, asc, or_

from backend.database import get_db
from backend.models.item import Item
from backend.schemas.item import ItemResponse


router = APIRouter(
    prefix="/api/items",
    tags=["Items"]
)


@router.get("/", response_model=list[ItemResponse])
def browse_items(
    keyword: str | None = None,
    report_type: Literal["lost", "found"] | None = None,
    category: str | None = None,
    location: str | None = None,
    color: str | None = None,
    sort: Literal["newest", "oldest"] = "newest",
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):

    statement = select(Item).where(Item.status == "active")

    # Keyword Search
    if keyword:
        search = f"%{keyword}%"
        statement = statement.where(
            or_(
                Item.title.ilike(search),
                Item.description.ilike(search)
            )
        )

    # Filter by report type
    if report_type:
        statement = statement.where(
            Item.report_type == report_type
        )

    # Filter by category
    if category:
        statement = statement.where(
            Item.category.ilike(f"%{category}%")
        )

    # Filter by location
    if location:
        statement = statement.where(
            Item.location.ilike(f"%{location}%")
        )

    # Filter by color
    if color:
        statement = statement.where(
            Item.color.ilike(f"%{color}%")
        )

    # Sorting
    if sort == "newest":
        statement = statement.order_by(desc(Item.created_at))
    else:
        statement = statement.order_by(asc(Item.created_at))

    # Pagination
    offset = (page - 1) * limit
    statement = statement.offset(offset).limit(limit)

    items = db.scalars(statement).all()

    return items
