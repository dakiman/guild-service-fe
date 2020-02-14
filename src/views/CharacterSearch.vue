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
                        <b-form-group
                                label="Region"
                                label-for="region">
                            <b-form-select
                                    :options="regions"
                                    id="region"
                                    v-model="form.region"/>
                        </b-form-group>
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
<!--                    {{ character }}-->
                    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
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
                                        Ello
                                    </b-card-text>
                                </b-card-body>
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

    export default {
        name: 'CharacterSearch',

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

        methods: {
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
            }
        }
    }
</script>
