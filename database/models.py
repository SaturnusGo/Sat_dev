from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)


class RegisterEmailRequest(BaseModel):
    email: str


class RegisterNameRequest(BaseModel):
    user_id: int
    first_name: str
    last_name: str


class RegisterPasswordRequest(BaseModel):
    user_id: int
    password: str


class Ride(BaseModel):
    ride_type: str
    destination: str
