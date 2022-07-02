import app from './src/app.js'

const port = process.env.PORT || 3030;
const host = '0.0.0.0'

app.listen(port,host, () => {
    console.log(`Server is working on http://localhost:${port}`)
})