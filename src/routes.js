const routes = require('express').Router();

const { GetWords, GetWordsSlackTemplate, RandomWordsLanguage } = require('./controllers/WordController');

routes.get('/word', GetWords);

routes.get('/word/template/slack/', GetWordsSlackTemplate)
routes.get('/word/template/slack/:language', GetWordsSlackTemplate)

routes.get('/word/:language', RandomWordsLanguage)

module.exports = routes;