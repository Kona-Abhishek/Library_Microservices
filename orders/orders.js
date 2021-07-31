const express=require('express')
const app=express()
const axios=require('axios')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const { response } = require('express')
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://Abhishek:abhi@1998@cluster0.0ja26.mongodb.net/NodeJS?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log(`Database Connected`)
}).catch(err=>console.log(err))

require('./Order')
const Order=mongoose.model("Order")

app.post("/order",(req,res)=>{
    var newOrder={
        customerID:mongoose.Types.ObjectId(req.body.customerID),
        bookID:mongoose.Types.ObjectId(req.body.bookID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    }
    var order=new Order(newOrder)
    order.save().then(()=>{
        console.log(`Order created with Success!...`)
    }).catch(err=>console.log(err))
    res.send(`Order was created`)
})

app.get('/orders',(req,res)=>{
    Order.find().then(response=>{
        res.json(response)
    }).catch(err=>console.log(err))
})

app.get('/order/:id',(req,res)=>{
    Order.findById(req.params.id).then(order=>{
        const orderObject={customerName:'',booktitle:''}
        if(order){
            axios.get(`http://localhost:5000/customer/${order.customerID}`).then(response=>{
                 orderObject.customerName=response.data.name
                 
            }
                
            ).catch(err=>console.log(err))
            axios.get(`http://localhost:4545/book/${order.bookID}`).then(response=>{
                orderObject.booktitle=response.data.title
                
                res.json(orderObject)
            }).catch(err=>console.log(err))
            
        }
        
    }).catch(err=>console.log(err))
})

app.listen(9000,(req,res)=>{
    console.log(`Up and hitting-Order service`)
})