const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const apicache = require('apicache');

//init cache
let cache = apicache.middleware;

//get request to get definition
router.get('/word/:word', cache('5 minutes'), (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.API_BASE_URL}/words/${req.params.word}/definitions`,
    headers: {
      'x-rapidapi-ua': 'RapidAPI-Playground',
      'x-rapidapi-host': `${process.env.API_BASE_URL}`,
      'x-rapidapi-key': `${process.env.API_KEY_VALUE}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.sendStatus(500);
    });
});

//get request to get synonym
router.get('/synonym/:synonym', cache('5 minutes'), (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.API_BASE_URL}/words/${req.params.synonym}/synonyms`,
    headers: {
      'x-rapidapi-ua': 'RapidAPI-Playground',
      'x-rapidapi-host': `${process.env.API_BASE_URL}`,
      'x-rapidapi-key': `${process.env.API_KEY_VALUE}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.sendStatus(500);
    });
});

//get request to get examples
router.get('/example/:example', cache('5 minutes'), (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.API_BASE_URL}/words/${req.params.example}/examples`,
    headers: {
      'x-rapidapi-ua': 'RapidAPI-Playground',
      'x-rapidapi-host': `${process.env.API_BASE_URL}`,
      'x-rapidapi-key': `${process.env.API_KEY_VALUE}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.sendStatus(500);
    });
});

//get request to get antonyms
router.get('/antonym/:antonym', cache('5 minutes'), (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.API_BASE_URL}/words/${req.params.antonym}/antonyms`,
    headers: {
      'x-rapidapi-ua': 'RapidAPI-Playground',
      'x-rapidapi-host': `${process.env.API_BASE_URL}`,
      'x-rapidapi-key': `${process.env.API_KEY_VALUE}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.sendStatus(500);
    });
});

//get request to get random
router.get('/random', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.API_BASE_URL}/words/`,
    params: { random: 'true' },
    headers: {
      'x-rapidapi-ua': 'RapidAPI-Playground',
      'x-rapidapi-host': `${process.env.API_BASE_URL}`,
      'x-rapidapi-key': `${process.env.API_KEY_VALUE}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = router;
