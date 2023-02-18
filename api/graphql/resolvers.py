import os
import uuid
from pathlib import Path

from fastapi.encoders import jsonable_encoder
from fastapi import HTTPException, status
# noinspection PyPackageRequirements
from strawberry.file_uploads import Upload
# noinspection PyPackageRequirements
from strawberry.types import Info

from api.graphql.fields import UserSchema, UserCreateInput, UploadFileSchema
from api.schemas import UserCreateSchema
from api.utils.auth import Hash


async def get_users(info: Info) -> list[UserSchema]:
    return info.context.user_service.reads().data


async def get_user(user_id: int, info: Info) -> UserSchema:
    return info.context.user_service.read(user_id).data


async def create_user(data: UserCreateInput, info: Info) -> UserSchema:
    data.password = Hash.bcrypt(data.password)
    entry = UserCreateSchema(**data.__dict__)
    entry.password = Hash.bcrypt(entry.password)
    response = info.context.user_service.create(entry)
    if response.success:
        await info.context.broadcast.publish(channel="add_user", message=jsonable_encoder(response.data))
        user_json = jsonable_encoder(response.data)
        print(f"user create: {user_json}")
        return response.data
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"{response.message}")


async def upload_file(filename: str, file: Upload):
    upload_dir = Path("asset")
    content = await file.read()
    filename = f"{str(uuid.uuid4())}_{filename}"

    with open(os.path.join(upload_dir, filename), "wb") as fp:
        fp.write(content)

    return UploadFileSchema(**{"filename": filename})
