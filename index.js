const express=require("express");
const app=express();
const parser=require("body-parser");
//const mongoClient=require("mongodb").MongoClient;

//let databaseDB;
// mongoClient.connect("",(err,database)=>{
// 	if(err) return console.log(err);
// 	databaseDB=database;
// 	app.listen(3000,()=>{
// 		console.log("listening on 3000");
// 	});

// });
app.use(parser.urlencoded({extended: true}));
app.set("view engine","ejs");
const MongoClient=require("mongodb").MongoClient;
let db;
app.use(express.static('public'));
app.use(parser.json());


// let database = null;


// new MongoClient('mongodb://@ds239931.mlab.com:39931/vishnu-crud-test', {
//     auth: {
//        user: 'vishnu-venu',
//        password: 'nemesis101',
//     }
// }).connect(
//     (err, db) => {
//       if (err) return console.error(err);
//       console.log('Database connected');
//       database = db.db('vishnu-crud-test'); 
// });

MongoClient.connect("mongodb://vishnuvenu:nemesis101@ds239931.mlab.com:39931/vishnu-crud-test",(err,client)=>{
  console.log("hii");
  if(err)console.log(err);

    db=client.db("vishnu-crud-test");
  
  app.listen(3000,()=>{
		console.log("listening on 3000");
  });
  }

);

  app.get("/",function(req,res){

    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      
      res.render('index.ejs', {quotes: result})
      })
    
    //res.sendFile(__dirname+"/index.html");
  });

  app.post('/quotes', (req,res) => {
    db.collection("quotes").save(req.body,(err,result)=>{
      if(err)console.log(err);
      res.redirect("/");
      console.log("connected to database");
    })
  
    })

    app.put("/quotes",(req,res)=>{
      db.collection('quotes')
.findOneAndUpdate({name: 'dsf'}, {
$set: {
name: req.body.name,
quote: req.body.quote
}
}, {
sort: {_id: -1},
upsert: true
}, (err, result) => {
if (err) return res.send(err)
res.send(result)
})
    })

    app.delete('/quotes', (req, res) => {
      db.collection('quotes').findOneAndDelete({name: req.body.name},
      (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'vishnu quote got deleted'})
      })
      });

// 


// app.post('/quotes', (req, res) => {
// 	console.log(req.body);
//   // databaseDBb.collection('quotes').save(req.body, (err, result) => {
//   //   if (err) return console.log(err)
//   //   console.log('saved to database')
//   //   res.redirect('/')
//   // })
// });
