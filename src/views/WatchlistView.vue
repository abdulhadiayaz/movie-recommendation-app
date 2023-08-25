<template>
    <v-container>
        <h2>Watch List</h2>
        <v-row>
            <v-col v-for="movie in watchList" :key="movie.id" cols="12" sm="6" md="4" lg="3">
                <v-card @click="onClickMovie(movie)">
                    <v-img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" :alt="movie.title"></v-img>
                    <v-card-title>{{ movie.title }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import { auth } from '../firebase/firebaseConfig';
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { DB_COLLECTION_FAVOURITES, DB_COLLECTION_USER } from '@/constants';
import { getMovieDetailsReq } from '@/services/api';

const userPreferences = ref([]); // Store user's selected genres
const watchList = ref([]);
const router = useRouter()

// Fetch user favs on page load
onMounted(async () => {
    const user = auth.currentUser;
    if (user) {
        const userPreferencesData = await fetchUserPreferences(user.uid);
        userPreferences.value = userPreferencesData;
    }
});

const onClickMovie = (movie) => {
    router.push('/movie/' + movie.id);
};

const fetchUserPreferences = async (userId) => {
    const db = getFirestore();
    const userDocRef = doc(db, DB_COLLECTION_USER, userId);
    const favoritesCollectionRef = collection(userDocRef, DB_COLLECTION_FAVOURITES);

    const favoritesSnapshot = await getDocs(favoritesCollectionRef);
    const favoriteGenres = favoritesSnapshot.docs.map(doc => doc.id);

    return favoriteGenres;
};

const fetchWatchList = async () => {
    if (userPreferences.value.length === 0) {
        watchList.value = [];
        return;
    }

    const movieIds = userPreferences.value; // Assuming this is an array of movie IDs
    const recommendedMoviesData = [];

    for (const id of movieIds) {
        const response = await getMovieDetailsReq(id);
        recommendedMoviesData.push(response.data);
    }

    watchList.value = recommendedMoviesData;
};

watch(userPreferences, () => {
    fetchWatchList();
});
</script>
  