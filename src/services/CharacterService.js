import axios from 'axios'

const CharacterService = {

    getCharacter (realm, character, region) {
        return axios.get(`character/${region}/${realm}/${character}`)
    },

    getCharacterRaiderioData (realm, character, region) {
        return axios.get(`character/${region}/${realm}/${character}/raiderio`)
    },

}

export default CharacterService
