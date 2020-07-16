<template>
    <div class="profile">
        <br>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-5 offset-md-1 justify-content-center">
                    <div class="row" v-if="!user.bnet_id">
                        <region-dropdown
                            @change="region => this.region = region"/>
                        <a :href="oauthUrl">Login with Blizzard</a>
                    </div>
                    <div class="row" v-else>
                        <div class="col p-0">
                            <b-card
                                header="Battle.net Details"
                                :footer="'Last sync: ' + user.bnet_sync_at"
                                footer-tag="footer"
                                :title="user.bnet_tag + ' (' + user.bnet_region.toUpperCase() + ')'"
                            >
                                <b-card-text>

                                </b-card-text>
                                <div class="row">
                                    <div class="col">
                                        <region-dropdown
                                            :selected="user.bnet_region"
                                            @change="region => this.region = region"/>
                                    </div>
                                    <div class="col">
                                        <b-button
                                            :href="oauthUrl"
                                            variant="primary">
                                            Re-Sync data
                                        </b-button>
                                    </div>
                                </div>
                            </b-card>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col p-0">
                            <b-list-group>
                                <b-list-group-item
                                    class="mt-1"
                                    v-for="character in user.characters"
                                    :key="character.id"
                                >
                                    <router-link
                                        class="float-left"
                                        :to="{ name: 'singleCharacter', params: { region: character.region, realm: character.realm, name: character.name } }"
                                        :style="{ color: getClassColor(character.character_data.character_class.id) }">
                                        {{character.character_data.name }}
                                    </router-link>
                                    <span class="float-left ml-2">({{ character.character_data.level }})</span>
                                    <span class="float-right">
                                        {{character.character_data.realm.name}}
                                    </span>
                                    <br>
                                    <div style="min-height: 20px;">
                                        <router-link
                                            class="float-left" v-if="character.character_data.guild"
                                            :to="{name: 'singleGuild', params: { region: character.region, realm: character.character_data.guild.realm.slug, name: character.character_data.guild.name }}">
                                            <{{character.character_data.guild.name}}>
                                        </router-link>
                                        <span class="float-right">
                                            LF Guild
                                            <b-form-checkbox
                                                :checked="character.recruitment"
                                                @change="toggleRecruitment(character)"
                                                class="d-inline"
                                                switch/>
                                        </span>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import RegionDropdown from "@/components/RegionDropdown";
    import {getClassColor} from '@/modules/staticData'
    import CharacterService from "@/services/CharacterService";

    export default {
        name: 'profile',
        components: {RegionDropdown},

        data() {
            return {
                region: '',
            }
        },

        methods: {
            getClassColor,
            toggleRecruitment(character) {
                CharacterService.toggleRecruitment(character.id)
                    .then(res => {
                        character.recruitment = !character.recruitment;
                    })
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
            },
            oauthUrl() {
                return `https://${this.region}.battle.net/oauth/authorize?response_type=code&client_id=${this.blizzardCode}&redirect_uri=${this.redirectUri}&scope=openid wow.profile&state=init`;
            }
        }
    }
</script>
