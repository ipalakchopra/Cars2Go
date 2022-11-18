const express = require('express')
const app = express()
const port = process.env.PORT || 5000 //react using 3000
const dbConnection = require('./db')
app.use(express.json())


app.use('/api/cars/', require('./routes/carsRoute'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node JS server started in port ${port}`))