import { post } from '@/utils/request';

export const register = async ({ username, email, password }) => {
    return post('/register', {
        username,
        email,
        password,
    });
};

export const login = async (username, password) => {
    return post('/login', { username, password });
};
