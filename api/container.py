from dependency_injector import containers, providers

from api.database import Database
from api.models import User
from api.repositories.user import UserRepository
from api.schemas import UserCreateSchema


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(modules=[
        "api.routers.login",
        "api.routers.graphql",
    ])
    config = providers.Configuration(yaml_files=["config.yml"])
    db = providers.Singleton(Database, db_url=config.db.url)
    user_repository = providers.Factory(
        UserRepository[User, UserCreateSchema],
        model=User,
        session_factory=db.provided.session,
    )

