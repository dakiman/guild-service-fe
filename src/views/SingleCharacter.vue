<template>
    <div class="singleCharacter">
        <b-container v-if="character">
            <b-row class="bg-primary">
                <b-col md="3" class="p-3">
                    <img class=""
                         :src="character.media.bust"
                         alt="">
                </b-col>
                <b-col md="9">
                    <div class="float-md-left pt-3">
                        <b-row>
                            <b-col>
                                <span style="font-size: 24px;">
                                    {{character.name}}
                                </span>
                                <div v-if="character.guild">
                                    <span>
                                        <{{character.guild.name}}>
                                    </span>
                                </div>
                                <span style="font-size: 18px;" class="text-light">
                                    {{character.realm}}
                                </span>
                            </b-col>
                        </b-row>
                        <b-row class="">
                            <b-col>
                                <span>Level {{character.level}}</span>
                                &nbsp
                                <span :style="{ color: getClassColor(character.class)}">{{getClass(character.class)}}</span>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
            <b-row class="bg-primary">
                <b-col md="6">
                    <div class="mb-3">
                        <b-card
                                :border-variant="primary"
                                :header-bg-variant="primary"
                                header-text-variant="white"

                                align="left">

                            <template v-slot:header>
                                <span class="float-left h6">Gear</span>
                            </template>
                            <div>
                                iLvl {{character.averageItemLevel}} ({{character.equippedItemLevel}})
                            </div>
                        </b-card>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import CharacterService from '@/services/CharacterService'
    import { getClass, getClassColor } from '@/modules/staticData'

    export default {
        name: 'SingleCharacter',

        data () {
            return {
                character: null,
                raidingData: null,
            }
        },

        mounted () {
            this.getCharacter()
        },

        methods: {
            getClass,
            getClassColor,
            getCharacter () {
                this.character = null
                this.loading = true
                CharacterService.getCharacter(this.$route.params.realm, this.$route.params.name, this.$route.params.region)
                  .then(({ data }) => this.character = data.character)
                  .catch(e => console.log('Error happened', e))
                // .finally(() => this.loading = false)
            },
            getRaidingData () {
                this.character.raiderio = null
                CharacterService.getCharacterRaiderioData(this.$route.params.realm, this.$route.params.name, this.$route.params.region)
                  .then(({ data }) => {
                      this.character.raiderio = data.raiderio
                  })
                  .catch(e => console.log('Error happened', e))
                // .finally(() => this.loading = false)
            }
        }
    }
</script>
