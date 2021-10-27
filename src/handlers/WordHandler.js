const { WordDefinition } = require("../api/Dictionary");
const { MicrosoftTranslate } = require("../models/Translate");
const { GenerateRandomWords } = require("../models/Words");

function GetExample(meanings) {
    let example = ""
    meanings.find(items => {
        items['definitions'].find(def => {
            if (def['example']) { example = def['example'] }
        })
    })
    return example.charAt(0).toUpperCase() + example.slice(1)
}

module.exports = {
    GetExample,
    async HandleWords(words, language = "en") {
        let BagOfWords = [];
        for (const word of words) {
            const GetDefinition = await WordDefinition(language, word);
            if (GetDefinition['title']) { return GetDefinition; }
            let FirstDefinition = GetDefinition[0];
            FirstDefinition['word'] = FirstDefinition['word'].charAt(0).toUpperCase() + FirstDefinition['word'].slice(1)
            BagOfWords.push(FirstDefinition)
        }
        return BagOfWords;
    },
    async HandleTranslatedWords(words, language = "en", output_language) {
        let BagOfWords = [];
        for (const word of words) {
            let TranslatedWords = await MicrosoftTranslate(word, language, output_language)
            if (TranslatedWords['error']) { return TranslatedWords['error'] }
            if (TranslatedWords['code'] === "400036") { return TranslatedWords['message'] }
            let GetDefinition
            for (const wd of TranslatedWords) {
                try {
                    GetDefinition = await WordDefinition(wd['to'], wd['text']);
                }
                catch (error) {
                    TranslatedWords = await MicrosoftTranslate(GenerateRandomWords(1)[0], language, output_language)
                    GetDefinition = await WordDefinition(TranslatedWords[0]['to'], TranslatedWords[0]['text']);
                }
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
}