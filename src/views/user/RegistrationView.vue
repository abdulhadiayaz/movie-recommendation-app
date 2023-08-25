<template>
  <v-container>
    <v-card>
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password"></v-text-field>
          <v-btn type="submit" color="primary">Register</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
  
<script setup>
import { ref } from 'vue';
import { auth, firestore } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth"

const email = ref('');
const password = ref('');

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
    console.log('userCredential', userCredential);
    await firestore.collection('users').doc(userCredential.user.uid).set({
      email: this.email,
      password: this.password
    });
    this.$router.push('/profile');
  } catch (error) {
    console.error('Registration error:', error);
  }
};
</script>