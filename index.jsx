const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 1203

app.use(morgan('combined'))
app.get('/', (req, res) => {
  return res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})