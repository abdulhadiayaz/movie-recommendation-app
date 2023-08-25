<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card variant="tonal">
                    <v-row class="pr-5">
                        <v-col cols="4">
                            <v-img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="Movie Poster"></v-img>
                        </v-col>
                        <v-col cols="8">
                            <v-card-title class="py-5 mt-3"><h2>{{ movie.title }}</h2></v-card-title>
                            <p><b>Release Date</b>: {{ movie.release_date }}</p>
                            <p><b>Genres: </b>{{ movie?.genres?.map(item => item.name).join(', ') }}</p>
                            <p><b>Plot Summary:</b> {{ movie.overview }}</p>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieDetailsReq } from '@/services/api';

const movie = ref({});
const route = useRoute();

const fetchMovieDetails = async () => {
    const response = await getMovieDetailsReq(route.params.id);
    movie.value = response.data;
};

onMounted(fetchMovieDetails);
</script>
  