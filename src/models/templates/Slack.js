const { GetExample } = require("../../handlers/WordHandler");

module.exports = {
    SlackTemplate(words) {
        let blocks = []
        for (const word of words) {
            let items = [];
            if (word['translation']) {
                items.push(`*Word*: ${word['word']} - ${word['translation']['word']}`) //Add the word into the array
                word['translation']['example'] ? items.push(`*Example*: ${GetExample(word['meanings'])} \n ${word['translation']['example']}`) : items.push(`*Example*: ${GetExample(word['meanings'])}`)
                if (word['phonetics'][0]['audio']) {
                    items.push(`*Phonetics*: <${!word['phonetics'][0]['audio'].includes("http") ? `https:${word['phonetics'][0]['audio']}` : `${word['phonetics'][0]['audio']}`}|${word['word']}>`) //Add the word into the array
                }
                blocks.push({
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${items.join("\n")}`
                    }
                }, {
                    "type": "divider"
                })
            }
            else {
                items.push(`*Word*: ${word['word']}`) //Add the word into the array
                items.push(`*Example*: ${GetExample(word['meanings'])}`) //Add the Example into the array; Get the first example with value
                if (word['phonetics'][0]['audio']) {
                    items.push(`*Phonetics*: <${!word['phonetics'][0]['audio'].includes("http") ? `https:${word['phonetics'][0]['audio']}` : `${word['phonetics'][0]['audio']}`}|${word['word']}>`) //Add the word into the array
                }
                blocks.push({
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${items.join("\n")}`
                    }
                }, {
                    "type": "divider"
                })
            }
        }
        return blocks
    }
}