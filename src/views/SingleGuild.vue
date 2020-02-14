<template>
    <div class="guildSearch">
        <div class="container">
            <div v-if="guild">
                <RosterList :roster="guild.roster"/>
            </div>
        </div>
    </div>
</template>

<script>
    import GuildService from '@/services/GuildService'
    import RosterList from '@/components/RosterList'

    export default {
        name: 'SingleGuild',
        components: { RosterList },

        data () {
            return {
                guild: null,
            }
        },

        mounted () {
            this.getGuild()
        },

        methods: {
            getGuild () {
                this.guild = null
                GuildService.getGuild(this.$route.params.realm, this.$route.params.name, this.$route.params.region)
                  .then(({ data }) => this.guild = data.guild)
                  .catch((e) => console.log('Error happened', e))
                  .finally(() => this.loading = false)
            }
        }

    }
</script>
