import app from './src/app.js'

const port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})