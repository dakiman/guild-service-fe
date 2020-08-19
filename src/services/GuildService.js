import axios from 'axios'

const GuildService = {

    getGuild (realm, guild, region) {
        return axios.get(`guild/${region}/${realm}/${guild}`)
    },

    getPopularGuilds () {
        return axios.get('guild/popular')
    }

}

export default GuildService
