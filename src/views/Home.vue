<template>
    <div class="home">
        <!--        <div class="container-fluid">-->

        <!--            <div class="row">-->
        <!--                <div class="col-md-8 offset-md-2 xs-auto">-->
        <!--                    <b-form>-->
        <!--                        <div class="row my-2 mx-1">-->
        <!--                            <div class="col-md-6 p-2" :class="[this.form.lookupMode === 'character' ? 'bg-primary' : '']">-->
        <!--                                Characters-->
        <!--                                    <b-form-radio class="float-right" v-model="form.lookupMode" name="lookupMode"-->

        <!--                                                  value="character">-->
        <!--                                    </b-form-radio>-->
        <!--                            </div>-->
        <!--                            <div class="col-md-6 p-2" :class="[this.form.lookupMode === 'guild' ? 'bg-primary' : '']">-->
        <!--                                Guild-->
        <!--                                    <b-form-radio class="float-left" v-model="form.lookupMode" name="lookupMode"-->
        <!--                                                  value="guild">-->
        <!--                                    </b-form-radio>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <b-form-group>-->
        <!--                            <div class="row">-->
        <!--                                <div class="col-md-2">-->
        <!--                                    <region-dropdown-->
        <!--                                        :defaultRegion="this.form.region"-->
        <!--                                        @change="region => this.form.region = region"/>-->
        <!--                                </div>-->
        <!--                                <div class="col-md">-->
        <!--                                    <b-form-input-->
        <!--                                        id="name"-->
        <!--                                        v-model="form.name"/>-->
        <!--                                </div>-->
        <!--                                <div class="col-md-3">-->
        <!--                                    <b-form-input-->
        <!--                                        id="realm"-->
        <!--                                        v-model="form.realm"/>-->
        <!--                                </div>-->
        <!--                            </div>-->
        <!--                        </b-form-group>-->
        <!--                        <b-form-group class="mt-2">-->
        <!--                            <b-button-->
        <!--                                id="look"-->
        <!--                                block-->
        <!--                                type="button"-->
        <!--                                @click="getName"-->
        <!--                                variant="primary">-->
        <!--                                <template v-if="!loading">Find Name</template>-->
        <!--                                <template v-else>-->
        <!--                                    <b-spinner-->
        <!--                                        variant="primary"-->
        <!--                                        key="primary"/>-->
        <!--                                </template>-->
        <!--                            </b-button>-->
        <!--                        </b-form-group>-->
        <!--                    </b-form>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <b-card
                        no-body
                    >
                        <template v-slot:header>
                            <h4 class="mb-0">Recently Searched Guilds</h4>
                        </template>

                        <!--                        <b-card-body>-->
                        <!--                            <b-card-title>Card Title</b-card-title>-->
                        <!--                            <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>-->
                        <!--                            <b-card-text>-->
                        <!--                                Some quick example text to build on the card title and make up the bulk of the card's-->
                        <!--                                content.-->
                        <!--                            </b-card-text>-->
                        <!--                        </b-card-body>-->

                        <b-list-group flush>
                            <b-list-group-item
                                v-for="guild in this.popularGuilds.recently_searched"
                                :to="{name: 'singleGuild', params: { region: guild.region, realm: guild.realm, name: guild.name }}"
                                class="border">
                                <span class="float-left">
                                    {{ guild.name | deslug }}
                                </span>
                                <span class="float-right">
                                    {{ guild.realm | deslug }}
                                </span>
                            </b-list-group-item>
                        </b-list-group>

<!--                        <b-card-body>-->
<!--                            <a href="#" class="card-link">Card link</a>-->
<!--                            <a href="#" class="card-link">Another link</a>-->
<!--                        </b-card-body>-->

<!--                        <b-card-footer>This is a footer</b-card-footer>-->
                    </b-card>
                    <b-card
                        class="mt-3"
                        no-body
                    >
                        <template v-slot:header>
                            <h4 class="mb-0">Most Viewed Characters</h4>
                        </template>

                        <b-list-group flush>
                            <b-list-group-item
                                v-for="guild in this.popularGuilds.most_popular"
                                :to="{name: 'singleGuild', params: { region: guild.region, realm: guild.realm, name: guild.name }}"
                                class="border">
                                <span class="float-left">
                                    {{ guild.name | deslug }}
                                </span>
                                <span class="float-right">
                                    {{ guild.realm | deslug }}
                                </span>
                            </b-list-group-item>
                        </b-list-group>

                    </b-card>
                </div>
                <div class="col-6">
                    <b-card
                        no-body
                    >
                        <template v-slot:header>
                            <h4 class="mb-0">Recently Searched Characters</h4>
                        </template>

                        <b-list-group flush>
                            <b-list-group-item
                                v-for="character in this.popularCharacters.recently_searched"
                                :to="{name: 'singleCharacter', params: { region: character.region, realm: character.realm, name: character.name }}"
                                class="border">
                                <span class="float-left">
                                    {{ character.name | deslug }}
                                </span>
                                <span class="float-right">
                                    {{ character.realm | deslug }}
                                </span>
                            </b-list-group-item>
                        </b-list-group>

                    </b-card>
                    <b-card
                        class="mt-3"
                        no-body
                    >
                        <template v-slot:header>
                            <h4 class="mb-0">Most Viewed</h4>
                        </template>

                        <b-list-group flush>
                            <b-list-group-item
                                v-for="character in this.popularCharacters.most_popular"
                                :to="{name: 'singleCharacter', params: { region: character.region, realm: character.realm, name: character.name }}"
                                class="border">
                                <span class="float-left">
                                    {{ character.name | deslug }}
                                </span>
                                <span class="float-right">
                                    {{ character.realm | deslug }}
                                </span>
                            </b-list-group-item>
                        </b-list-group>

                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GuildService from "@/services/GuildService";
    import CharacterService from "@/services/CharacterService";

    export default {
        name: 'home',
        data() {
            return {
                popularGuilds: {},
                popularCharacters: {}
            }
        },
        mounted() {
            GuildService.getPopularGuilds()
                .then(({data}) => {
                    console.log(data);
                    this.popularGuilds = data;
                })
            CharacterService.getPopularCharacters()
                .then(({data}) => {
                    console.log(data);
                    this.popularCharacters = data;
                })
        }
    }
</script>
