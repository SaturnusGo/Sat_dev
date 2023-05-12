import uvicorn
import uuid
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from Sat_dev.database.schemas import UserCreate
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from Sat_dev.database.models import User
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from Sat_dev.database.database import get_db, create_tables, create_user_email, update_user_name, update_user_password, \
    get_user_by_id
from fastapi import FastAPI, Request, Form, Depends, HTTPException, status, UploadFile
from Sat_dev.database.models import RegisterEmailRequest, RegisterNameRequest, RegisterPasswordRequest
from fastapi.responses import JSONResponse
from fastapi import APIRouter

app = FastAPI()
api_router = APIRouter()
app.include_router(api_router, prefix="/api")

create_tables()

origins = [
    "http://localhost",
    "http://localhost:5000",
    "http://127.0.0.1",
    "http://127.0.0.1:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/public", StaticFiles(directory="public"), name="public")

templates = Jinja2Templates(directory="templates")


@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/register", response_class=HTMLResponse)
async def get_register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


# Ваш код
@app.post("/register/email")
def register_email(request: RegisterEmailRequest, db: Session = Depends(get_db)):
    user = create_user_email(db, email=request.email)
    return {"user_id": user.user_id}


@app.post("/register/name")
def register_name(request: RegisterNameRequest, db: Session = Depends(get_db)):
    user = update_user_name(db, user_id=request.user_id, first_name=request.first_name, last_name=request.last_name)
    return {"user_id": user.user_id}


@app.post("/register/password")
def register_password(request: RegisterPasswordRequest, db: Session = Depends(get_db)):
    user = update_user_password(db, user_id=request.user_id, password=request.password)
    return {"user_id": user.user_id}


@app.post("/register/submit")
async def submit_registration(request: Request, user_id: int, updated_profile_data: dict,
                              db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Обновление данных профиля на основе updated_profile_data
    if "name" in updated_profile_data:
        user.name = updated_profile_data["name"]
    if "phone" in updated_profile_data:
        user.phone = updated_profile_data["phone"]
    if "email" in updated_profile_data:
        user.email = updated_profile_data["email"]

    db.commit()

    return {"message": "Профиль успешно обновлен"}


@app.get("/profile/{user_id}", response_class=HTMLResponse)
async def get_user_profile(request: Request, user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return templates.TemplateResponse("profile.html", {"request": request, "user": user})


@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error"},
    )


@app.get("/loading", response_class=HTMLResponse)
async def get_loading_page(request: Request):
    return templates.TemplateResponse("loader.html", {"request": request})


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )


@app.post("/order_ride")
async def order_ride(from_address: str, to_address: str):
    if not from_address or not to_address:
        raise HTTPException(status_code=400, detail="Addresses cannot be empty")

    # Здесь вы можете добавить логику обработки заказа поездки

    return {"status": "success", "from": from_address, "to": to_address}


@app.get("/", response_class=HTMLResponse)
async def get_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/welcome")
async def read_root(request: Request):
    return templates.TemplateResponse("welcome.html", {"request": request})


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, log_level="info")
