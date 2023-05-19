from typing import Type
from sqlalchemy import create_engine
from fastapi import HTTPException
from sqlalchemy.orm import scoped_session, sessionmaker, Session
from Sat_dev.database.models import Base
from Sat_dev.database.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


DATABASE_URL = "sqlite:///./database.db"

engine = create_engine(DATABASE_URL)
db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.query = db_session.query_property()


def create_tables():
    Base.metadata.create_all(bind=engine)


# Вместо этого используйте реальную базу данных
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_user_email(db: Session, email: str) -> User:
    user = User(email=email, password=pwd_context.hash("default_password"))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user_name(db: Session, user_id: int, first_name: str, last_name: str) -> Type[User]:
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.first_name = first_name
    user.last_name = last_name
    db.commit()
    db.refresh(user)
    return user


def update_user_password(db: Session, user_id: int, password: str) -> User:
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password = pwd_context.hash(password)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()