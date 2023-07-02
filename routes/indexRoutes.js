const { urlencoded } = require('body-parser');
const express = require('express');
const router = express.Router();
const requestMod = require('request');

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";
const searchUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get('/', (req, res, next) => {
  requestMod.get(nowPlayingUrl, (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.render('index', {
      movies: parsedData.results
    });
  });
});

router.get('/movies/:id', (req, res, next) => {
  const { id } = req.params;
  requestMod.get(`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`, (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.render('movie', {
      movieDetails: parsedData
    });
  });
});

router.post('/search', (req, res, next) => {
  const { movieSearchTerm } = req.body;
  requestMod.get(`${searchUrl}&query=${encodeURI(movieSearchTerm)}`, (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.render('results', {
      movieSearchResults: parsedData.results,
      searchedFor: movieSearchTerm
    });
  });
});

module.exports = router;