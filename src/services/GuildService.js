import axios from 'axios'

const CharacterService = {

    getCharacterBasic(realm, character, region) {
        return axios.get(`character/${realm}/${character}/basic?locale=${region}`)
    }

}

export default CharacterService
