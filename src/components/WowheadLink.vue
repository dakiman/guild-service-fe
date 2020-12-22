<template>
    <div class="wowheadLink d-inline-flex flex-column bg-primary p-1 m-1">
        <div>
            <a href="#"
               :data-wowhead="getWowheadLink()"
               :class="quality ? 'q' + itemQualityToId(quality) : ''">
            </a>
        </div>
        <div class="mx-auto" v-if="itemLevel">
            <span :style="{ color: getItemQualityColorHex(quality) }">{{itemLevel}}</span>
        </div>
        <div class="mx-auto" v-if="additionalData">
            <span>{{additionalData}}</span>
        </div>
    </div>
</template>

<script>
    import {itemQualityToId, getItemQualityColorHex} from '@/modules/staticData'

    export default {
        name: 'WowheadLink',
        props: {
            itemId: {
                required: false,
                type: Number
            },
            quality: {
                required: false,
                type: String
            },
            spellId: {
                required: false,
                type: Number
            },
            itemLevel: {
                required: false,
                type: Number
            },
            additionalData: {
                required: false,
            },
        },
        methods: {
            itemQualityToId,
            getItemQualityColorHex,
            getWowheadLink() {
                let wowheadLink = '';

                if (this.itemId) {
                    wowheadLink += `item=${this.itemId}`
                }

                if(this.spellId) {
                    wowheadLink += `spell=${this.spellId}`
                }

                if (this.itemLevel) {
                    wowheadLink += `&ilvl=${this.itemLevel}`
                }

                return wowheadLink;
            }
        }
    }
</script>
