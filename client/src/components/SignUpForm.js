import {useNavigate} from "react-router";
import {useState} from "react";
import {useCreateUser} from "../graphql/hooks";

function SignUpForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {createUser, loading, error} = useCreateUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await createUser(username, email, password);
        console.log('user created:', user);
        navigate(`/`);
    };
    if (error) {
        return <p>
            Sorry, something went wrong.
        </p>
    }
    return (
        <div>
            <h1 className="title">
                New User
            </h1>
            <div className="box">
                <form>
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
                            Email
                        </label>
                        <div className="control">
                            <input className="input" type="email" required value={email}
                                   onChange={(event) => setEmail(event.target.value)}
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
                    <div className="field">
                        <div className="control">
                            <button className="button is-link" disabled={loading}
                                    onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default SignUpForm;