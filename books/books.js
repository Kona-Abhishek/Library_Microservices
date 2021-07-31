const express=require('express')
const app=express()
const mongoose=require('mongoose')
require('./Book')
const bodyParser=require('body-parser')

app.use(bodyParser.json())



 mongoose.connect("mongodb+srv://Abhishek:abhi@1998@cluster0.0ja26.mongodb.net/NodeJS?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true })
 .then(()=>{
     console.log(`Database connected!....`)
 }).catch(err=>console.log(err))









const Book=mongoose.model("Book")
app.get('/',(req,res)=>{
 res.send(`Welcome to Books Service`)
})
app.post("/book",(req,res)=>{
    console.log(req.body)
   
    var newBook={
        title:req.body.title,
        author:req.body.author,
        numOfPages:req.body.numOfPages,
        publisher:req.body.publisher
    }
    
    var book=new Book(newBook)
    console.log(book)
    book.save().then(()=>{
        console.log(`New Book Created!`)
    }).catch(err=>{
        if(err){
            throw err
        }
    })
 res.send(`A new book created with success`)
})


app.get('/books',(req,res)=>{
    Book.find().then(response=>{
        res.json(response)
        console.log(response)
    }).catch(err=>console.log(err))
})

app.get('/book/:id',(req,res)=>{
    Book.findById(req.params.id)
    .then(response=>{
        if(response){
            res.json(response)
        }
        else{
            res.status(404).send(`Invalid ${req.params.id}`)
        
    }
        
    }).catch(err=>{
        if(err){
            console.log(err)
        }
    })
})

app.delete('/book/:id',(req,res)=>{
    Book.findByIdAndDelete(req.params.id).then(()=>{
        res.send(`Book with id ${req.params.id} is deleted`)
    }).catch(err=>{
        if(err){
            console.log(err)
        }
    })
})


app.listen(4545,()=>{
    console.log(`Up and hitting - Books Service`)
})