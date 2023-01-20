import asyncio
from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport

transport = AIOHTTPTransport(url="http://localhost:8000/graphql")


async def get_users():
    async with Client(
            transport=transport,
            fetch_schema_from_transport=True,
    ) as session:
        query = gql(
            """
            query {
                users {
                    email
                    id
                    password
                    username
                }
            }
            """)
        return await session.execute(query)


async def get_file():
    async with Client(
            transport=transport
    ) as session:
        query = gql(
            """
            mutation($file: Upload!){
                readFile(file: $file)
            }
            """)
        with open("main.py", "rb") as f:
            params = {"file": f}
            return await session.execute(query, variable_values=params, upload_files=True)


async def main():
    response = await get_users()
    print(response)
    response = await get_file()
    print(response)


if __name__ == '__main__':
    asyncio.run(main())
