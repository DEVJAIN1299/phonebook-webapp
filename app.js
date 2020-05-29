var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"), 
    mongoose        = require("mongoose"),
    PhoneBook         = require("./phonebook.js");
   // seedDB          = require("./seeds.js");
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
mongoose.connect("mongodb+srv://aman:12345@cluster0-et2bg.mongodb.net/test?retryWrites=true&w=majority");

//seedDB();

app.get("/", (req, res)=>{
	let search = req.query.search
	obj = {{ $or:[ {"name": { "$regex": search, "$options": "i" }}, {"phoneNo": search}, {"email": search}]}}
	if(search == undefined){
		obj = {}
	}
	PhoneBook.find(obj, function(err, records){
		
        if(err)
         res.render("new.ejs");
        else
         res.render("home.ejs", {records: records});
    });	
})

app.get("/new", function(req,res){
    res.render("new.ejs");
});


app.post("/new", function(req,res){
    console.log(req.body.record);
    PhoneBook.create(req.body.record, function(err, newRecord){
        if(err)
         console.log(err);
        else
         res.redirect("/");
    });
});

app.get("/:id/edit/", (req, res)=>{
	PhoneBook.findById(req.params.id, function(err, foundRecord){
        if(err)
         res.redirect("/");
        else
         res.render("edit.ejs", {record: foundRecord});
    });
})

app.post("/:id/edit/",function(req,res){
    console.log(req.body.record)
    PhoneBook.findByIdAndUpdate(req.params.id, req.body.record, function(err, success){
        if(err)
         res.redirect("/");
        else
         res.redirect("/");
    });
});

app.get("/:id/delete/", function(req, res){
	PhoneBook.findByIdAndRemove(req.params.id, (err)=>{
		if(err)
			console.log(err)
		else
			res.redirect("/")
	})
})


app.listen(process.env.PORT | 3000, function(){
    console.log("Server Started");
});