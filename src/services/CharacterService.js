import axios from 'axios'

const GuildService = {

    getCharacterBasic (realm, character, region) {
        return axios.get(`character/${realm}/${character}/basic?locale=${region}`)
    }

}

export default GuildService
