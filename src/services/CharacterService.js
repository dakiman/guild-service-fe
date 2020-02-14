import axios from 'axios'

const GuildService = {

    getCharacter (realm, character, region) {
        return axios.get(`character/${realm}/${character}?locale=${region}`)
    }

}

export default GuildService
