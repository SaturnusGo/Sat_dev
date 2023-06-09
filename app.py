import uvicorn
import uuid
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from Sat_dev.database.schemas import UserCreate
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from Sat_dev.database.models import User
from Sat_dev.database.schemas import UserIn
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from Sat_dev.database.database import get_db, create_tables, create_user_email, update_user_name, update_user_password, \
    get_user_by_id
from fastapi import FastAPI, Request, Form, Depends, HTTPException, status, UploadFile
from Sat_dev.database.models import RegisterEmailRequest, RegisterNameRequest, RegisterPasswordRequest
from fastapi.responses import JSONResponse
from fastapi import APIRouter
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
from typing import Dict
from starlette.websockets import WebSocketState
from database.models import Ride

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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


class Connection:
    def __init__(self, websocket: WebSocket, user_type: str):
        self.websocket = websocket
        self.user_type = user_type

    async def send_message(self, message: str):
        await self.websocket.send_text(message)


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[WebSocket, Connection] = {}

    async def connect(self, websocket: WebSocket, user_type: str):
        connection = Connection(websocket, user_type)
        await websocket.accept()
        self.active_connections[websocket] = connection

    async def disconnect(self, websocket: WebSocket):
        connection = self.active_connections.pop(websocket, None)
        if connection and websocket.application_state != WebSocketState.DISCONNECTED:
            await connection.websocket.close()

    async def send_personal_message(self, message: str, websocket: WebSocket):
        connection = self.active_connections.get(websocket)
        if connection:
            await connection.send_message(message)

    async def broadcast_message(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_message(message)


connection_manager = ConnectionManager()


@app.websocket("/passenger_ws")
async def passenger_websocket_endpoint(websocket: WebSocket):
    await connection_manager.connect(websocket, "passenger")
    try:
        while True:
            data = await websocket.receive_text()
            await connection_manager.broadcast_message(f"Passenger message: {data}")
    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket)


@app.websocket("/driver_ws")
async def driver_websocket_endpoint(websocket: WebSocket):
    await connection_manager.connect(websocket, "driver")
    try:
        while True:
            data = await websocket.receive_text()
            await connection_manager.broadcast_message(f"Driver message: {data}")
    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket)


@app.get("/passenger_chat", response_class=HTMLResponse)
async def get_passenger_chat(request: Request):
    return templates.TemplateResponse("passenger_chat.html", {"request": request})


@app.get("/driver_chat", response_class=HTMLResponse)
async def get_driver_chat(request: Request):
    return templates.TemplateResponse("driver_chat.html", {"request": request})


# Предположим, что у нас есть некий асинхронный сервис по управлению поездками
ride_service = None


@app.post("/rides")
async def create_ride(ride: Ride):
    # Здесь вы можете использовать ваш сервис по управлению поездками, чтобы сохранить информацию о поездке
    new_ride = await ride_service.create_ride(ride.ride_type, ride.destination)
    return new_ride


@app.get("/map-services", response_class=HTMLResponse)
async def get_map_services(request: Request):
    return templates.TemplateResponse("map-services.html", {"request": request})


def verify_password(db: Session, user_id: int, password: str) -> bool:
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return pwd_context.verify(password, user.password)


@app.get("/register", response_class=HTMLResponse)
async def get_register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


# Ваш код
@app.post("/register/email")
def register_email(request: RegisterEmailRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user is not None:
        raise HTTPException(status_code=400, detail="Email already registered. Recover access?")
    else:
        user = create_user_email(db, email=request.email)
        return {"user_id": user.user_id}


@app.post("/check_email")
def check_email(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    return {"exists": bool(user)}


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

    return {"message": "Супер! Поехали дальше"}


@app.get("/profile/{user_id}", response_class=HTMLResponse)
async def get_user_profile(request: Request, user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return templates.TemplateResponse("profile.html", {"request": request, "user": user})


@app.get("/login", response_class=HTMLResponse)
async def get_login(request: Request):
    messages = ["Сообщение 1", "Сообщение 2"]  # Ваши сообщения
    return templates.TemplateResponse("login.html", {"request": request, "messages": messages})


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    if not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    response = RedirectResponse(url=f'/profile/{user.user_id}', status_code=303)
    return response


@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error"},
    )


@app.get("/loading", response_class=HTMLResponse)
async def get_loading_page(request: Request):
    return templates.TemplateResponse("loader.html", {"request": request})


@app.get("/map", response_class=HTMLResponse)
async def get_map(request: Request):
    return templates.TemplateResponse("map.html", {"request": request})


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


@app.get("/welcome", response_class=HTMLResponse)
async def get_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/security-page", response_class=HTMLResponse)
async def get_security_page(request: Request):
    return templates.TemplateResponse("security-page.html", {"request": request})


@app.get("/404", response_class=HTMLResponse)
async def get_404_page(request: Request):
    return templates.TemplateResponse("404.html", {"request": request})


@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("welcome.html", {"request": request})


@app.get("/services", response_class=HTMLResponse)
async def get_services(request: Request):
    return templates.TemplateResponse("services.html", {"request": request})


@app.get("/add-card", response_class=HTMLResponse)
async def get_add_card(request: Request):
    return templates.TemplateResponse("add-card.html", {"request": request})


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, log_level="info")
