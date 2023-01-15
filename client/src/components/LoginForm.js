import {useState} from 'react';
import {login} from '../auth';

function LoginForm({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);
        const success = await login(username, password);
        if (success) {
            onLogin();
        } else {
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">
                    Username
                </label>
                <div className="control">
                    <input className="input" type="text" required value={username}
                           onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">
                    Password
                </label>
                <div className="control">
                    <input className="input" type="password" required value={password}
                           onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </div>
            {error && (
                <div className="message is-danger">
                    <p className="message-body">
                        Login failed
                    </p>
                </div>
            )}
            <div className="field">
                <div className="control">
                    <button type="submit" className="button is-link">
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
