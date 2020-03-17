import AuthService from "@/services/AuthService";

const authenticated = next => {
    if (!AuthService.auth()) {
        console.log('returning to login')
        next('/login')
        return
    }
    next()
}

const guest = next => {
    if (AuthService.auth()) {
        console.log('returning to home')
        next('/')
        return
    }
    next()
}

export {
    authenticated,
    guest
}

