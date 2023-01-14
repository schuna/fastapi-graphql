from fastapi import HTTPException, status
# noinspection PyPackageRequirements
from strawberry.types import Info

from api.graphql.fields import UserSchema, UserCreateInput
from api.schemas import UserCreateSchema


async def get_users(info: Info) -> list[UserSchema]:
    return info.context.user_service.reads().data


async def get_user(user_id: int, info: Info) -> UserSchema:
    return info.context.user_service.read(user_id).data


async def create_user(data: UserCreateInput, info: Info) -> UserSchema:
    entry = UserCreateSchema(**data.__dict__)
    response = info.context.user_service.create(entry)
    if response.success:
        return response.data
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"{response.message}")
