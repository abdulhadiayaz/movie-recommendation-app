<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="searchText" label="Search Movies" @input="searchMovies"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="movie in moviesToDisplay" :key="movie.id" cols="12" sm="6" md="4" lg="3">
                <v-card variant="tonal">
                    <v-img class="cursor-pointer" @click="onClickMovie(movie)" :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" :alt="movie.title"></v-img>
                    <v-card-title>{{ movie.title }}</v-card-title>
                    <v-btn @click="toggleFavorite(movie)" v-if="user" class="w-100">
                        <template v-if="isFavorite(movie)">
                            <v-icon color="red">mdi-heart</v-icon> <!-- Use icon name without 'mdi' prefix -->
                        </template>
                        <template v-else>
                            <v-icon color="grey">mdi-heart</v-icon>
                        </template>
                    </v-btn>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>

import { ref, onMounted, watch, computed } from 'vue';
import { auth } from '../firebase/firebaseConfig';
import { getFirestore, doc, collection, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'vue-router';
import { getPopularMoviesReq, getSearchMoviesReq } from '../services/api';
import { DB_COLLECTION_USER, DB_COLLECTION_FAVOURITES } from '../constants'

const router = useRouter();
const { user } = useUser();
const searchText = ref('');
const popularMovies = ref([]);
const searchResults = ref([]);
const userFavourites = ref([]);


onMounted(async () => {
    // Fetch popular movies
    const popularResponse = await getPopularMoviesReq();
    popularMovies.value = popularResponse.data.results;

    // Fetch user favourites from the database
    const user = auth.currentUser;
    if (user) {
        const userPreferencesData = await fetchUserPreferences(user.uid);
        userFavourites.value = userPreferencesData;
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

const addToUserFavorites = async (userId, movieId) => {
    const db = getFirestore();
    const userDocRef = doc(db, DB_COLLECTION_USER, userId);
    const favoritesCollectionRef = collection(userDocRef, DB_COLLECTION_FAVOURITES);
    const movieDocRef = doc(favoritesCollectionRef, movieId.toString());
    await setDoc(movieDocRef, { favourite: true });
};

const removeFromUserFavorites = async (userId, movieId) => {
    const db = getFirestore();
    const userDocRef = doc(db, DB_COLLECTION_USER, userId);
    const favoritesCollectionRef = collection(userDocRef, DB_COLLECTION_FAVOURITES);

    const genreDocRef = doc(favoritesCollectionRef, String(movieId));
    await deleteDoc(genreDocRef);
};


const isFavorite = (movie) => {
    return userFavourites.value?.includes(String(movie.id));
};

const toggleFavorite = async (movie) => {
    const user = auth.currentUser;
    if (!user) return;

    if (isFavorite(movie)) {
        await removeFromUserFavorites(user.uid, movie.id);
        userFavourites.value = userFavourites.value.filter(id => id !== String(movie.id));
    } else {
        await addToUserFavorites(user.uid, movie.id);
        userFavourites?.value?.push(String(movie.id));
    }
};

watch(searchText, () => {
    searchMovies();
});

const searchMovies = async () => {
    if (searchText.value.trim() === '') {
        searchResults.value = [];
        return;
    }

    const response = await getSearchMoviesReq(searchText.value);
    searchResults.value = response.data.results;
};

const moviesToDisplay = computed(() => {
    return searchText.value ? searchResults.value : popularMovies.value;
});
</script>
  