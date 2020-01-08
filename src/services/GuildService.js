import axios from 'axios'

const GuildService = {
    getGuild (realm, guild, region) {
        return axios.get(`guild/${realm.toLowerCase().replace(' ', '-')}/${guild}?locale=${region}`)
    }
}

export default GuildService