const { json, response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'pajaman10',
      database : 'smart-brain'
    }
  });

//midlewares

const app = express();
//transforma la info a lenguaje de javascript
app.use(express.json());
// permite ignorar la seguridad de crohme para mandar request
app.use(cors());



app.post('/signin',(req,res) => {signin.signinHandler(req,res,db,bcrypt)})
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res) => {profile.profileHandler(req,res,db)})
app.put('/image',(req, res) => {image.imageHandler(req, res, db)})
app.post('/imageurl',(req,res)=>{image.apiCallHandler(req,res)})



app.listen(3000,()=> {
    console.log('corre perfecto en el puerto 3000')
})