import Vue from 'vue'

Vue.filter('deslug', (value) => {
    if(!value) return ''

    value = value
        .replace('-', ' ')
        .split(' ')
        .reduce((result, word) => {
            return result += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
        }, '')

    return value;
})
