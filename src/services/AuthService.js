import axios from 'axios'

const AuthService = {

    login(email, password) {
        return axios.post('login', {email, password}).then(
            res => {
                if (res.data.accessToken) {
                    localStorage.setItem('token', res.data.accessToken);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    return Promise.resolve(res);
                }
            },
            error => {
                return Promise.reject(error);
            }
        );
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    register() {

    },

    user() {
        return axios.get('user');
    },

    auth() {
        return !!localStorage.getItem('token') && !!localStorage.getItem('user');
    }

}

export default AuthService
