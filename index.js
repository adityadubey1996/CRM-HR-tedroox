const express = require('express')
require('./src/db/moongose')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const app = express()
const Userrouter = require('./src/routers/user')
const Hrrouter = require('./src/routers/hr')

const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'../CRM-HR/src')))
hbs.registerPartials(path.join(__dirname,'../CRM-HR/src/partials'))

app.set('views', path.join(__dirname,'../CRM-HR/src/views'))
app.set('view engine','hbs')

app.use(Userrouter)
app.use(Hrrouter)

// app.post('/users', (req, res) => {
    
   
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })



// app.get('/users',(req,res)=>{
//     User.find({}).then((User)=>{
//         res.send(User)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })  

// app.get('/users/find_by_email',(req,res)=>{
//     var user1 = req.query.email
    
//     User.findOne({'email' : user1}).then((User)=>{
//         res.send(User)}).catch((e)=>{
//             res.status(403).send()
//         })
//     })
// app.patch('/users/find_by_email_and_update',async(req,res)=>{
  

//     const updates = Object.keys(req.body)
//     const validUpdates = ['name','email','address',
//     'team',
//     'designation',
//     'job_role',
//     'address',
//     'age','number','password','gender']
    
//     const isvalidupdate = updates.every((update)=>{
//         return validUpdates.includes(update)
//     })

//     if(!isvalidupdate){
//         return res.status(400).send({error:'not a valid update'})
//     }

//     try{
//     var user1 = req.query.email
   
//     const user = await User.findOneAndUpdate(user1, req.body, {new:true, runValidators:true, })
//     if(!user){
//         return res.status(404).send()
//     }

//     res.send(user)
//     }
//     catch(e){
//         res.status(400).send()
//     }
//     })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})