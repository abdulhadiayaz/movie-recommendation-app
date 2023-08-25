import axios from "axios";

const TMDBClient = axios.create({
    baseURL: process.env.VUE_APP_TMD_API_BURL,
    params: {
        api_key: process.env.VUE_APP_TMDB_API_KEY
    }
});

// axios.defaults.baseURL = process.env.VUE_APP_TMD_API_BURL;
// const api_key = process.env.VUE_APP_TMDB_API_KEY

export const getPopularMoviesReq = () => {
    return TMDBClient.get(`/movie/popular`);
};

export const getSearchMoviesReq = (searchText) => {
    return TMDBClient.get(`/search/movie?query=${searchText}`);
};

export const getMovieDetailsReq = (movieId) => {
    console.log('movieId', movieId);
    return TMDBClient.get(`/movie/${movieId}`);
};
