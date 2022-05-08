const express = require('express')
const path = require('path')
const fs = require("fs")
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(express.static('public'))
const parser = bodyParser.urlencoded({extended: true})
const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/notes.html'))
  })
  
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname+'/db/db.json'))
  })

  app.post('/api/notes',jsonParser,(req,res) =>{
    let data = req.body
    let db = fs.readFileSync("db/db.json")
    let read=JSON.parse(db)
    read.push(data)
     let finalJSON = JSON.stringify(read)
     fs.writeFileSync("db/db.json",finalJSON)
     res.sendStatus(200)
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
