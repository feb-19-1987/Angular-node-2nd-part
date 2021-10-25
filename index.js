const express=require('express')
const bodyParser=require('body-parser');

// ividek mongo db connect cheyan -->
const {mongoose} =require('./db');//destructuring structure


const cors = require('cors')    //is a mechanism for accessing data on various data types from different domains.
//that data types could be images,stylesheets,js scripts,iframes and videos.
//ie for connecting both angular and node.ie localhost 4200 and localhost 3000 thammill data transferring smooth akum.
const app=express(); //to work with express package we have to call the cofunction express like this and result 
//will be within app variable here

app.use(bodyParser.json());//inorder to configure express middleware to send json data to node js project.
//domains(name of website address), we are passing bodyParser.json

app.use(cors())

const employeeController=require('../NodeJS/Controller/EmployeeController')//baki ulla routing set cheyan 
//EmployeeController.js il ninn ingotek vannekuvan.athin EmployeeController.js ine require cheyanam (1)



app.use('/employees',employeeController)
//app.use('/employees',employeeController)//after (1) this step(2)-->
//to add router from EmployeesController into this application we call the middleware() -->app.use

app.use('/',(req,res)=>{
    res.send("Welcome");
})//localhost:3000 kodukumbol welcome enn varum.ngOnInit pole

//connection part
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server started at port : ${PORT}`)
}); //to start express server
