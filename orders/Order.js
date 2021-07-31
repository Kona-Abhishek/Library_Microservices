const mongoose=require('mongoose')

mongoose.model("Order",{
    customerID:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    bookID:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    initialDate:{
        type:Date,
        require:true
    },
    deliveryDate:{
        type:Date,
        require:true
    }
})