<template>
    <div class="register">
        <b-container>
            <b-row>
                <b-col offset="4" md="4" class="p-4 bg-dark">
                    <b-form>
                        <b-form-group
                            label="Name"
                            label-for="name"
                        >
                            <b-form-input
                                v-model="form.name"
                                id="name"
                                required
                                placeholder="Name"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label="Email"
                            label-for="email"
                        >
                            <b-form-input
                                v-model="form.email"
                                id="email"
                                type="email"
                                required
                                placeholder="Email"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label="Password"
                            label-for="password"
                        >
                            <b-form-input
                                v-model="form.password"
                                id="password"
                                type="password"
                                required
                                placeholder="Password"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-button
                                id="registerButton"
                                @click="register"
                                block
                                type="button"
                                variant="primary">
                                Register
                            </b-button>
                        </b-form-group>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Register',

        data() {
            return {
                form: {
                    email: 'daki@daki.com',
                    password: 'password',
                    name: 'name'
                }
            }
        },

        methods: {
            register() {
                this.$store.dispatch('auth/register', {email: this.form.email, password: this.form.password, name: this.form.name})
                    .then(() => this.$router.push('/'))
            }
        }
    }
</script>
