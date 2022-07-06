const http = require('http')
const path = require('path')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//const route = express.Router()
const {route} = require('./controller/router')
const app = express()
const cart = require('./model/mongo')
//const server = http.createServer(app)
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(express.json)
app.use('/',route)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
const mongodb_url = process.env.mongodb_url
async function startserver()
{
    app.listen(8000,async(req,res)=>{
        await mongoose.connect(mongodb_url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.log('mongodb connected')
        }).catch((err)=>{
            console.log(err)
        })
        console.log('server is connected')
    })
}
startserver()
/*route.get('/',async(req,res)=>{
    try{
        const orders = await cart.find().lean()
    }
    catch(err){
        console.log(err)
    }
    console.log(orders)
    res.render('cart', {orders})
})
const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'context-type':'text/plain'
    })
    res.write('hello')
    res.end()
}).listen(8000,console.log('server is connected'))*/