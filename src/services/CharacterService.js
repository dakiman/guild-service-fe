import axios from 'axios'

const CharacterService = {

    getCharacter (realm, character, region) {
        return axios.get(`character/${realm}/${character}?locale=${region}`)
    },

    getCharacterRaiderioData (realm, character, region) {
        return axios.get(`character/${realm}/${character}/raiderio?locale=${region}`)
    },

}

export default CharacterService
