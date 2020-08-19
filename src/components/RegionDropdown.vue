<template>
    <!--$event is the value for some reason-->
    <b-form-select
        id="region"
        v-model="dropdownSelection"
        :options="regions"
        @change="$emit('change', $event.toLowerCase())"/>
</template>

<script>
    export default {
        name: 'RegionDropdown',

        props: {
            selected: {
                type: String,
                default: null,
            }
        },

        data() {
            return {
                dropdownSelection: this.selected,
                regions: [
                    {value: null, text: 'Region'},
                    { value: 'eu', text: 'EU' },
                    { value: 'us', text: 'US' },
                    { value: 'ch', text: 'CH' },
                    { value: 'au', text: 'AU' },
                ]
            }
        },
    }
</script>

