import logging
from typing import List

from api.graphql.fields import ResponseSchema, MessageSchema
from api.models.message import Message
from api.repositories.base import RepositoryBase, V, T
from sqlalchemy.exc import IntegrityError


class MessageRepository(RepositoryBase[T, V]):

    def get_by_tid(self, tid: int, limit: int = 100) -> ResponseSchema:
        with self.session_factory() as session:
            messages = session.query(Message).filter(Message.tid == tid).order_by(Message.tid.desc())
            return ResponseSchema(**{"data": messages[-limit:]})

    def get_max_id(self, tid: int) -> int:
        with self.session_factory() as session:
            messages = session.query(Message).filter(Message.tid == tid).order_by(Message.id.desc())
            if messages.first():
                return messages.first().id
            return 0

    def add_by_tid(self, tid: int, messages: List[str]) -> ResponseSchema:
        with self.session_factory() as session:
            entries = []
            for message in messages:
                entry = self.model(**{"tid": tid, "text": message})
                session.add(entry)
                entries.append(entry)
            session.commit()
            return ResponseSchema(**{"data": [MessageSchema(**{
                "id": x.id,
                "tid": x.tid,
                "text": x.text
            }) for x in entries]})
