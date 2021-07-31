const express=require('express')
const app=express()

const mongoose=require('mongoose')
require('./Customer')
const bodyParser=require('body-parser')
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://Abhishek:abhi@1998@cluster0.0ja26.mongodb.net/NodeJS?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('Database connected!...')
})
.catch(err=>console.log(err))

const Customer=mongoose.model("Customer")
app.post("/customers",(req,res)=>{
    
    var newCustomer={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }
    const customer = new Customer(newCustomer)
    customer.save().then(()=>{
        console.log(`New Customer created!...`)
    }).catch(err=>console.log(err))
    res.send(`Customer data is inserted`)
    
   console.log(req.body)
})

app.get('/customers',(req,res)=>{
    Customer.find()
    .then(response=>{
        res.json(response)
    }).catch(err=>console.log(err))
})

app.get('/customer/:id',(req,res)=>{
    Customer.findById(req.params.id).then(response=>{
        res.json(response)
    }).catch(err=>console.log(err))
})

app.delete('/customer/:id',(req,res)=>{
    Customer.findByIdAndDelete(req.params.id).then(
        ()=>{
            console.log('Deleted Customer!...')
        }
    ).catch(err=>console.log(err))
    res.send('Customer is deleted')
})


app.listen(5000,()=>{
console.log(`Up and hitting - Customer Service`)
})