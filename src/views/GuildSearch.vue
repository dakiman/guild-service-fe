<template>
    <div class="guildSearch">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <b-form>
                        <b-form-group
                                label="Realm"
                                label-for="realm">
                            <b-form-input
                                    id="realm"
                                    v-model="form.realm"/>
                        </b-form-group>

                        <b-form-group
                                label="Guild Name"
                                label-for="guildName">
                            <b-form-input
                                    id="guildName"
                                    v-model="form.guildName"/>
                        </b-form-group>
                        <region-dropdown
                                :defaultRegion="this.form.region"
                                @change="region => this.form.region = region"/>
                        <b-form-group>
                            <b-button
                                    id="findGuildButton"
                                    block
                                    @click="getGuild"
                                    type="button"
                                    variant="primary">
                                <template v-if="!loading">Find guild</template>
                                <template v-else>
                                    <b-spinner
                                            variant="primary"
                                            key="primary"/>
                                </template>
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
                            <img class="img-fluid ml-1" :src="factionLogo" alt="">
                            <span class="float-right">{{ guild.realm }}</span>
                        </template>

                        <div>
                            Members: {{ guild.basic.member_count }} <br>
                            Achievement Points: {{ guild.basic.achievement_points }} <br>
                            Created at: {{ new Date(guild.basic.created_timestamp).toDateString() }}
                            <b-button class="mt-2 p-1"
                                      id="seeMoreGuildButton"
                                      type="button"
                                      :to="{name: 'singleGuild', params: { region: form.region, realm: form.realm, name: form.guildName }}"
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
    import RegionDropdown from '@/components/RegionDropdown'

    export default {
        name: 'GuildSearch',
        components: { RegionDropdown },

        data () {
            return {
                form: {
                    region: 'EU',
                    guildName: 'starlight',
                    realm: 'the maelstrom'
                },
                guild: null,
                loading: false,
            }
        },

        computed: {
            factionColor: function () {
                if (this.guild.basic.faction.toLowerCase().includes('alliance')) {
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
            async getGuild () {
                this.guild = null
                this.loading = true

                let res = await GuildService.getGuild(this.form.realm, this.form.guildName, this.form.region)

                this.guild = res.data.guild
                this.loading = false
            },
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
