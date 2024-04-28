<template>
  <v-container class="fill-height">
    <v-app-bar color="secondary" :elevation="2">
      <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
-->
      <v-app-bar-title>Chat app</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-badge v-show="isLoggedIn" overlap>
        <template v-slot:badge>
          <span>0</span>
        </template>
        <v-avatar color="red red--after">
          <v-icon v-if="user?.photoURL === null" dark>face</v-icon>
          <v-img v-else-if="user?.photoURL !== null" :src="user?.photoURL"></v-img>
        </v-avatar>

      </v-badge>

      <v-btn v-show="!isLoggedIn" icon color="primary" @click="loginClick()"><v-icon>login</v-icon></v-btn>
      <v-btn v-show="isLoggedIn" icon color="red-darken-2" @click="logoutClick()"><v-icon>logout</v-icon></v-btn>

    </v-app-bar>
    <div class="message" v-for="(message, index) in messages" v-bind:key="index"
      :class="{ own: message.user == username }">
      <div class="username" v-if="index > 0 && messages[index - 1].user != message.user">{{ message.user }}</div>
      <div class="username" v-if="index == 0">{{ message.user }}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-html="message.content"></div>
        <chat-image v-if="message.image" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image>
      </div>
    </div>
    <v-container>
      <v-row v-for="(msg, i) in messages" :key="i">

        <v-card class="mt-2">
          <v-card-title>
            {{ msg.userName }}<v-avatar color="red red--after">
              <v-img v-if="user?.userPhotoUrl !== null" :src="msg?.userPhotoUrl"></v-img>
            </v-avatar>
          </v-card-title>
          <v-card-text>
            {{ msg.text }}
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="align-center">
        <v-text-field v-show="isLoggedIn" v-model="messageTxt" label="Message text" id="sendMessage"></v-text-field>
        <v-btn v-show="isLoggedIn" @click="sendMessageClick" color="primary">Send</v-btn>

      </v-row>

    </v-container>

    <v-responsive class="align-centerfill-height mx-auto" max-width="900">

    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { unsubscribe, messages, sendMessage } from '../services/chatApi.js'
import { isLoggedIn, login, logout, user } from '../services/authuser.js'
const messageTxt = ref('')
const loginClick = () => {
  login().then(() => unsubscribe())
}
const logoutClick = () => {
  logout().then(function () { messages.value = [] })
}

onBeforeUnmount(logoutClick())
const sendMessageClick = () => {
  sendMessage(messageTxt.value)
  messageTxt.value = ''
}
</script>
<style scoped>
.message {
  margin-bottom: 3px;
}

.message.own {
  text-align: right;
}

.message.own .content {
  background-color: lightskyblue;
}
</style>
