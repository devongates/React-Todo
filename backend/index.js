const express = require('express')
const bodyParser = require('body-parser')
const initiateMongoServer = require('./config/db')
const user = require('./routes/user')

initiateMongoServer()

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'API working' })
})

app.use('/user', user)

app.listen(PORT, (req, res) => {
	console.log(`Server started on port ${PORT}`)
})
