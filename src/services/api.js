import axios from "axios";
// base da url:  https://api.themoviedb.org/3/
// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=4b524c5083ad2e55c77098f327c92745&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;
 