# noinspection PyPackageRequirements
import strawberry

from api.graphql.fields import UserSchema
from api.graphql.resolvers import get_users, create_user, get_user
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


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation
)
