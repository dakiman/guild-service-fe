import axios from 'axios'

const CharacterService = {

    getCharacter (realm, character, region) {
        return axios.get(`character/${region}/${realm}/${character}`)
    },

    toggleRecruitment (character) {
        return axios.patch(`character/${character}/recruitment`)
    },

    getCharacterRaiderioData (realm, character, region) {
        return axios.get(`character/${region}/${realm}/${character}/raiderio`)
    },

}

export default CharacterService
