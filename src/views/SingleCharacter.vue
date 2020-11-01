<template>
  <div class="singleCharacter">
    <b-container v-if="character">
      <b-row class="bg-primary">
        <b-col md="3" class="p-3">
          <img class :src="character.blizzard_data.media.inset" alt />
        </b-col>
        <b-col md="9">
          <div class="float-md-left pt-3">
            <b-row>
              <b-col>
                <span style="font-size: 24px;">{{character.name | deslug }}</span>
                <div v-if="character.blizzard_data.basic.guild">
                  <span><{{character.blizzard_data.basic.guild.name | deslug }}></span>
                </div>
                <span style="font-size: 18px;" class="text-light">{{character.realm | deslug}}</span>
              </b-col>
            </b-row>
            <b-row class>
              <b-col>
                <span>Level {{character.blizzard_data.basic.level}}</span>
                &nbsp
                <span
                  :style="{ color: getClassColor(character.blizzard_data.basic.class)}"
                >{{getClass(character.blizzard_data.basic.class)}}</span>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="bg-primary">
        <b-col md="6">
          <div class="mb-3">
            <b-card header-text-variant="white" align="left">
              <template v-slot:header>
                <span class="float-left">Gear</span>
                <b-badge
                  pill
                  variant="primary"
                  class="float-right"
                >iLvl: {{character.blizzard_data.basic.average_item_level}} ({{character.blizzard_data.basic.equipped_item_level}})</b-badge>
              </template>

              <div class="d-inline" v-for="item in character.blizzard_data.equipment" :key="item.id">
                <item-link :item="item" />
              </div>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CharacterService from "@/services/CharacterService";
import { getClass, getClassColor, itemQualityToId } from "@/modules/staticData";
import ItemLink from "@/components/ItemLink";

export default {
  name: "SingleCharacter",
  components: { ItemLink },

  data() {
    return {
      character: null,
      raidingData: null
    };
  },

  mounted() {
    this.getCharacter();
  },

  methods: {
    getClass,
    getClassColor,
    itemQualityToId,
    getCharacter() {
      this.character = null;
      this.loading = true;
      CharacterService.getCharacter(
        this.$route.params.realm,
        this.$route.params.name,
        this.$route.params.region
      )
        .then(({ data }) => (this.character = data.character))
        .catch(e => console.log("Error happened", e))
        .finally(() => $WowheadPower.refreshLinks());
    },
    getRaidingData() {
      this.character.raiderio = null;
      CharacterService.getCharacterRaiderioData(
        this.$route.params.realm,
        this.$route.params.name,
        this.$route.params.region
      )
        .then(({ data }) => {
          this.character.raiderio = data.raiderio;
        })
        .catch(e => console.log("Error happened", e));
      // .finally(() => this.loading = false)
    }
  }
};
</script>
