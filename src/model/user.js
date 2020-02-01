const Mongoose = require('mongoose');
var validator = require('validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const Userschema = new Mongoose.Schema({name:{
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
    unique:true,
    lowercase: true,
    required: [true,'Email address is required'],
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('email is not valid')
        }
    }

},
// password:{
//     type:String,
//     trim:true,
//     required:true,
//     validate(value){
//         if(value.lenght<7){
//             throw new Error("password length should be more than 7")
//         }
//     }
// },
date_of_birth:{
    type: Date,
    required: [true,'Date of Birth is required'],
    // validate(value){
    //     if(validator.is)
    // }
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
    // validate(value){
    //     if(value !=='male' )
    // }
    
}})



const User = Mongoose.model('User', Userschema) 


// const name = new User({
//     name:'aditya',
//     number:'2352345423523',
//     email:'adityadsdu1ib@gmail.com',
//     date_of_birth:'03/04/2020',
//     password:'aditya1',
//     gender:'male',
//     team:'someting',
//     designation:'something',
//     job_role:'something',
//     address:'something',
//     age:'21'
// })

// name.save().then(() =>{
//     console.log(name)
// }).catch((error) =>{
//     console.log(error)
// })


module.exports= User