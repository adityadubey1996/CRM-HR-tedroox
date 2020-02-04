const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Hrschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
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
        
    },
    number:{
        type:Number,
        required : [true, 'enter a phone number']
    },

    employee_id:{
        type:String
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
Hrschema.methods.generateauthtoken = async function (){
    const user = this
    console.log('from generateauthtoken')
    
    const token = jwt.sign({email : user.email.toString() }, 'secretKey')
    user.tokens = user.tokens.concat({ token:token})
   
    await user.save()
    return token
}

Hrschema.statics.findByCredentials = async (email,password) =>{
    
    const user = await Hr.findOne({'email':email})
    
    
    console.log(user)
    console.log(user.password)
    console.log(password)
    // console.log(bcrypt.compareSync(password, user.password))
    if(!user){
        res.status(404).send()
        throw new Error('unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Error('password does not match')
    }
    return user
    
   
    
}

Hrschema.pre('save', async function(next){
   console.log('middleware')
   const user = this
   const password = user.password
  
   if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
}

    
       



   

   


   next()
    
})

const Hr = mongoose.model('Hr', Hrschema)

module.exports = Hr