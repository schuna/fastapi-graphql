import {useParams} from 'react-router';
import {useUser} from "../graphql/hooks";

function UserDetail() {

    const {userId} = useParams();
    const {user, loading, error} = useUser(userId);
    console.log('[UserDetail] user:', user);
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
            <h1 className="username">
                {user.username}
            </h1>
            <h1 className="email">
                {user.email}
            </h1>
        </div>
    );
}

export default UserDetail;
