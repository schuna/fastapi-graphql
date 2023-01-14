import {Link} from 'react-router-dom';

function UserItem({user}) {
    const username = user.username;
    return (
        <li className="media">
            <div className="media-content">
                <Link to={`/users/${user.id}`}>
                    {username}
                </Link>
            </div>
        </li>
    );
}

function UserList({users}) {
    return (
        <ul className="box">
            {users.map((user) => (
                <UserItem key={user.id} user={user}/>
            ))}
        </ul>
    );
}

export default UserList;
