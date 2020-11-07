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
                :to="{name: 'singleCharacter', params: { region: region, realm: member.realm, name: member.name }}"
            >
                <span class="float-left" :style="{ color: getClassColor(member.class) }">{{member.name}}</span>
                <span class="float-left"> ({{member.level}})</span>
                <span class="float-right"> {{member.realm | deslug }} </span>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import {getClassColor} from '@/modules/staticData'

    export default {
        name: 'RosterList',
        props: {
            roster: Array,
            region: String,
        },
        data() {
            return {
                filteredRoster: this.roster,
                filterCriteria: null,
            }
        },
        methods: {
            getClassColor,
            filterRoster() {
                this.filteredRoster = this.roster.filter(member => {
                    return member.name
                        .toLowerCase()
                        .includes(this.filterCriteria.toLowerCase())
                })
            }
        }
    }
</script>

