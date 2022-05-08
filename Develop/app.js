const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/notes.html'))
  })
  
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname+'/db/db.json'))
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
