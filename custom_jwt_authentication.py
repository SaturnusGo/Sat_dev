from fastapi_users.authentication import BaseAuthenticationBackend
import jwt
from pydantic import ValidationError
from pyjwt import PyJWTError
from starlette import status
from starlette.exceptions import HTTPException

class CustomJWTAuthentication(BaseAuthenticationBackend):
    def __init__(self, secret: str, lifetime_seconds: int):
        self.secret = secret
        self.lifetime_seconds = lifetime_seconds

    async def __call__(
        self,
        request: Request,
        user_db: "UserDatabase",
        token: str,
    ) -> "BaseUserDB":
        try:
            payload = jwt.decode(token, self.secret, algorithms=["HS256"])
            user_id = payload.get("sub")
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Could not validate credentials",
                )
            token_data = payload.get("data")
            if token_data is None:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Could not validate credentials",
                )
        except PyJWTError:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
            )
        user = await user_db.get(user_id)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user

    async def get_login_response(self, user: "BaseUserDB", user_db: "UserDatabase") -> dict:
        return {"access_token": self.create_access_token(user), "token_type": "bearer"}

    def create_access_token(self, user: "BaseUserDB") -> str:
        data = {"sub": str(user.id)}
        return jwt.encode(data, self.secret, algorithm="HS256")
