import AuthService from "@/services/AuthService";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, {email, password}) {
            return AuthService.login(email, password).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve();
                }
            );
        },
        getUser({commit}) {
            return AuthService.user().then(
                user => {
                    commit('userRetrieved', user);
                    return Promise.resolve();
                }
            )
        },
        logout({commit}) {
            AuthService.logout().then(
                () => commit('logout'),
                () => commit('logout')
            );
        },
        register({commit}, { email, password, name }) {
            return AuthService.register(email, password, name).then(
                response => {
                    commit('registerSuccess', response.data.user);
                    return Promise.resolve(response.data);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        userRetrieved(state, user) {
            state.user = user;
        }
    },
    getters: {
        user: state => state.user,
    }
};
