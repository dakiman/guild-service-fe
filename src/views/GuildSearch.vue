<template>
    <div class="guildSearch">
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <b-form @submit="getGuild">
                        <b-form-group label="Realm" label-for="realm">
                            <b-form-input id="realm" v-model="form.realm"/>
                        </b-form-group>
                        <b-form-group label="Region" label-for="region">
                            <b-form-select id="region" v-model="form.region" :options="regions"/>
                        </b-form-group>
                        <b-form-group label="Guild Name" label-for="guildName">
                            <b-form-input id="guildName" v-model="form.guildName"/>
                        </b-form-group>
                        <b-form-group>
                            <b-button type="submit" variant="primary" block>Find guild</b-button>
                        </b-form-group>
                    </b-form>
                    {{ guild }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GuildSearch',
  components: {},
  data () {
    return {
      form: {
        region: null,
        guildName: null,
        realm: null
      },
      guild: null,
      regions: [
        'EU', 'US', 'CH', 'AU'
      ],
      realms: ['The Maelstrom']
    }
  },
  methods: {
    getGuild () {
      axios.get(`http://127.0.0.1:8000/api/guild/${this.form.realm.toLowerCase().replace(' ', '-')}/${this.form.guildName}`)
        .then(({ data }) => {
          this.guild = data.guild
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
