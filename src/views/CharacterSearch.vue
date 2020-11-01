<template>
    <div class="characterSearch">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <b-form >
                        <b-form-group label="Realm" label-for="realm">
                            <b-form-input
                                id="realm"
                                v-model="form.realm"/>
                        </b-form-group>
                        <b-form-group label="Character" label-for="character">
                            <b-form-input
                                id="character"
                                v-model="form.character"/>
                        </b-form-group>
                        <region-dropdown
                            :defaultRegion="this.form.region"
                            @change="region => this.form.region = region"/>
                        <b-form-group>
                            <b-button
                                    id="findCharacterButton"
                                    block
                                    type="button"
                                    @click="getCharacter"
                                    variant="primary">
                                <template v-if="!loading">Find Character</template>
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
                     v-if="character"
                     id="characterContainer">
                    <b-card :variant="factionColor" no-body class="overflow-hidden" style="max-width: 540px;">
                        <b-row no-gutters>
                            <b-col md="3">
                                <img class="m-2 mt-3"
                                     style="border-radius: 50%;"
                                     :src="character.blizzard_data.media.avatar"
                                     alt="">
                            </b-col>
                            <b-col md="9">
                                <b-card-body :title="character.name" :sub-title="character.realm">
                                    <b-card-text>
                                        Level {{character.level}}
                                        <span :style="{ color: getClassColor(character.blizzard_data.basic.class) }">
                                            {{ getClass(character.blizzard_data.basic.class) }}
                                        </span>
                                    </b-card-text>
                                </b-card-body>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button
                                    id="seeMoreCharacterButton"
                                    type="button"
                                    :to="{name: 'singleCharacter', params: { region: form.region, realm: form.realm, name: form.character }}">
                                    See more
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CharacterService from '../services/CharacterService'
    import RegionDropdown from '@/components/RegionDropdown'
    import {getClass, getClassColor} from '@/modules/staticData'

    export default {
        name: 'CharacterSearch',
        components: {RegionDropdown},

        data() {
            return {
                form: {
                    region: null,
                    character: 'sernaos',
                    realm: 'the maelstrom'
                },
                character: null,
                // regions: ['EU', 'US', 'CH', 'AU'],
                loading: false,
            }
        },

        computed: {
            factionColor: function () {
                if (this.character.blizzard_data.basic.faction.toLowerCase().includes('alliance')) {
                    return 'alliance'
                }
                return 'horde'
            },
        },

        methods: {
            getClass,
            getClassColor,
            getCharacter() {
                this.character = null
                this.loading = true
                CharacterService.getCharacter(
                    this.form.realm,
                    this.form.character,
                    this.form.region
                )
                    .then(({data}) => this.character = data.character)
                    .catch(e => console.log('Error happened', e))
                    .finally(() => this.loading = false)
            },
        }
    }
</script>
