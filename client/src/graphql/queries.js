// noinspection GraphQLUnresolvedReference

import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const GRAPHQL_URL = 'http://localhost:8000/graphql';

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache()
});
export const USERS_QUERY = gql`
    query {
        users {
            email
            id
            password
            username
        }
    }
`;

export const USER_QUERY = gql`
    query UserQuery($id: Int!){
        user(userId: $id) {
            email
            id
            username
            email
        }
    }
`;

export const CREATE_USER_MUTATION = gql`
     mutation createUserMutation($input: UserCreateInput!) {
        user(data: $input ) {
            email
            id
            password
            username
        }
    }
`;

