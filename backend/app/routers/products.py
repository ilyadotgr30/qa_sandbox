from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
from app.core.security import ALGORITHM, SECRET_KEY
from app.core.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(tags=["Products"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid token: sub claim missing"
            )
        return email
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Could not validate credentials"
        )

# 1. GET /products - Получить все товары (Доступно всем)
@router.get("/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(models.Product).offset(skip).limit(limit).all()
    return products

# 2. POST /products - Создать новый товар (Только для авторизованных)
@router.post("/", response_model=schemas.Product)
def create_product(
    product: schemas.ProductCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) # Вот эта строка проверяет токен
):
    # Пример бизнес-валидации для тестировщиков
    if product.price > 1000000:
        raise HTTPException(status_code=400, detail="Price is too high even for Cyberpunk")
        
    new_product = models.Product(**product.model_dump()) 
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# 3. GET /products/{id} - Получить конкретный товар (Доступно всем)
@router.get("/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# 4. PUT /products/{id} - Обновить товар полностью (Только для авторизованных)
@router.put("/{product_id}", response_model=schemas.Product)
def update_product(
    product_id: int, 
    updated_data: schemas.ProductCreate, 
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    product_query = db.query(models.Product).filter(models.Product.id == product_id)
    product = product_query.first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_query.update(updated_data.model_dump(), synchronize_session=False)
    db.commit()
    return product_query.first()

# 5. DELETE /products/{id} - Удалить товар (Только для авторизованных)
@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int, 
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    product_query = db.query(models.Product).filter(models.Product.id == product_id)
    product = product_query.first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_query.delete(synchronize_session=False)
    db.commit()
    return None

from fastapi import Response

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user) # Защищаем удаление токеном
):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put("/{product_id}", response_model=schemas.Product)
def update_product(
    product_id: int, 
    product_update: schemas.ProductCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Обновляем поля
    db_product.name = product_update.name
    db_product.price = product_update.price
    db_product.description = product_update.description
    
    db.commit()
    db.refresh(db_product)
    return db_product