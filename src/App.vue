<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand href="#">Guild Service</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#" to="/">Home</b-nav-item>
                    <b-nav-item href="#" to="/guilds">Guilds</b-nav-item>
                    <b-nav-item href="#" to="/characters">Characters</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
<!--                    <b-nav-form>-->
<!--                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
<!--                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
<!--                    </b-nav-form>-->

<!--                    <b-nav-item-dropdown text="Lang" right>-->
<!--                        <b-dropdown-item href="#">EN</b-dropdown-item>-->
<!--                        <b-dropdown-item href="#">ES</b-dropdown-item>-->
<!--                        <b-dropdown-item href="#">RU</b-dropdown-item>-->
<!--                        <b-dropdown-item href="#">FA</b-dropdown-item>-->
<!--                    </b-nav-item-dropdown>-->
                    <b-nav-item-dropdown v-if="user" right>
                        <!-- Using 'button-content' slot -->
                        <template  v-slot:button-content>
                            <em id="userDropdown">{{ user.name }}</em>
                        </template>
                        <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <template v-else>
                        <b-nav-item  to="/login">Login</b-nav-item>
                        <b-nav-item  to="/register">Register</b-nav-item>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div id="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import AuthService from "@/services/AuthService";

    export default {
        mounted() {
            if(AuthService.auth()) {
                this.$store.dispatch('auth/getUser');
            }
        },

        computed: {
            ...mapGetters({ user: 'auth/user' })
        },

        methods: {
            logout() {
                this.$store.dispatch('auth/logout')
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Fira Code', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    #content {
        margin-top: 25px;
    }
</style>
