<template>
    <!--$event is the value for some reason-->
    <b-form-select
        id="region"
        :options="regions"
        :value="defaultRegion"
        @change="$emit('change', $event.toLowerCase())"/>
</template>

<script>
    export default {
        name: 'RegionDropdown',
        props: {
            defaultRegion: {
                type: String,
                default: '',
                required: false,
            }
        },
        data() {
            return {
                regions: [{value: null, text: 'Region'}, 'EU', 'US', 'CH', 'AU']
            }
        },
    }
</script>

