
from datetime import date
from typing import Literal

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, desc, asc, or_

from backend.database import get_db
from backend.models.item import Item
from backend.schemas.item import ItemResponse


router = APIRouter(
    prefix="/api/items",
    tags=["Items"]
)


@router.get(
    "/",
    response_model=list[ItemResponse],
    responses={
        400: {
            "description": "Invalid date range"
        }
    }
)
def browse_items(
    keyword: str | None = Query(
        default=None,
        min_length=1,
        max_length=100
    ),

    report_type: Literal["lost", "found"] | None = None,

    category: str | None = Query(
        default=None,
        min_length=1,
        max_length=50
    ),

    location: str | None = Query(
        default=None,
        min_length=1,
        max_length=200
    ),

    color: str | None = Query(
        default=None,
        min_length=1,
        max_length=50
    ),

    date_from: date | None = None,
    date_to: date | None = None,

    sort: Literal["newest", "oldest"] = "newest",

    page: int = Query(
        default=1,
        ge=1
    ),

    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),

    db: Session = Depends(get_db)
):

    # Validate Date Range
    if date_from and date_to and date_from > date_to:
        raise HTTPException(
            status_code=400,
            detail="date_from cannot be later than date_to"
        )

    # Get Active Reports
    statement = select(Item).where(
        Item.status == "active"
    )

    # Keyword Search
    if keyword and keyword.strip():
        search = f"%{keyword.strip()}%"

        statement = statement.where(
            or_(
                Item.title.ilike(search),
                Item.description.ilike(search)
            )
        )

    # Filter by Report Type
    if report_type:
        statement = statement.where(
            Item.report_type == report_type
        )

    # Filter by Category
    if category and category.strip():
        statement = statement.where(
            Item.category.ilike(f"%{category.strip()}%")
        )

    # Filter by Location
    if location and location.strip():
        statement = statement.where(
            Item.location.ilike(f"%{location.strip()}%")
        )

    # Filter by Color
    if color and color.strip():
        statement = statement.where(
            Item.color.ilike(f"%{color.strip()}%")
        )

    # Filter by Date Range
    if date_from:
        statement = statement.where(
            Item.event_date >= date_from
        )

    if date_to:
        statement = statement.where(
            Item.event_date <= date_to
        )

    # Sorting
    if sort == "newest":
        statement = statement.order_by(
            desc(Item.created_at),
            desc(Item.id)
        )
    else:
        statement = statement.order_by(
            asc(Item.created_at),
            asc(Item.id)
        )

    # Pagination
    offset = (page - 1) * limit

    statement = statement.offset(offset).limit(limit)

    # Execute Query
    items = db.scalars(statement).all()

    return items
