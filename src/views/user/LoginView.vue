<template>
    <v-container>
        <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="login">
                    <v-text-field v-model="email" label="Email"></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                    <v-btn type="submit" color="primary">Login</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script setup>
import { ref } from 'vue';
import { auth } from '../../firebase/firebaseConfig';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from "firebase/auth"

const router = useRouter();
const email = ref('');
const password = ref('');

const login = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/profile'); 
    } catch (error) {
        console.error('Login error:', error.message);
    }
};
</script>
  