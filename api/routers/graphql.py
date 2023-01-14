from dependency_injector.wiring import inject, Provide
from fastapi import Depends
# noinspection PyPackageRequirements
from strawberry.fastapi import BaseContext, GraphQLRouter

from api.container import Container
from api.graphql.schema import schema
from api.models import User
from api.schemas import UserCreateSchema
from api.services.user import UserService


class CustomContext(BaseContext):
    @inject
    def __init__(
            self,
            user_service: UserService[User, UserCreateSchema] = Depends(Provide[Container.user_service])
    ):
        super().__init__()
        self.user_service = user_service


def custom_context_dependency() -> CustomContext:
    return CustomContext()


async def get_context(custom_context=Depends(custom_context_dependency), ):
    return custom_context


graphql_router = GraphQLRouter(schema, context_getter=get_context, )
