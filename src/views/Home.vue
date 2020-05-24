<template>
    <div class="home">
        <div class="container-fluid">

            <div class="row">
                <div class="col-md-8 offset-md-2 xs-auto">
                    <b-form>
                        <div class="row my-2 mx-1">
                            <div class="col-md-6 p-2" :class="[this.form.lookupMode === 'character' ? 'bg-primary' : '']">
                                Characters
                                    <b-form-radio class="float-right" v-model="form.lookupMode" name="lookupMode"

                                                  value="character">
                                    </b-form-radio>
                            </div>
                            <div class="col-md-6 p-2" :class="[this.form.lookupMode === 'guild' ? 'bg-primary' : '']">
                                Guild
                                    <b-form-radio class="float-left" v-model="form.lookupMode" name="lookupMode"
                                                  value="guild">
                                    </b-form-radio>
                            </div>
                        </div>
                        <b-form-group>
                            <div class="row">
                                <div class="col-md-2">
                                    <region-dropdown
                                        :defaultRegion="this.form.region"
                                        @change="region => this.form.region = region"/>
                                </div>
                                <div class="col-md">
                                    <b-form-input
                                        id="name"
                                        v-model="form.name"/>
                                </div>
                                <div class="col-md-3">
                                    <b-form-input
                                        id="realm"
                                        v-model="form.realm"/>
                                </div>
                            </div>
                        </b-form-group>
<!--                        <b-form-group class="mt-2">-->
<!--                            <b-button-->
<!--                                id="look"-->
<!--                                block-->
<!--                                type="button"-->
<!--                                @click="getName"-->
<!--                                variant="primary">-->
<!--                                <template v-if="!loading">Find Name</template>-->
<!--                                <template v-else>-->
<!--                                    <b-spinner-->
<!--                                        variant="primary"-->
<!--                                        key="primary"/>-->
<!--                                </template>-->
<!--                            </b-button>-->
<!--                        </b-form-group>-->
                    </b-form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src

    import RegionDropdown from "@/components/RegionDropdown";

    export default {
        components: {RegionDropdown},
        name: 'home',
        data() {
            return {
                form: {
                    region: 'EU',
                    name: 'sernaos',
                    realm: 'the maelstrom',
                    lookupMode: '',
                },
            }
        }
    }
</script>
