using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;

namespace GraphQlApi
{
    internal static class Program
    {
        private static bool _quit;

        private static async Task Main(string[] args)
        {
            using var graphQlClient =
                new GraphQLHttpClient("http://127.0.0.1:8000/graphql", new NewtonsoftJsonSerializer());
            var userQuery = new GraphQLHttpRequest
            {
                Query = @"
                    query UserQuery($id: Int!){
                        user(userId: $id) {
                            email
                            id
                            username
                            password
                        }
                    }",
                OperationName = "UserQuery",
                Variables = new { id = 1 }
            };
            var graphQlResponse = await graphQlClient.SendQueryAsync<UserResponse>(userQuery);
            Console.WriteLine(JsonSerializer.Serialize(graphQlResponse, new JsonSerializerOptions
            {
                WriteIndented = true
            }));
            var usersQuery = new GraphQLHttpRequest
            {
                Query = @"
                    query UsersQuery{
                        users {
                            email
                            id
                            username
                            password
                        }
                    }",
                OperationName = "UsersQuery"
            };
            var graphQlResponses = await graphQlClient.SendQueryAsync<UsersResponse>(usersQuery);
            Console.WriteLine(JsonSerializer.Serialize(graphQlResponses, new JsonSerializerOptions
            {
                WriteIndented = true
            }));
            var userSubscription = new GraphQLRequest
            {
                Query = @"
                    subscription {
                        user: userAddedSubscription {
                            email
                            id
                            password
                            username
                        }
                    }"
            };
            _quit = false;
            var subscriptionStream =
                graphQlClient.CreateSubscriptionStream<UserResponse>(userSubscription);

            using var subscription = subscriptionStream.Subscribe(response =>
            {
                _quit = true;
                Console.WriteLine(response.Data.User.username);
            });
            do
            {
            } while (!_quit);
        }
    }
}