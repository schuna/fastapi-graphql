from api.repositories.base import V, T
from api.graphql.fields import ResponseSchema
from api.services.base import ServiceBase


class UserService(ServiceBase[T, V]):
    def get_user_by_name(self, username: str) -> ResponseSchema:
        # noinspection PyUnresolvedReferences
        return self.repository.get_by_username(username)
