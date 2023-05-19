from pydantic import BaseModel, EmailStr
from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    email: EmailStr


class UserUpdateName(BaseModel):
    first_name: str
    last_name: str


class UserUpdatePassword(BaseModel):
    password: str


class UserOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class UserIn(BaseModel):
    user_id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    password: Optional[str] = None