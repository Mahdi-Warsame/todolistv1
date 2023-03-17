 const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js");


const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];

app.get("/", function(req, res){

	let day = date.getDate();

	res.render("list",{listTitle:day,
		taskInput:items});
	
});

app.get("/work", function(req, res){
	res.render("list",{listTitle:"Work List",taskInput:workItems});
});

app.get("/about", function(req, res){
	res.render("about");
})
app.post("/", function(req, res){
	let newItem = req.body.input1;
	if(req.body.list === "Work"){
		workItems.push(newItem);
		res.redirect("/work");
	}
	else{
		items.push(newItem);
		res.redirect("/");	
	}
	
});



app.listen(3000, function(){
	console.log("Server is running on port 3000.");
});