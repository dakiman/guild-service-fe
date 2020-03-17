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
        register({commit}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
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
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        userRetrieved(state, user) {
            state.user = user;
        }
    },
    getters: {
        user: state => state.user,
    }
};
