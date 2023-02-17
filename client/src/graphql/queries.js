// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export const USER_ADDED_SUBSCRIPTION = gql`
    subscription {
        user: userAddedSubscription {
            email
            id
            password
            username
        }
    }
`;
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

