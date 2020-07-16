<template>
    <div class="guildSearch">
        <div class="container-fluid">
            <div class="row" v-if="guild">
                <div class="col-md-4 offset-md-1">
                    <div>
                        <RosterList :roster="guild.roster.members" :region="this.$route.params.region"/>
                    </div>
                </div>
            </div>
            <div v-else>
                {{ status }}
                <b-spinner v-if="loading" label="Spinning"></b-spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import GuildService from '@/services/GuildService'
    import RosterList from '@/components/RosterList'

    export default {
        name: 'SingleGuild',
        components: {RosterList},

        data() {
            return {
                guild: null,
                status: 'Retrieving guild details...',
                loading: true
            }
        },

        mounted() {
            this.getGuild()
        },

        methods: {
            getGuild() {
                this.guild = null
                GuildService.getGuild(this.$route.params.realm, this.$route.params.name, this.$route.params.region)
                    .then(({data}) => this.guild = data.guild.guild_data)
                    .catch((e) => {
                        this.status = 'Guild retrieval failed. Try again and contact us if this persists.'
                        this.loading = false;
                        console.log('Error happened', e)
                    })
            }
        }

    }
</script>
