// NOTE: this example keeps the access token in LocalStorage just because it's
// simpler, but in a real application you may want to use cookies instead for
// better security
import jwtDecode from "jwt-decode";
const ACCESS_TOKEN_KEY = 'accessToken';
const API_URL = 'http://localhost:8000';

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getUserFromToken(token) {
    const jwtPayload = jwtDecode(token)
    return {id: jwtPayload.sub};
}

export function getUser() {
    const token = getAccessToken();
    if (!token) {
        return null;
    }
    return getUserFromToken(token);
}

export async function login(username, password) {
    const details = {'username': username, "password": password};
    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
    });
    if (response.ok) {
        const {access_token} = await response.json();
        localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    }
    return response.ok;
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}
