<template>
    <div class="profile">
        Hi {{ user }}
    </div>
</template>

<script>
    // @ is an alias to /src

    import {mapGetters} from "vuex";

    export default {
        name: 'profile',
        computed: {
            ...mapGetters({
                user: 'auth/user'
            }),
        }
    }
</script>
