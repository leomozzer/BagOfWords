const { WordDefinition } = require("../api/Dictionary");
const { GetExample } = require("../handlers/WordHandler");
const { SlackTemplate } = require("../models/templates/Slack");
const { MicrosoftTranslate } = require("../models/Translate");
const { GenerateRandomWords } = require("../models/Words")

const HandleWords = async (words, language = "en") => {
    let BagOfWords = [];
    for (const word of words) {
        const GetDefinition = await WordDefinition(language, word);
        if (GetDefinition['title']) { return GetDefinition; }
        let FirstDefinition = GetDefinition[0];
        FirstDefinition['word'] = FirstDefinition['word'].charAt(0).toUpperCase() + FirstDefinition['word'].slice(1)
        BagOfWords.push(FirstDefinition)
    }
    return BagOfWords;
}

const HandleTranslatedWords = async (words, language = "en", output_language) => {
    let BagOfWords = [];
    for (const word of words) {
        const TranslatedWords = await MicrosoftTranslate(word, language, output_language)
        if (TranslatedWords['error']) { return TranslatedWords['error'] }
        if (TranslatedWords['code'] === "400036") { return TranslatedWords['message'] }
        for (const wd of TranslatedWords) {
            const GetDefinition = await WordDefinition(wd['to'], wd['text']);
            if (GetDefinition['title']) { }
            let FirstDefinition = GetDefinition[0];
            let example = "";
            FirstDefinition['word'] = FirstDefinition['word'].charAt(0).toUpperCase() + FirstDefinition['word'].slice(1)
            for (const translate_wd of await MicrosoftTranslate(GetExample(FirstDefinition['meanings']), output_language[0], language)) {
                example = translate_wd['text']
            }
            FirstDefinition['translation'] = { 'word': word.charAt(0).toUpperCase() + word.slice(1), 'language': language, 'example': example }
            BagOfWords.push(FirstDefinition)
        }
    }
    return BagOfWords;
}

module.exports = {
    async GetWords(req, res) {
        try {
            const words = await HandleWords(GenerateRandomWords(3))
            return res.json({
                'words': words
            });
        }
        catch (err) {
            return res.json({
                'response': err
            });
        }
    },
    async GetWordsSlackTemplate(req, res) {
        try {
            const { language } = req.params
            const words = language ? await HandleTranslatedWords(GenerateRandomWords(3), "en", [language]) : await HandleWords(GenerateRandomWords(3))
            const slackTemplate = SlackTemplate(words);
            return res.json({
                'blocks': slackTemplate
            });
        }
        catch (err) {
            console.log(err)
            return res.json({
                'response': err
            });
        }
    },
    async RandomWordsLanguage(req, res) {
        const { language } = req.params;
        try {
            const TranslatedWords = await HandleTranslatedWords(GenerateRandomWords(3), "en", [language]);
            return res.json({
                'words': TranslatedWords
            });
        }
        catch (err) {
            console.log(err)
            return res.json({
                'response': err
            });
        }
    }
}