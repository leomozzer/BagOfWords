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
    SlackTemplate(words) {
        let blocks = []
        for (const word of words) {
            let items = [];
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
        return blocks
    }
}