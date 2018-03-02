var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    Contact         = require("./models/contact");
    
//routes require
var phonebookRoutes = require("./routes/phonebook");  

//app settings
mongoose.connect("mongodb://localhost/phonebook");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(phonebookRoutes);


//port   
app.listen(process.env.PORT, process.env.IP, function() {
 console.log("Server running at https://phonebook-jops.c9users.io/");       
});