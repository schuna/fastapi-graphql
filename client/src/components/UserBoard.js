import UserList from './UserList';
import {useUsers} from "../graphql/hooks";

function UserBoard() {
    const {users, loading, error} = useUsers();
    console.log('[UserBoard] users:', {users, loading, error});
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>
            Sorry, something went wrong.
        </p>
    }
    return (
        <div>
            <h1 className="title">
                User Board
            </h1>
            <UserList users={users}/>
        </div>
    );
}

export default UserBoard;
