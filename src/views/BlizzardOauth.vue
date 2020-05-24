<template>
    <div class="blizzardOauth">
        Your account details have been retrieved...
        <br>
        Syncing with our database...
        <br>
        <b-spinner label="Spinning"></b-spinner>
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
                let region = this.$route.query.locale;
                let redirectUri = process.env.VUE_APP_REDIRECT_URL + '?locale=' + region;

                axios.post(`/${region}/blizzard-oauth`, {code, redirectUri}).then(
                    res => {
                        this.$router.push('/profile');
                    }
                )
            }
        }
    }
</script>
