
from datetime import date, datetime
from typing import Literal

from pydantic import (
    BaseModel,
    Field,
    ConfigDict,
    field_validator,
)


class ItemBase(BaseModel):

    model_config = ConfigDict(
        str_strip_whitespace=True,
        extra="forbid",
    )

    title: str = Field(
        min_length=2,
        max_length=150,
    )

    report_type: Literal["lost", "found"]

    category: str = Field(
        min_length=2,
        max_length=50,
    )

    description: str = Field(
        min_length=5,
        max_length=2000,
    )

    color: str = Field(
        min_length=2,
        max_length=50,
    )

    location: str = Field(
        min_length=2,
        max_length=200,
    )

    event_date: date

    @field_validator("event_date")
    @classmethod
    def validate_event_date(cls, value: date) -> date:

        if value > date.today():
            raise ValueError(
                "Event date cannot be in the future."
            )

        return value


class ItemCreate(ItemBase):
    pass


class ItemResponse(ItemBase):

    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    user_id: int

    status: Literal[
        "active",
        "claimed",
        "resolved",
    ]

    created_at: datetime
    updated_at: datetime
