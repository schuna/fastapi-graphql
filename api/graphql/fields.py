from typing import Optional, Any

# noinspection PyPackageRequirements
import strawberry


@strawberry.type
class TokenSchema:
    access_token: str
    token_type: str
    user_id: int
    username: str


@strawberry.type
class ResponseSchema:
    data: Optional[Any] = None
    success: Optional[bool] = True
    message: Optional[str] = ""


@strawberry.type
class UserSchema:
    id: strawberry.ID
    username: str
    email: str
    password: str


@strawberry.input
class UserCreateInput:
    username: str
    email: str
    password: str
