const express = require('express')
const cart = require('../model/mongo')
const route = express.Router()
route.get('/',async(req,res)=>{
    console.log('hi')
    const orders = await cart.find().lean()
    console.log(orders)
    res.render('cart', {orders})
})
route.get('/addvalue',(req,res)=>{
    res.render('add')
})
route.post('/addvalue',async(req,res)=>{
    const newvalue = req.body;
    const total = newvalue.price*newvalue.quantity
    try{
        await cart.create({
            name: newvalue.name,
            quantity: newvalue.quantity,
            price: newvalue.price,
            total: total
        })
    }
    catch(err){
       console.log('adding new value failed')
    }
    res.redirect('/')
})
route.get('/update/:id',async(req,res)=>{
    try{
        const particular_cart = await cart.findById(req.params.id).lean()
    }
    catch(err){
        console.log('grocery name insertion failed')
    }
    res.render('update',{id:req.params.id, grocery: particular_cart.name})
})
route.put('/update/:id',async(req,res)=>{
    const value = req.body.quantity
    try{
        const particular_cart = await cart.findById(req.params.id).lean()
    }
    catch(err){
        console.log('updation find by id error')
    }
    try{
        await cart.findOneandUpdate({
                _id: req.params.id
            },{
                quantity: value,
                total: particular_cart.price*value
            },{   
                upsert:true,
                new:true
            })
    }
    catch(err){
        console.log('updation error')
    }
    res.redirect('/')
})
route.delete('/delete/:id',async(req,res)=>{
    try{
        await cart.remove({
            _id: req.params.id
        })
    }
    catch(err){
        console.log('error in deletion')
    }
    res.redirect('/')
})

module.exports = {route}