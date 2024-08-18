const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const bodyParser = require('body-parser'); 
const app = express();
const cors= require('cors')

app.use(cors())
app.use(bodyParser.json()); 

const port = 3000;

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = 'Vaultify';

client.connect()
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  app.get('/', async (req, res) => {
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  });

  app.post('/', async (req, res) => {
    const passwords=req.body
   const result= await collection.insertOne(passwords);
    res.json({sucess:true, result:result}); 
    
  });
  
  app.delete('/', async (req, res) => {
    const passwords=req.body
   const result= await collection.deleteOne(passwords);
    res.json({sucess:true, result:result}); 
  });

  app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });

