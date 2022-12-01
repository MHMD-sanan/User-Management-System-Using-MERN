const express=require('express');
const app=express();

const bodyParser = require('body-parser'); 

//app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use('/public',express.static(__dirname+'/public'))

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/week-6');
mongoose.connection.on("connected",(err)=>{  
    if(err){
        console.log('error'); 
    }
    else{
        console.log("mongodb connected successfuly");
    }
})

const userRouter=require('./routes/user.js');
app.use('/',userRouter);

const adminRouter=require('./routes/admin.js');
app.use('/admin',adminRouter);

app.listen(4000,()=>{
    console.log('connection started in 4000 ')
})