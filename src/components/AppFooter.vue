<template>
  <v-footer class="justify-center" color="secondary" height="40" app>
    <div>
      <v-btn append-icon="refresh" @click="changeTheme" color="orange-darken-2">Change theme</v-btn>
    </div>
  </v-footer>
</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()

const changeTheme = function () { theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark' }

</script>

<style scoped lang="sass">
</style>
