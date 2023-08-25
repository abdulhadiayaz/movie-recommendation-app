<template>
  <v-app-bar app>
    <v-toolbar-title>Movie App</v-toolbar-title>
    <v-spacer>
      <v-btn to="/home" text> Home</v-btn>
      <v-btn  class="d-none d-sm-inline-flex" v-if="user" to="/watch-list" text> Watch List</v-btn>
    </v-spacer>
    <v-btn v-if="!user" to="/register" text>Sign Up</v-btn>
    <v-btn v-if="!user" to="/login" text>Sign In</v-btn>
    <v-btn v-if="user" to="/profile" text>Profile</v-btn>
    <v-btn v-if="user" @click="logout" text>Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useUser } from '../hooks/useUser';
import { auth } from '../firebase/firebaseConfig';

const { user } = useUser();

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>
