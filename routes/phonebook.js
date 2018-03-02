var express = require("express");
var router = express.Router();
var Contact = require("../models/contact");

//index
router.get("/", function(req, res){
    if(req.query.search && req.query.type === "name") {
        const regex = new RegExp(escapeRegex(req.query.search, req.query.type), 'gi');
        Contact.find({"name": regex}, function(err, foundContact){
            if(err) {
                console.log(err);
            } else {
                for(var i = 0; i < foundContact.length; i++) {
                    var num = foundContact[i].addedNumbers;
                    foundContact[i].defaultNumber = num.find(function(element){
                     return element.default === true;
                });
                }
                res.render("index", {contacts: foundContact});
            }
        }); 
    } else if(req.query.search && req.query.type === "surname") {
        const regex = new RegExp(escapeRegex(req.query.search, req.query.type), 'gi');
        Contact.find({"surname": regex}, function(err, foundContact){
            if(err) {
                console.log(err);
            } else {
                for(var i = 0; i < foundContact.length; i++) {
                    var num = foundContact[i].addedNumbers;
                    foundContact[i].defaultNumber = num.find(function(element){
                     return element.default === true;
                });
                }
                res.render("index", {contacts: foundContact});
            }
        });
    } else if(req.query.search && req.query.type === "number") {
        const regex = new RegExp(escapeRegex(req.query.search, req.query.type), "gi");
        Contact.find({"defaultNumber": {"number":regex}}, function(err, foundContact){
            if(err) {
                console.log(err);
            } else {
                for(var i = 0; i < foundContact.length; i++) {
                    var num = foundContact[i].addedNumbers;
                    foundContact[i].defaultNumber = num.find(function(element){
                     return element.default === true;
                });
                }
                res.render("index", {contacts: foundContact});
            }
        });
    }  else {
        Contact.find({}, function(err, foundContact){
            if(err) {
                console.log(err);
            } else {
                for(var i = 0; i < foundContact.length; i++) {
                    var num = foundContact[i].addedNumbers;
                    foundContact[i].defaultNumber = num.find(function(element){
                     return element.default === true;
                });
                }
                res.render("index", {contacts: foundContact});
            }
        });
    }
});

//new
router.get("/new", function(req, res) {
    res.render("new");
});

//create
router.post("/", function(req, res) {
    var phoneType = [];
    var phoneNumber = [];
    var phoneDefault = [];
    var numbers = [];
    for(var i = 0; i < req.body.phoneNumber.length; i++) {
        phoneType = req.body.phoneType;
        phoneNumber = req.body.phoneNumber;
        phoneDefault = req.body.phoneDefault;
        var number = {"phone": phoneType[i], "number": phoneNumber[i], "default": phoneDefault[i]};
        numbers.push(number);
    }
    var name = req.body.name;
    var surname = req.body.surname;
    var address = req.body.address;
    var email = req.body.email;
    
    
    var info = {"name": name, "surname": surname, "address": address, "email": email};
    Contact.create(info, function(err, createdContact){
        if(err) {
            console.log(err);
            res.redirect("/new");
        } else {
            for(var i = 0; i < numbers.length; i++) {
                createdContact.addedNumbers.push(numbers[i]);
            }
            createdContact.save(function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/");
                }
            });
        }
    });
});


//show
router.get("/:id", function(req, res) {
   Contact.findById(req.params.id, function(err, foundContact) {
     if(err){
         console.log(err);
     } else {
         res.render("show", {contact: foundContact});
     }
   });
});

//edit
router.get("/:id/edit", function(req, res) {
   Contact.findById(req.params.id, function(err, foundContact){
       if(err) {
           console.log(err);
           res.redirect("/" + req.params.id);
       } else {
           res.render("edit", {contact: foundContact});
       }
   });
});

//update
router.put("/:id", function(req, res){
    var phoneType = [];
    var phoneNumber = [];
    var phoneDefault = [];
    var numbers = [];
    for(var i = 0; i < req.body.phoneNumber.length; i++) {
        phoneType = req.body.phoneType;
        phoneNumber = req.body.phoneNumber;
        phoneDefault = req.body.phoneDefault;
        console.log(phoneNumber);
        var number = {"phone": phoneType[i], "number": phoneNumber[i], "default": phoneDefault[i]};
        numbers.push(number);
    }
    var name = req.body.name;
    var surname = req.body.surname;
    var address = req.body.address;
    var email = req.body.email;
    
    
    var info = {"name": name, "surname": surname, "address": address, "email": email, "addedNumbers": numbers};
    Contact.findByIdAndUpdate(req.params.id, info, function(err, updatedContact) {
        if(err) {
            console.log(err);
            res.redirect("/" + req.params.id + "edit");
        } else {
            for(var i = 0; i < updatedContact.length; i++) {
                var num = updatedContact[i].addedNumbers;
                updatedContact[i].defaultNumber = num.find(function(element){
                 return element.default === true;
                });
            }
            res.redirect("/" + req.params.id);
        }
    });
});

//delete
router.delete("/:id", function(req, res){
    Contact.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/" + req.params.id);
        } else {
            res.redirect("/");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;