from typing import List

# noinspection PyPackageRequirements
import strawberry
from strawberry.file_uploads import Upload

from api.graphql.fields import UserSchema, FolderInput, UploadFileSchema
from api.graphql.resolvers import get_users, create_user, get_user, upload_file
from api.utils.auth import IsAuthenticated


@strawberry.type
class Query:
    user: UserSchema = strawberry.field(
        resolver=get_user,
        # permission_classes=[IsAuthenticated]
    )
    users: list[UserSchema] = strawberry.field(
        resolver=get_users,
        # permission_classes=[IsAuthenticated]
    )


@strawberry.type
class Mutation:
    user: UserSchema = strawberry.mutation(
        resolver=create_user,
        permission_classes=[IsAuthenticated]
    )

    read_file: UploadFileSchema = strawberry.mutation(
        resolver=upload_file,
        permission_classes=[IsAuthenticated]
    )

    @strawberry.mutation
    async def read_files(self, files: List[Upload]) -> List[str]:
        contents = []
        for file in files:
            content = (await file.read()).decode("uft-8")
            contents.append(content)
        return contents

    @strawberry.mutation
    async def read_folder(self, folder: FolderInput) -> List[str]:
        contents = []
        for file in folder.files:
            content = (await file.read()).decode("utf-8")
            contents.append(content)
        return contents


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation
)
