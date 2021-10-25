//to implement CRUD operation

const express=require("express")

const { ObjectId } = require('bson');  //id kodukumbol mongodb yile collection il ulla recordinte 
//id thanne anennurappu varuthanan ingane kodukunnath.
//binary encoding js is bson. it converts integer and date type which json cant do.
//bson supports json while transferring data from node to mongo.

const router=express.Router();//to implement router from express

const { Employee }=require('../Models/employee') //employee collection require cheyunnu

//(3)index.js ill ninn ingotek
//thazhe ulla get request  execute cheyan ingane cheyanam-->localhost:3000/employees

//localhost:3000/employees -->EmployeesController il ninn router acces cheyan employees 
//base urlil append cheyanam
//reading from server
router.get('/',(req,res)=>{ //ella employee collections um kittan (get)  router set cheyunnu.
    
    Employee.find((err,docs)=>{//find() will retrieve all employees collection
      if(!err){
          res.send(docs);      //ella employee collections um kittan (get)  router set cheyunnu.
      }
      else{
          console.log('Error in retrieving Employee:'+JSON.stringify(err));
      }                      
    });
})//we have to configure few more routes in root file-index.js for that we have to export 
//the router object-->router
//writing to server
router.post('/',(req,res)=>{
    var emp=new Employee({
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary,
    })
    emp.save((err,doc)=>{
        if(!err){
          res.send(doc)
        }
        else{
            console.log('Error in Employee.save:' +JSON.stringify(err))
        }
    })//to insert new record into db we use this mongoose function-->save(). 
    //After saving the document it will call two parameters with err and docs
    //err and doc property koodathe _id property koodi und ath primary key pole an act cheyunne.
    //records collectionil ninn uniquely identify cheyanan ith use cheyunne.
});

//browser il localhost:3000/employees/oru particular id koduthal a id base cheythitulla  full data varanan
//thazhathe get routing kodukanath.ith kazhinj ObjectId require cheyanam mukalil
//finding person by id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.send(`no record with given id: ${req.params.id} ` );

    Employee.findById(req.params.id,(err,doc)=>{
        if(!err) {
            res.send(doc);
        }
        else {  
            console.log('Error in finding the person :'+ JSON.stringify(err)) 
        }
    });
})

//to update record
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))//id valid allengil error msg display cheyum
    return res.send(`No record with given id: ${req.params.id}`);
    //ini valid anengil thazhe koduthirikunnath pole oru update object use cheyum
    var emp={
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary,//post il insert cheyan kodutha object alla ith ,marich normal obj
        }//an. update cheyan ie emp.
        
        //ini id vach update cheyan findByIdAndUpdate() use cheyanam.
        Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{
          if(!err){
              res.send(doc)
            }
          else{
              console.log('Error in Employee Updation:'+JSON.stringify(err))
            }
        })//{$set:emp} e emp an put() koduthirikunna normal obj.
        //a emp yil run time il kerunna values vach pazhaya data update akum.
        //{new:true} kodukunnath kond updated aya employee details mathram display akum
        //allayirunnengil full recordsum display ayene
    
})

//deletion
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
      return res.send(`No record with given id: ${req.params,id}`)
      
      //ini id valid anengil a record delete cheyan findByIdAndRemove() use cheyunnu
      Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
          if(!err){
              res.send(doc);
          }else{
              console.log('Error in Employee Deletion:'+JSON.stringify(err))
          }
      })
})

module.exports=router;  //after this move to index.js