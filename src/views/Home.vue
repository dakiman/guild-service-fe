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
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <b-overlay
                        :show="guildsLoading"
                        opacity="1"
                        spinner-small
                        spinner-variant="primary"
                        bg-color="primary"
                    >
                        <b-card
                            bg-variant="primary"
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
                                    v-bind:key="guild._id"
                                    :to="{name: 'singleGuild', params: { region: guild.region, realm: guild.realm, name: guild.name }}"
                                    class="border bg-primary">
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
                            bg-variant="primary"
                            no-body
                        >
                            <template v-slot:header>
                                <h4 class="mb-0">Most Viewed Guilds</h4>
                            </template>

                            <b-list-group flush>
                                <b-list-group-item
                                    v-for="guild in this.popularGuilds.most_popular"
                                    v-bind:key="guild._id"
                                    :to="{name: 'singleGuild', params: { region: guild.region, realm: guild.realm, name: guild.name }}"
                                    class="border bg-primary">
                                        <span class="float-left">
                                            {{ guild.name | deslug }}
                                        </span>
                                    <span class="float-right">
                                            {{ guild.realm | deslug }}
                                        </span>
                                </b-list-group-item>
                            </b-list-group>

                        </b-card>

                    </b-overlay>
                </div>
                <div class="col-md-6">
                    <b-overlay
                        :show="charactersLoading"
                        opacity="1"
                        spinner-small
                        spinner-variant="primary"
                        bg-color="primary"
                    >
                        <b-card
                            bg-variant="primary"
                            no-body
                        >
                            <template v-slot:header>
                                <h4 class="mb-0">Recently Searched Characters</h4>
                            </template>

                            <b-list-group flush>
                                <b-list-group-item
                                    v-for="character in this.popularCharacters.recently_searched"
                                    v-bind:key="character._id"
                                    :to="{name: 'singleCharacter', params: { region: character.region, realm: character.realm, name: character.name }}"
                                    class="border bg-primary">
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
                            bg-variant="primary"
                            no-body
                        >
                            <template v-slot:header>
                                <h4 class="mb-0">Most Viewed Characters</h4>
                            </template>

                            <b-list-group flush>
                                <b-list-group-item
                                    v-for="character in this.popularCharacters.most_popular"
                                    v-bind:key="character._id"
                                    :to="{name: 'singleCharacter', params: { region: character.region, realm: character.realm, name: character.name }}"
                                    class="border bg-primary">
                                <span class="float-left">
                                    {{ character.name | deslug }}
                                </span>
                                    <span class="float-right">
                                    {{ character.realm | deslug }}
                                </span>
                                </b-list-group-item>
                            </b-list-group>

                        </b-card>
                    </b-overlay>
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
                guildsLoading: true,
                charactersLoading: true,
                popularGuilds: {},
                popularCharacters: {}
            }
        },
        mounted() {
            //TODO Figure out how to make calls not have to wait on each other
            this.getPopularGuilds()
            this.getPopularCharacters()
        },
        methods: {
            async getPopularGuilds() {
                let guildsRes = await GuildService.getPopularGuilds()
                this.popularGuilds = guildsRes.data;
                this.guildsLoading = false;
            },
            async getPopularCharacters() {
                let charactersRes = await CharacterService.getPopularCharacters()
                this.popularCharacters = charactersRes.data;
                this.charactersLoading = false
            }
        }
    }
</script>
