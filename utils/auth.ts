
const AUTH_TOKEN_KEY = 'safi_seasite_tours_auth_token';

export const getAuthToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string | null): void => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }
};
