const express =require('express');
const app=express();
const {Client, Pool} =require('pg');
const bcrypt=require('bcrypt');
const { name } = require('ejs');
const hi=require("./models/t");
Sequelize =require('sequelize');

const sequelize = new Sequelize(
 'testdb',
 'postgres',
 'Ramya',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync().then((e)=>{console.log(e) }).catch((e )=>{ console.log(e) });

 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.render('index');
});
app.get("/users/register",(req,res)=>{
    res.render('register');
});
app.get("/users/login",(req,res)=>{
    res.render('login');
});
app.get("/users/dashboard",(req,res)=>{
    res.render('dashboard',{user:"Ramya"});
});
 //let insertquery= `INSERT INTO login (Name,Email,Password,Password2) VALUES  ($1,$2,$3,$4);`
 
const pass= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/;

app.post("/users/register",async (req,res) =>{
    let {name,email,password,password2}=req.body;
    

    let errors=[];
    if(!name ||!email ||!password ||!password2){
        errors.push({message:"please enter all the fields"});
    }
    if (!password.match(pass)){
        errors.push({message:"password have a upper,lower,num"})
    }
    if(password!=password2){
        errors.push({message:"passwords not match"})
    }
    if(errors.length>0){
        res.render('register',{errors});
    }
    if(errors.length==0){
        store([name,email,password,password2]).then(d=>console.log(d))
        
    }
    console.log({
        name,email,password,password2
    })
})

let insertquery= `INSERT INTO public.users(
    name, email, password, password2) VALUES($1,$2,$3,$4)`;
 
async function  store(data){
    
        let x1 = await sequelize.query(insertquery,data);
        return x1;
 }


app.listen(4500,()=>{
    console.log("server running at 4500...");
});
 
    

