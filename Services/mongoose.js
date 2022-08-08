const mongoose = require("mongoose");
const dbconnect = async () =>
{
    try
    {
        await mongoose.connect("mongodb+srv://karan:2juL5S2kUcHaSi2B@cluster0.logyfb8.mongodb.net/moviebooking?retryWrites=true&w=majority",{
            useUnifiedTopology : true,
            useNewUrlParser : true
        })

        console.log("MongoDB Connect");
    }
    catch(error)
    {
        console.log(`Connection Fail ${error}`);
    }
}

module.exports = dbconnect;