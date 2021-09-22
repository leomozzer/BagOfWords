const fs = require('fs');

module.exports = {
    async WriteFileAsync(path, content) {
        try {
            fs.writeFileSync(path, content)
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    async AppendFileAsync(path, content) {
        try {
            fs.appendFileSync(path, content)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}