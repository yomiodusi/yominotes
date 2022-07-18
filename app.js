const express = require('express')
const path = require('path')
const fs = require("fs")
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3001;
app.use(express.static('public'))
const parser = bodyParser.urlencoded({extended: true})
const jsonParser = bodyParser.json()
const uniqid = require('uniqid')

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
    data['id'] = uniqid()
    let db = fs.readFileSync("db/db.json")
    let read=JSON.parse(db)
    read.push(data)
     let finalJSON = JSON.stringify(read)
     fs.writeFileSync("db/db.json",finalJSON)
     res.sendStatus(200)
    
  })

  app.delete('/api/notes/:id',(req,res) =>{
  let noteid = req.params.id
  let db = fs.readFileSync("db/db.json")
  let read=JSON.parse(db)
 const newList= read.filter((item) => item['id']!=noteid)
   let finalJSON = JSON.stringify(newList)
   fs.writeFileSync("db/db.json",finalJSON)
   res.sendStatus(200)

    
  })

  connection.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`Backend Server Live on ${PORT}`);
    });
  });