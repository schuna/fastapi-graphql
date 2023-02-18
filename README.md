alembic revision --autogenerate -m "Init"
# Pyinstaller 설정 방법
```
datas=[
    ('asset/graphiql.html', 'strawberry/static'),
    ], 
hiddenimports=[
        'asyncio', 'configparser', 'strawberry-graphql',
        'passlib.handlers.bcrypt', 'dependency_injector.errors',
        'dependency_injector.providers', 'dependency_injector.containers', 'six', 'json',
        'uvicorn.lifespan.off','uvicorn.lifespan.on','uvicorn.lifespan',
        'uvicorn.protocols.websockets.auto','uvicorn.protocols.websockets.wsproto_impl',
        'uvicorn.protocols.websockets_impl','uvicorn.protocols.http.auto',
        'uvicorn.protocols.http.h11_impl','uvicorn.protocols.http.httptools_impl',
        'uvicorn.protocols.websockets','uvicorn.protocols.http','uvicorn.protocols',
        'uvicorn.loops.auto','uvicorn.loops.asyncio','uvicorn.loops.uvloop','uvicorn.loops',
        'uvicorn.logging',
    ],
```

