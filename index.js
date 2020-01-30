const  mongodb = require('mongodb')
const express = require('express')
const MongoClient = mongodb.MongoClient
app = express()
const connectionURL= 'mongodb://127.0.0.1:27017'
const database = 'CRM-HR'

MongoClient.connect(connectionURL, {useNewUrlParser:true},(error,client)=>{
    if(error){
        return    console.log(error)
    }
    console.log('connection succesful')
})

module.exports={connectionURL}