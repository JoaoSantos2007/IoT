import app from './src/app.js'

const port = process.env.PORT || 3030;
const host = process.env.HOST || "0.0.0.0"

app.listen(port,host, () => {
    console.log(`Server is working on http://${host}:${port}`)
})