<template>
    <div class="blizzardOauth">
        {{ status }}
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

        data() {
            return {
                status: 'Syncing with our database...',
            }
        },

        methods: {
            authorize() {
                let code = this.$route.query.code;
                let region = this.$route.query.locale;
                let redirectUri = process.env.VUE_APP_REDIRECT_URL + '?locale=' + region;
                console.log(redirectUri);
                axios.post(`/${region}/blizzard-oauth`, {code, redirectUri})
                    .then(res => {
                        this.status = `Retrieved ${res.data.message} characters.`
                        this.$router.push('/profile');
                    })
                    .catch(err => {
                        this.status = `Failed to retrieve Blizzard Data! Try again later...`
                    })

            }
        }
    }
</script>
