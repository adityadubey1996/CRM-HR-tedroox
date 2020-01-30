const Mongoose = require('mongoose')
const connectionURL = require('../../index')
Mongoose.connect('mongodb://127.0.0.1:27017')
var validator = require('validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



const User = Mongoose.model('User',{
    name:{
        type:String,
        required : [true, 'enter a name']
    },
    number:{
        type:Number,
        required : [true, 'enter a phone number']
    },
    age:{
        type:Number,
        validate(value){
            if(value <0){
                throw new Error('age should be positive')
            }
        },
        required:true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: [true,'Email address is required'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is not valid')
            }
        },
        normalizeEmail(value)
    },
    date_of_birth:{
        type: Date,
        required: [true,'Date of Birth is required'],
        validate(value){
            if(validator.is)
        }
    },
    address:{
        type:String,
        required:true
    },
    job_role:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    team:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        validate(value){
            if(value !=='male' )
        }
        
    },



}) 


const name = new User({
    name:'aditya',
    number:'2352345423523',
    email:'adityadsduib@gmail.com',
    date_of_birth:'03/04/2020'
})

name.save().then(() =>{
    console.log(name)
}).catch((error) =>{
    console.log(error)
})