<template>
    <el-form class="grid grid-cols-2 gap-2">
        <el-input
            v-model="email"
            type="text"
            name="email"
            placeholder="Email"
            class="col-span-2"
            :validate-event="false"
        />
        <el-input
            v-model="password"
            type="password"
            name="password"
            placeholder="Mot de passe"
            class="col-span-2"
            show-password
        />
        <div class="flex justify-center col-span-2 mt-3">
            <el-button type="primary" size="large" @click="signIn" :disabled="disabled"
                >Se connecter</el-button
            >
        </div>
    </el-form>
</template>
<script setup>
import Cookies from 'js-cookie'
import jwt from 'jwt-encode'
import Module from '/services/users.service.js'
import crypto from 'crypto-js'

const email = ref(null)
const password = ref(null)
const errors = ref([])
const disabled = computed(() => {
    return email.value && password.value ? false : true
})
const emit = defineEmits(['goToDashboard'])
const validEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}
const signIn = async (e) => {
    errors.value = []
    !email.value ? errors.value.push('Saisis ton email') : null
    !validEmail(email.value) ? errors.value.push("L'email est invalide") : null
    !password.value ? errors.value.push('Saisis un mot de passe') : null
    !errors.value.length ? true : false
    e.preventDefault()
    if (errors.value.length === 0) {
        try {
            const hashPwd = crypto.MD5(password.value).toString()
            const user = await Module.authentification(email.value, hashPwd)
            const payload = user
            const secret = 'xxx'
            const token = jwt(payload, secret)
            Cookies.set('user', token)
            window.location.replace('/dashboard')
        } catch (e) {
            console.log('error !')
        }
    }
}
</script>
