<template>
    <div class="guildSearch">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <b-form @submit="getGuild">
                        <b-form-group
                                label="Realm"
                                label-for="realm" >
                            <b-form-input
                                    id="realm"
                                    v-model="form.realm" />
                        </b-form-group>
                        <b-form-group
                                label="Guild Name"
                                label-for="guildName" >
                            <b-form-input
                                    id="guildName"
                                    v-model="form.guildName" />
                        </b-form-group>
                        <b-form-group
                                label="Region"
                                label-for="region" >
                            <b-form-select
                                    :options="regions"
                                    id="region"
                                    v-model="form.region" />
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
                                            key="primary" />
                                </div>
                            </b-button>
                        </b-form-group>
                    </b-form>
                </div>
                <div class="col offset-md-1"
                     v-if="guild">
                    <b-card
                            :border-variant="factionColor"
                            :header-bg-variant="factionColor"
                            header-text-variant="white"
                            align="left">

                        <template v-slot:header>
                            <span class="float-left h4">{{ guild.name }}</span>
                            <img class="img-fluid m-1" style="width: 4%; height: 4%;" :src="factionLogo" alt="">
                            <span class="float-right">{{ guild.realm }}</span>
                        </template>

                        <div>
                            Members: {{ guild.memberCount }} <br>
                            Achievement Points: {{ guild.achievementPoints }} <br>
                            Created at: {{ guildCreationDate }}
                            <b-button class="mt-2 p-1"
                                          @click="$router.push({name: 'singleGuild', params: { region: form.region, realm: form.realm, name: form.guildName }})"
                                      :variant="factionColor"
                                      block>
                                See more
                            </b-button>
                        </div>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GuildService from '@/services/GuildService'

    export default {
        name: 'GuildSearch',

        data () {
            return {
                form: {
                    region: 'EU',
                    guildName: 'starlight',
                    realm: 'the maelstrom'
                },
                guild: null,
                regions: ['EU', 'US', 'CH', 'AU'],
                loading: false,
            }
        },

        computed: {
            factionColor: function () {
                if (this.guild.faction.toLowerCase().includes('alliance')) {
                    return 'alliance'
                }
                return 'horde'
            },
            guildCreationDate: function () {
                return new Date(this.guild.created).toDateString()
            },
            factionLogo: function () {
                return require('@/assets/' + this.factionColor + '-logo.png')
            }
        },

        methods: {
            getGuild () {
                this.guild = null
                this.loading = true
                GuildService.getGuildBasic(this.form.realm, this.form.guildName, this.form.region)
                  .then(({ data }) => this.guild = data.guild)
                  .catch((e) => console.log('Error happened', e))
                  .finally(() => this.loading = false)
            }
        }

    }
</script>

<style>
    .parent {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .child {
        display: flex;
        align-items: center;
    }
</style>
