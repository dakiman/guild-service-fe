import axios from 'axios'

const GuildService = {

    getGuildFull(realm, guild, region) {
        return axios.get(`guild/${realm}/${guild}/full?locale=${region}`)
    },

    getGuildBasic(realm, guild, region) {
        return axios.get(`guild/${realm}/${guild}/basic?locale=${region}`)
    }
}

export default GuildService
