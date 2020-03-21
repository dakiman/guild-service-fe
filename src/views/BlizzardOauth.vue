<template>
    <div class="blizzardOauth">
        Oauthed!
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'blizzardOauth',

        mounted() {
            this.authorize();
        },

        methods: {
            authorize() {
                let code = this.$route.query.code;
                let locale = this.$route.query.locale;
                let redirectUri = process.env.VUE_APP_REDIRECT_URL + '?locale=' + locale;

                axios.post('/blizzard-oauth?locale=' + locale, {code, redirectUri}).then(
                    res => {
                        this.$router.push('/profile');
                    }
                )
            }
        }
    }
</script>
