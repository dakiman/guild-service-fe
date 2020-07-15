<template>
    <!--$event is the value for some reason-->
    <!--    TODO Fix region default display -->
    <b-form-select
        id="region"
        v-model="selected"
        :options="regions"
        @change="$emit('change', $event.toLowerCase())"/>
</template>

<script>
    export default {
        name: 'RegionDropdown',
        data() {
            return {
                selected: null,
                regions: [
                    {value: null, text: 'Region'},
                    { value: 'EU', text: 'EU' },
                    { value: 'US', text: 'US' },
                    { value: 'CH', text: 'CH' },
                    { value: 'AU', text: 'AU' },
                ]
            }
        },
    }
</script>

