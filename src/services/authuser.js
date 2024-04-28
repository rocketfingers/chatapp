/* eslint-disable no-unused-vars */
import { LoginProm, auth } from './firebase.js'
import { ref, computed } from 'vue'

const user = ref(null)

const login = function () {
  return LoginProm()
    .then(function (usr) { user.value = usr })
}
const logout = function () {
  return auth.signOut()
    .then(function (usr) { user.value = null })
}
const isLoggedIn = computed(() => user.value !== null)
export { user, login, logout, isLoggedIn }
