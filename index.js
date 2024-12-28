const express = require('express')
const app = express()
const fs=require('fs')
const path=require('path')
const port = 3000
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', (req, res) => {
fs.readdir('./files',(err,files)=>{
    res.render('index',{files: files})
})
app.get('/file/:filename', (req, res) => {
fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,filedata)=>{
    res.render('show',{filename:req.params.filename,filedata:filedata})
})
})
 
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`,req.body.details,(err)=>{
res.redirect('/')
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})