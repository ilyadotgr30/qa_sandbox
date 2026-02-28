from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str = Field(..., example="Cyber-Punk Watch v.1")
    description: Optional[str] = Field(None, example="The best watch for hackers")
    price: float = Field(..., gt=0, example=99.99)
    stock_quantity: int = Field(default=0, ge=0)
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}

class UserCreate(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str