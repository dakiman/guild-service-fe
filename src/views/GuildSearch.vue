<template>
    <div class="guildSearch">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <b-form @submit="getGuild">
                        <b-form-group
                                label="Realm"
                                label-for="realm"
                        >
                            <b-form-input
                                    id="realm"
                                    v-model="form.realm"
                            />
                        </b-form-group>
                        <b-form-group
                                label="Region"
                                label-for="region"
                        >
                            <b-form-select
                                    :options="regions"
                                    id="region"
                                    v-model="form.region"
                            />
                        </b-form-group>
                        <b-form-group
                                label="Guild Name"
                                label-for="guildName"
                        >
                            <b-form-input
                                    id="guildName"
                                    v-model="form.guildName"
                            />
                        </b-form-group>
                        <b-form-group>
                            <b-button
                                    block
                                    type="submit"
                                    variant="primary">
                                <div v-if="!loading">Find guild</div>
                                <div v-else>
                                    <b-spinner
                                            variant="primary"
                                            key="primary"
                                    />
                                </div>
                            </b-button>
                        </b-form-group>
                    </b-form>
                </div>
                <div class="col offset-md-1" v-if="guild != null">
                    <roster-list :roster="guild.roster"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GuildService from '@/services/GuildService'
    import RosterList from '@/components/RosterList'

    export default {
        name: 'GuildSearch',

        components: {
            RosterList
        },

        data () {
            return {
                form: {
                    region: null,
                    guildName: null,
                    realm: null
                },
                guild: null,
                regions: ['EU', 'US', 'CH', 'AU'],
                realms: ['The Maelstrom'],
                loading: false,
                filteredRoster: null,
            }
        },

        methods: {
            getGuild () {
                this.guild = null
                this.loading = true
                GuildService.getGuild(this.form.realm, this.form.guildName, this.form.region)
                  .then(({ data }) => this.guild = data.guild)
                  .catch((e) => console.log('Error happened', e))
                  .finally(() => this.loading = false)
            },
        }
    }
</script>
