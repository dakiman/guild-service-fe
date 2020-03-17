<template>
    <div class="login">
        <b-container>
            <b-row>
                <b-col offset="4" md="4" class="p-4 bg-dark">
                    <b-form>
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
                                id="loginButton"
                                @click="login"
                                block
                                type="button"
                                variant="primary">
                                Login
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
        name: 'Login',

        data() {
            return {
                form: {
                    email: 'daki@daki.com',
                    password: 'password'
                }
            }
        },

        methods: {
            login() {
                this.$store.dispatch('auth/login', {email: this.form.email, password: this.form.password})
                    .then(() => this.$router.push('/'))
                    // .catch(e => console.log('Error!', e))
            }
        }
    }
</script>
