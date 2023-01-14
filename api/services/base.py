from typing import Generic, Type

from api.repositories.base import RepositoryBase, V, T
from api.graphql.fields import ResponseSchema


class ServiceBase(Generic[T, V]):
    def __init__(self, repository: RepositoryBase[Type[T], Type[V]]) -> None:
        self.repository = repository

    def create(self, item: V) -> ResponseSchema:
        return self.repository.add(item)

    def read(self, item_id: int) -> ResponseSchema:
        return self.repository.get(item_id)

    def reads(self) -> ResponseSchema:
        return self.repository.gets()

    def update(self, item_id: int, item: V) -> ResponseSchema:
        return self.repository.update(item_id, item)

    def delete(self, item_id: int) -> ResponseSchema:
        return self.repository.delete(item_id)
