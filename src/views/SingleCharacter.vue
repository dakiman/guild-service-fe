<template>
    <div class="singleCharacter">
        <b-container v-if="character">
            <b-row class="bg-primary">
                <b-col md="3" class="p-3">
                    <img class :src="character.media.inset" alt/>
                </b-col>
                <b-col md="9">
                    <div class="float-md-left pt-3">
                        <b-row>
                            <b-col>
                                <span style="font-size: 24px;">{{character.name | deslug }}</span>
                                <br>
                                <router-link
                                    class="text-muted"
                                    v-if="character.basic.guild"
                                    :to="{name: 'singleGuild', params: { region: character.region, realm: character.basic.guild.realm, name: character.basic.guild.name }}">
                                    <{{character.basic.guild.name | deslug }}>
                                </router-link>
                                <br>
                                <span style="font-size: 18px;" class="text-light">{{character.realm | deslug}}</span>
                            </b-col>
                        </b-row>
                        <b-row class>
                            <b-col>
                                <span>Level {{character.basic.level}}</span>
                                &nbsp
                                <span
                                    :style="{ color: getClassColor(character.basic.class)}"
                                >{{getClass(character.basic.class)}}</span>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
            <b-row class="bg-primary">
                <b-col md="6">
                    <div class="mb-3">
                        <b-card
                            header-text-variant="white"
                            align="left">
                            <template v-slot:header>
                                <span class="float-left">Gear</span>
                                <b-badge
                                    pill
                                    variant="primary"
                                    class="float-right"
                                >iLvl: {{character.basic.average_item_level}} ({{character.basic.equipped_item_level}})
                                </b-badge>
                            </template>
                            <wowhead-link v-for="item in character.equipment" :key="item.id"
                                          :item-id="item.id"
                                          :item-level="item.itemLevel"
                                          :quality="item.quality"
                            />
                        </b-card>
                    </div>
                </b-col>
                <b-col md="6">
                    <div class="mb-3">
                        <b-card
                            header-text-variant="white"
                            align="center">
                            <template v-slot:header>
                                <span class="float-left">Spec</span>
                                <b-badge
                                    pill
                                    variant="primary"
                                    class="float-right"
                                >{{ character.specialization.activeSpecialization }}
                                </b-badge>
                            </template>

                            <wowhead-link class="mx-3"
                                          v-for="talent in character.specialization.talents"
                                          :spell-id="talent.id"
                                          :additional-data="getTalentRowLevel(talent.row)"
                                          :key="talent.id"/>
                        </b-card>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import CharacterService from "@/services/CharacterService";
    import {getClass, getClassColor, itemQualityToId, getTalentRowLevel} from "@/modules/staticData";
    import WowheadLink from "@/components/WowheadLink";

    export default {
        name: "SingleCharacter",
        components: {WowheadLink},

        data() {
            return {
                character: null,
            };
        },

        async mounted() {
            await this.getCharacter();
            $WowheadPower.refreshLinks()
        },

        methods: {
            getClass,
            getClassColor,
            itemQualityToId,
            getTalentRowLevel,
            async getCharacter() {
                this.character = null;
                this.loading = true;

                let res = await CharacterService.getCharacter(
                    this.$route.params.realm,
                    this.$route.params.name,
                    this.$route.params.region
                )
                this.character = res.data.character
            },
        }
    };
</script>
