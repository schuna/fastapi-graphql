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
            id
            username
            email
            password
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


export const MESSAGES_QUERY = gql`
    query MessagesQuery($tid: Int!) {
        messages: messages(tid: $tid) {
            id
            tid
            text
        }
    }
`;

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription MessageAddedSubscription {
        message: messageAddedSubscription {
            id    
            tid
            text
        }
    }
`;
