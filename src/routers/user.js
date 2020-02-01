const express = require('express')
const router = new express.Router()
const User = require('../model/user')


router.post('/users', (req, res) => {
    
   
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})



router.get('/users',(req,res)=>{
    User.find({}).then((User)=>{
        res.send(User)
    }).catch((e)=>{
        res.status(500).send()
    })
})  

router.get('/users/find_by_email',(req,res)=>{
    var user1 = req.query.email
    
    User.findOne({'email' : user1}).then((User)=>{
        res.send(User)}).catch((e)=>{
            res.status(403).send()
        })
    })
router.patch('/users/find_by_email_and_update',async(req,res)=>{
  

    const updates = Object.keys(req.body)
    const validUpdates = ['name','email','address',
    'team',
    'designation',
    'job_role',
    'address',
    'age','number','gender']
    
    const isvalidupdate = updates.every((update)=>{
        return validUpdates.includes(update)
    })

    if(!isvalidupdate){
        return res.status(400).send({error:'not a valid update'})
    }

    try{
    var user1 = req.query.email
   
    const user = await User.findOneAndUpdate(user1, req.body, {new:true, runValidators:true, })
    if(!user){
        return res.status(404).send()
    }

    res.send(user)
    }
    catch(e){
        res.status(400).send()
    }
    })

module.exports = router