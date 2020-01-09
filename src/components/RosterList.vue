<template>
    <div class="rosterList">
        <b-form-group
                label="Filter roster"
                label-for="filter-roster"
        >
            <b-form-input v-model="filterCriteria" v-on:keyup="filterRoster" id="filter-roster"/>
        </b-form-group>
        <b-list-group>
            <b-list-group-item
                    v-for="member in filteredRoster"
                    :key="member.name"
                    class="text-left"
            >
                <span :style="{ color: getClassColor(member.class) }">{{member.name}}</span>, {{member.level}} @
                {{member.realm}}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import { getClassColor } from '@/modules/staticData'

    export default {
        name: 'RosterList',
        props: {
            roster: Array
        },
        data () {
            return {
                filteredRoster: this.roster,
                filterCriteria: null,
            }
        },
        methods: {
            getClassColor,
            filterRoster () {
                this.filteredRoster = this.roster.filter(member => {
                    return member.name.toLowerCase()
                      .includes(this.filterCriteria.toLowerCase())
                })
            }
        }
    }
</script>

