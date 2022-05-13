import express from 'express'

let app = express()

app.get('/', (req,res) => {
    res.status(200).send("Data Flight API")
})

app.post('/login', (req,res) => {
    
})

export default app