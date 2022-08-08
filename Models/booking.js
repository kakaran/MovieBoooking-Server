const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    movieImage : 
    {
        type : String,
        required : true
    },
    Title : 
    {
        type : String,
        required : true
    },
    Categorie : 
    {
        type : String,
        required : true
    },
    Language : {
        type : String,
        required : true
    },
    BackImg : {
        type : String,
        required : true
    },
    likes : {
        type : String,
        required :true
    },
    time : {
        type : String,
        required : true
    },
    type : {
        type : String
    },
    About : {
        type : String,
        required : true
    },
    Quality : 
    {
        type: String,
        required :true
    },
    casterimg : [
        {
            type : String,
            required : true
        }
    ],
    casterName : [
        {
            type : String,
            required :true
        }
    ]
},
{
    timestamps : true
});

const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie;
