import AuthService from "@/services/AuthService";

const authenticated = next => {
    if (!AuthService.auth()) {
        next('/login');
        return
    }
    next()
}

const guest = next => {
    if (AuthService.auth()) {
        next('/');
        return
    }
    next()
}

export {
    authenticated,
    guest
}

