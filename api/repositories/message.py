from api.graphql.fields import ResponseSchema
from api.models.message import Message
from api.repositories.base import RepositoryBase, V, T


class MessageRepository(RepositoryBase[T, V]):

    def get_by_tid(self, tid: int, limit: int = 100) -> ResponseSchema:
        with self.session_factory() as session:
            messages = session.query(Message).filter(Message.tid == tid).order_by(Message.tid.desc())
            return ResponseSchema(**{"data": messages[-limit:]})
