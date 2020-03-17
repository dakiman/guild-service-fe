import axios from 'axios'

const AuthService = {

    login(email, password) {
        return axios.post('login', {email, password}).then(
            res => {
                let token = res.data.accessToken;
                let user = res.data.user;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                axios.defaults.headers.common.Authorization = 'Bearer ' + token;

                return Promise.resolve(user);
            }
        );
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return axios.post('logout');
    },

    register() {

    },

    user() {
        return axios.get('user').then(
            res => {
                let user = res.data.user;
                localStorage.setItem('user', JSON.stringify(user));
                return Promise.resolve(user)
            }
        )
    },

    auth() {
        return !!localStorage.getItem('token') && !!localStorage.getItem('user');
    }

}

export default AuthService
