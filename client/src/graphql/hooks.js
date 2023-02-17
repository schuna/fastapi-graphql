import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {CREATE_USER_MUTATION, USERS_QUERY, USER_QUERY, USER_ADDED_SUBSCRIPTION} from "./queries";
import {getAccessToken} from "../auth";


export function useCreateUser() {
    const [mutate, {loading, error}] = useMutation(CREATE_USER_MUTATION);
    return {
        createUser: async (username, email, password) => {
            console.log("input:", username, email, password);
            const {data: {user}} = await mutate({
                variables: {input: {username, email, password}},
                context: {
                    headers: {'Authorization': 'Bearer ' + getAccessToken()}
                },
                update: (cache, {data: {user}}) => {
                    cache.writeQuery({
                        query: USER_QUERY,
                        variables: {id: user.id},
                        data: {user},
                    });
                },
            });
            return user;
        },
        loading,
        error: Boolean(error),
    }
}


export function useUser(id) {
    const {data, loading, error} = useQuery(USER_QUERY, {
        variables: {id: parseInt(id)},
        context: {
            headers: {'Authorization': 'Bearer ' + getAccessToken()},
        },
    })
    return {
        user: data?.user,
        loading,
        error: Boolean(error)
    };
}

export function useUsers() {
    const {data} = useQuery(USERS_QUERY, {
        fetchPolicy: 'network-only',
        context: {
            headers: {'Authorization': 'Bearer ' + getAccessToken()},
        },
    });
    useSubscription(USER_ADDED_SUBSCRIPTION, {
        onData: ({client, data}) => {
            const user = data.data.user;
            console.log('subscriptionData:', user);
            client.cache.updateQuery({query: USERS_QUERY}, ({users}) => {
                return {users: [...users, user]};
            });
        },
    });
    return {
        users: data?.users ?? [],
    };
}