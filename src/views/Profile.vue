<template>
    <div class="profile">
        Hi {{ user }}
        <br>
        <div class="container">
            <div class="row">
                <div class="col-md-5 offset-md-1">

                    <region-dropdown
                        @change="region => this.region = region"/>
                    <a  :href="'https://'+ region +'.battle.net/oauth/authorize?response_type=code&client_id='+blizzardCode+'&redirect_uri='+redirectUri+'&scope=openid wow.profile&state=init'">Login with Blizzard</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    import {mapGetters} from "vuex";
    import RegionDropdown from "@/components/RegionDropdown";

    export default {
        name: 'profile',
        components: { RegionDropdown },

        data() {
            return {
                region: '',
            }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user'
            }),
            blizzardCode() {
                return process.env.VUE_APP_BLIZZARD_CLIENT_ID;
            },
            redirectUri() {
                return process.env.VUE_APP_REDIRECT_URL + '?locale=' + this.region;
            }
        }
    }
</script>
