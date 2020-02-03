const express = require('express')

const router = new express.Router()

const Hr = require('../model/Hr')
const path = require('path')
const auth = require('../middlewares/auth')



router.post('/hr', async (req, res) => {
    
    console.log(req.body)
    const user = new Hr(req.body)
    
    try{
        await user.save()
        const token = await user.generateauthtoken()
        res.status(201).send({user})
    }
    catch (e){
        res.status(400).send(e)

    }
})

router.get('/create_hr',(req,res)=>{
    res.render('patch')
})

router.get('/update/hr')

router.get('/hr',(req,res)=>{
    
    Hr.find({}).then((User)=>{
    
        console.log(User.length)
        res.send(User)
         res.render('index',{user:User})
    }).catch((e)=>{
        res.status(500).send()
    })
})  

router.get('/hr/find_by_email',(req,res)=>{
    var user1 = req.query.email
    
    Hr.findOne({'email' : user1}).then((User)=>{
        res.send(User)}).catch((e)=>{
            res.status(403).send()
        })
    })
router.patch('/hr/find_by_email_and_update',async(req,res)=>{
  
    console.log(req.params)
    console.log(req.body)
    const updates = Object.keys(req.body)
    
    const validUpdates = ['name','email','address',
    'team',
    'designation',
    'job_role',
    'address',
    'date_of_birth',
    'age','number','password','gender','employee_id']
    
    const isvalidupdate = updates.every((update)=>{
        return validUpdates.includes(update)
    })

    if(!isvalidupdate){
        return res.status(400).send({error:'not a valid update'})
    }

    try{
    var user1 = req.query.email
   
    const user = await Hr.findOneAndUpdate(user1, req.body, {new:true, runValidators:true, })
    console.log(user)
    updates.forEach((update)=>{
        user[update] = req.body[update]
        console.log(user[update])
    })

    await user.save()


    if(!user){
        return res.status(404).send()
    }

    res.send(user)
    }
    catch(e){
        res.status(400).send()
    }
    })


router.post('/hr/tests/login' ,async (req,res)=>{
    
    
    
    console.log(req.body.email)
    console.log(req.body.password)
    
    // console.log(req.body.email)
    // console.log(req.body.password)
    console.log('hr/login')
    // console.log(req.body)
    try{
            
        const User = await Hr.findByCredentials(req.body.email, req.body.password)
          
        res.render('user', {user:User})
        const token = await User.generateauthtoken()
        
        
    }catch(e){
        res.status(400).send()
        
    }
    
})

router.get('/hr/test', (req,res)=>{
    res.render('login')
})



module.exports = router
