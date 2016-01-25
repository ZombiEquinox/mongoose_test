import express from 'express';
var api = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*Mongoose
***************************************************/
mongoose.connect('mongodb://localhost/riverlpex');

var db = mongoose.connection;
db.on('error',console.error.bind(console,"connection error:"));
db.once("open",function(){
  //Connected!
  var activitySchema = mongoose.Schema({
    _comment: String,
    name: {
      first: String,
      middle: String,
      last: String,
      title: [String],
    },
    photo:{
      src: String
    },
    field: String,
    specialty: [String],
    interests: [String],
    sex: String,
    language: [String],
    titles: [String],
    education: [
      {
        name: String,
        location: String
      }
    ],
    internship: [
      {
        name: String,
        location: String
      }
    ],
    residency: [
      {
        name: String,
        location: String
      }
    ],
    fellowship: [
      {
        name: String,
        location: String
      }
    ],
    certification:[String],
    memberships:[String],
    website:[String],
    publications:{
      name: String,
      url: String
    },
    associated:[
      {
        name: String,
        url: String
      }
    ],
    office: [
      {
        office: String,
        address: String,
        city: String,
        floor: String,
        state: String,
        zip: Number,
        phone: Number,
        fax: Number,
        hours: {
          days: String,
          time: String
        }
      }
    ],
    bio:[
      {
        q: String,
        a: String
      }
    ]
  })
  var Staff = mongoose.model("staff", staffSchema, "staff");

  var fieldSchema = mongoose.Schema({
    department: String,
    description: String,
    subfields: [{
      field: String,
      description: String
    }]
  });
  var Field = mongoose.model("field", fieldSchema, "fields");


  //Create
  api.post('/staff',(req,res) => {
    if(req.body && !req.body.id){
      Staff.create(req.body.id, req.body, (err,result) =>{
        err ? res.send(err) : res.send(req.body);
      });
    } else {
      res.send({error:"Use PUT to update an entry."});
    }
  });

  //Read all staff
  api.get('/staff',(req,res) => {
    // console.log(req);
     Staff.find({}).exec(function(err,result){
       err ? res.send(err) : res.json(result);
     });
  });

  //Read by ID
  api.get('/staff/id/:id',(req,res) => {
    // console.log(req);
    Staff.find({"_id":req.params.id}).exec((err,result)=>{
      err ? res.send("ERROR!" + err) : res.json(result);
    });
  });

  //Read by Field
  api.get('/staff/field/:field',(req,res) => {
    // console.log(req);
    Staff.find({"field":req.params.field}).exec((err,result)=>{
      err ? res.send("ERROR!" + err) : res.json(result);
    });
  });

  //Update
  api.put('/staff',(req,res) => {
    if(req.body && req.body.id){
      Staff.findByIdAndUpdate(req.body.id, req.body, (err,result) =>{
        err ? res.send(err) : res.send(req.body);
      });
    } else {
      res.send({error:"You need to send a body with an id to update."});
    }
  });

  //Delete
  api.delete('/staff',(req,res) => {
    if(req.body && req.body.id){
      Staff.findByIdAndRemove({id : req.body.id}).exec( (err,result) => {
        err ? res.send(err) : res.send(req.body);
      });
    } else {
      res.send({error:"You need to send a body with an id to remove."});
    }
  });

  api.get('/fields',(req,res) => {
    console.log(req);
     Field.find({}).exec(function(err,result){
       if(err) res.send(err);
       res.send(result);
     });
  });

  api.get('/fields',(req,res) => {
    res.send("Poop");
  });
});

export default api;
