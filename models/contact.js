var mongoose = require("mongoose");

var contactSchema = new mongoose.Schema ({
    name: String,
    surname: String,
    address: String,
    email: String,
    addedNumbers: [
        { phone: String,
        number: String,
        default: Boolean
        }
    ],
    defaultNumber:
        { phone: String,
        number: String,
        default: Boolean
        }
    
});

module.exports = mongoose.model("Contact", contactSchema);