<template>
    <b-form-group
            label="Region"
            label-for="region">
        <b-form-select
                id="region"
                :options="regions"
                :value="defaultRegion"
                @change="$emit('change', $event)"/>
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

