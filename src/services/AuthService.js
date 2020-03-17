import axios from 'axios'

const AuthService = {

    login(email, password) {
        return axios.post('login', {email, password}).then(
            response => {
                this.persistUserFromResponse(response);
                return Promise.resolve(response.data.user);
            }
        );
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return axios.post('logout');
    },

    register(email, password, name) {
        return axios.post('register', {email, password, name}).then(
            response => {
                this.persistUserFromResponse(response);
                return Promise.resolve(response);
            }
        )
    },

    user() {
        return axios.get('user').then(
            response => {
                let user = response.data.user;
                localStorage.setItem('user', JSON.stringify(user));
                return Promise.resolve(user)
            }
        )
    },

    auth() {
        return !!localStorage.getItem('token') && !!localStorage.getItem('user');
    },

    persistUserFromResponse(response) {
        let token = response.data.accessToken;
        let user = response.data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    }

}

export default AuthService
