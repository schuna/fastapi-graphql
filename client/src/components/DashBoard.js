import UserList from './UserList';
import {useUsers} from "../graphql/hooks";
import Message from "./Message";

function DashBoard() {
    const {users} = useUsers();
    return (
        <div>
            <h1 className="title">
                Dash Board
            </h1>
            <UserList users={users}/>
            <Message/>
        </div>
    );
}

export default DashBoard;
