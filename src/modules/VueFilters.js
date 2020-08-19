import Vue from 'vue'

Vue.filter('deslug', (value) => {
    if (!value) return ''

    value = value
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return value;
})
