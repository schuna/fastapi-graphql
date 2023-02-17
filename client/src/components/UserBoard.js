import UserList from './UserList';
import {useUsers} from "../graphql/hooks";

function UserBoard() {
    const {users} = useUsers();
    console.log('[UserBoard] users:', {users});
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
