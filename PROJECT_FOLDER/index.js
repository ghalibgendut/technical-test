const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// Import Route
const employeeRoute = require('./src/routes/employeeRouter')
const educationRouter = require('./src/routes/educationRouter')

app.use(cors())
app.use(express.json())
app.use(employeeRoute)
app.use(educationRouter)


app.get('/', (req, res) => {
    res.status(200).json({ message: `API Running at Port: ${port}` })
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});