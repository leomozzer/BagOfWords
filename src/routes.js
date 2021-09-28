const routes = require('express').Router();

const { GetWords, GetWordsSlackTemplate, RandomWordsLanguage } = require('./controllers/WordController');

routes.get('/word', GetWords);

routes.get('/word/template/slack/', GetWordsSlackTemplate)
routes.get('/word/template/slack/:language', (req, res, next) => {
    if (!process.env.MICROSOFT_TRANSLATOR_SUBSCRIPTION_KEY) {
        return res.json({
            "Error": "Missing credentials, check the .env file"
        })
    }
    next();
}, GetWordsSlackTemplate)

routes.get('/word/:language', (req, res, next) => {
    if (!process.env.MICROSOFT_TRANSLATOR_SUBSCRIPTION_KEY) {
        return res.json({
            "Error": "Missing credentials, check the .env file"
        })
    }
    next();
}, RandomWordsLanguage)

module.exports = routes;