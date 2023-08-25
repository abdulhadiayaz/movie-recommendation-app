<template>
    <v-container>
      <v-row>
        <v-col cols="12">
            <v-card variant="tonal" class="text-center">
                <h2>User Profile</h2>
                <template v-if="currentUser">
                  <h3 class="pa-4">Welcome, {{ currentUser.email }}</h3>
                  <v-btn class="mb-4" @click="logout">Log Out</v-btn>
                </template>
                <template v-else>
                  <router-link to="/login">Log In</router-link>
                </template>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { auth } from '../../firebase/firebaseConfig';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const currentUser = ref(auth.currentUser);
  
  onMounted(() => {
    auth.onAuthStateChanged(user => {
      currentUser.value = user;
    });
  });
  
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
    router.push('/login');
  };
  </script>
  