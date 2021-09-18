const { HandleWords, HandleTranslatedWords } = require("../handlers/WordHandler");
const { SlackTemplate } = require("../models/templates/Slack");
const { GenerateRandomWords } = require("../models/Words")

module.exports = {
    async GetWords(req, res) {
        try {
            const words = await HandleWords(GenerateRandomWords(3))
            return res.json({
                'words': words
            });
        }
        catch (err) {
            console.log(err)
            return res.json({
                'error': err
            });
        }
    },
    async GetWordsSlackTemplate(req, res) {
        try {
            const { language } = req.params
            const words = language && language !== "en" ? await HandleTranslatedWords(GenerateRandomWords(3), "en", [language]) : await HandleWords(GenerateRandomWords(3))
            const slackTemplate = SlackTemplate(words);
            return res.json({
                'blocks': slackTemplate
            });
        }
        catch (err) {
            console.log(err)
            return res.json({
                'error': err
            });
        }
    },
    async RandomWordsLanguage(req, res) {
        const { language } = req.params;
        try {
            const TranslatedWords = language !== "en" ? await HandleTranslatedWords(GenerateRandomWords(3), "en", [language]) : await HandleWords(GenerateRandomWords(3));
            return res.json({
                'words': TranslatedWords
            });
        }
        catch (err) {
            console.log(err)
            return res.json({
                'error': err
            });
        }
    }
}