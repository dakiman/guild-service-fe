<template>
    <div class="itemLink d-inline-flex flex-column bg-primary p-1 m-1"
         style="border-radius: 7.5%;">
        <div >
            <a href="#"
               :data-wowhead="getWowheadLink(item)"
               :class="'q' + itemQualityToId(item.quality)">
            </a>
        </div>
        <div class="mx-auto">
            <span :style="{ color: getItemQualityColorHex(item.quality) }">{{item.itemLevel}}</span>
        </div>
    </div>
</template>

<script>
    import { itemQualityToId, getItemQualityColorHex } from '@/modules/staticData'

    export default {
        name: 'ItemLink',
        props: {
            item: {
                type: Object,
                required: true,
            },
            classId: {
                type: Number,
                required: false,
            }
        },
        methods: {
            itemQualityToId,
            getItemQualityColorHex,
            getWowheadLink(item) {
                let itemLink = 'item=' + item.id;

                if(item.sockets) {
                    itemLink += '&gems='
                    item.sockets.forEach(socket => {
                      itemLink += socket.gem
                    })
                }

                itemLink += '&ilvl=' + item.itemLevel

                return itemLink;
            }
        }
    }
</script>
