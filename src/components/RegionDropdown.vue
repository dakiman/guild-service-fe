<template>
    <b-form-group
            label="Region"
            label-for="region">
        <!--$event is the value for some reason-->
        <b-form-select
                id="region"
                :options="regions"
                :value="defaultRegion"
                @change="$emit('change', $event.toLowerCase())"/>
    </b-form-group>
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
        data () {
            return {
                regions: ['EU', 'US', 'CH', 'AU']
            }
        },
    }
</script>

