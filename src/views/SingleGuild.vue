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

        data() {
            return {
                guild: null,
            }
        },

        mounted () {
            this.getGuild();
        },

        computed: {
            factionColor: function () {
                if (this.guild.faction.toLowerCase().includes('alliance'))
                    return 'alliance'
                return 'horde'
            },
            guildCreationDate: function () {
                return new Date(this.guild.created).toDateString();
            }
        },

        methods: {
            getGuild() {
                this.guild = null
                this.loading = true
                GuildService.getGuildFull(this.$route.params.realm, this.$route.params.name, this.$route.params.region)
                    .then(({data}) => this.guild = data.guild)
                    .catch((e) => console.log('Error happened', e))
                    .finally(() => this.loading = false)
            }
        }

    }
</script>
