import Vue from 'vue'
import VueRouter from 'vue-router'
import SingleGuild from '../views/SingleGuild'
import Home from '../views/Home'
import CharacterSearch from '../views/CharacterSearch'

Vue.use(VueRouter)

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

]

const router = new VueRouter({
    routes
})

export default router
