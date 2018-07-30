const express=require("express");
const app=express();
const parser=require("body-parser");
//const mongoClient=require("mongodb").MongoClient;

let databaseDB;
// mongoClient.connect("",(err,database)=>{
// 	if(err) return console.log(err);
// 	databaseDB=database;
// 	app.listen(3000,()=>{
// 		console.log("listening on 3000");
// 	});

// });

app.listen(3000,()=>{
		console.log("listening on 3000");
	});

app.use(parser.urlencoded({extended: true}));


app.post('/quotes', (req, res) => {
	console.log(req.body);
  // databaseDBb.collection('quotes').save(req.body, (err, result) => {
  //   if (err) return console.log(err)
  //   console.log('saved to database')
  //   res.redirect('/')
  // })
});
