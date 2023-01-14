import {useMutation, useQuery} from "@apollo/client";
import {CREATE_USER_MUTATION, USERS_QUERY, USER_QUERY} from "./queries";
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
    });
    return {
        user: data?.user,
        loading,
        error: Boolean(error)
    };
}

export function useUsers() {
    const {data, loading, error} = useQuery(USERS_QUERY, {
        fetchPolicy: 'network-only',
    });
    return {
        users: data?.users,
        loading,
        error: Boolean(error)
    };
}