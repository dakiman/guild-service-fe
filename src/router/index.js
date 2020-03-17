import VueRouter from 'vue-router'
import SingleGuild from '../views/SingleGuild'
import Home from '../views/Home'
import CharacterSearch from '../views/CharacterSearch'
import SingleCharacter from '@/views/SingleCharacter'
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Register from "@/views/Register";
import {authenticated, guest} from '@/router/middleware';


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/guilds',
        name: 'guildSearch',
        component: () => import('../views/GuildSearch.vue')
    },
    {
        path: '/guilds/:region/:realm/:name',
        name: 'singleGuild',
        component: SingleGuild
    },
    {
        path: '/characters',
        name: 'characterSearch',
        component: CharacterSearch
    },
    {
        path: '/characters/:region/:realm/:name',
        name: 'singleCharacter',
        component: SingleCharacter
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { guest: true }
    },

]

const router = new VueRouter({
    routes
})

/*TODO Fix middleware functions and next() calls, they work but the code is ugly*/
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        authenticated(next)
    } else if(to.meta.guest) {
        guest(next)
    } else {
        next()
    }
})



export default router
