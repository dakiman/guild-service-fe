<template>
    <div class="characterSearch">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <b-form @submit="getCharacter">
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
                                    block
                                    type="submit"
                                    variant="primary">
                                <div v-if="!loading">Find Character</div>
                                <div v-else>
                                    <b-spinner
                                            variant="primary"
                                            key="primary"/>
                                </div>
                            </b-button>
                        </b-form-group>
                    </b-form>
                </div>
                <div class="col offset-md-1"
                     v-if="character">
                    <b-card :variant="factionColor" no-body class="overflow-hidden" style="max-width: 540px;">
                        <b-row no-gutters>
                            <b-col md="3">
                                <img class="m-2 mt-3"
                                     style="border-radius: 50%;"
                                     :src="character.media.avatar"
                                     alt="">
                            </b-col>
                            <b-col md="9">
                                <b-card-body :title="character.name" :sub-title="character.realm">
                                    <b-card-text>
                                        Level {{character.level}}
                                        <span :style="{ color: getClassColor(character.class) }">
                                            {{ getClass(character.class) }}
                                        </span>
                                    </b-card-text>
                                </b-card-body>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button class="mx-auto" :variant="factionColor" block @click="getRaidingData">Get RAIDERIO
                                    data
                                </b-button>
                                <div v-if="character.raiderio">
                                    {{character.raiderio}}
                                </div>
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
    import { getClass, getClassColor } from '@/modules/staticData'

    export default {
        name: 'CharacterSearch',
        components: { RegionDropdown },

        data () {
            return {
                form: {
                    region: 'EU',
                    character: 'sernaos',
                    realm: 'the maelstrom'
                },
                character: null,
                regions: ['EU', 'US', 'CH', 'AU'],
                loading: false,
            }
        },

        computed: {
            factionColor: function () {
                if (this.character.faction.toLowerCase().includes('alliance')) {
                    return 'alliance'
                }
                return 'horde'
            },
        },

        methods: {
            getClass,
            getClassColor,
            getCharacter () {
                this.character = null
                this.loading = true
                CharacterService.getCharacter(
                  this.form.realm,
                  this.form.character,
                  this.form.region
                )
                  .then(({ data }) => this.character = data.character)
                  .catch(e => console.log('Error happened', e))
                  .finally(() => this.loading = false)
            },
            getRaidingData () {
                this.character.raiderio = null
                CharacterService.getCharacterRaiderioData(
                  this.form.realm,
                  this.form.character,
                  this.form.region
                )
                  .then(({ data }) => {
                      this.character.raiderio = data.raiderio
                      // this.$root.$emit('bv::toggle::collapse', 'raiderio-collapse')
                  })
                  .catch(e => console.log('Error happened', e))
                  .finally(() => this.loading = false)
            }
        }
    }
</script>
