import {ApolloProvider} from "@apollo/client";
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Route, Routes} from 'react-router-dom';
import {isLoggedIn} from './auth';
import LoginForm from './components/LoginForm';
import UserBoard from './components/UserBoard';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';
import NavBar from './components/NavBar';
import SignUpForm from "./components/SignUpForm";
import {client} from "./graphql/queries";

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    const handleLogin = () => {
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <ApolloProvider client={client}>
            <NavBar loggedIn={loggedIn} onLogout={handleLogout}/>
            <main className="section">
                <Routes>
                    <Route exact path="/"
                           element={<UserBoard/>}
                    />
                    <Route exact path="/users/new"
                           element={<UserForm/>}
                    />
                    <Route path="/users/:userId"
                           element={<UserDetail/>}
                    />
                    <Route exact path="/login"
                           element={<LoginForm onLogin={handleLogin}/>}
                    />
                    <Route exact path="/signup"
                           element={<SignUpForm/>}
                    />
                </Routes>
            </main>
        </ApolloProvider>
    );
}

export default App;
