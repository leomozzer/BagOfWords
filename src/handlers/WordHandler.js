module.exports = {
    GetExample(meanings) {
        let example = ""
        meanings.find(items => {
            items['definitions'].find(def => {
                if (def['example']) { example = def['example'] }
            })
        })
        return example.charAt(0).toUpperCase() + example.slice(1)
    }
}