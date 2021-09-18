const app = require('../app');

app.listen(3000, () => {
    console.log(`App running on port ${process.env.PORT}`)
})