const express = require("express");
const route = express.Router();
const authFile = require("../Services/authentication");
const User = require("../Models/user");
const Movie = require("../Models/booking");


route.post("/moviecreate" , authFile.authenticationChecker, async (req,res) =>
{
    try {
        const ticketData = {
            movieImage : req.body.movieImage,
            Title : req.body.Title,
            Categorie : req.body.Categorie,
            Language : req.body.Language,
            BackImg : req.body.BackImg,
            likes : req.body.likes,
            time : req.body.time,
            type : req.body.type,
            About : req.body.About,
            Quality : req.body.Quality,
            casterimg : req.body.casterimg,
            casterName : req.body.casterName
        }
    
        await Movie.create(ticketData);
    
        return res.send("Movie Successfully Created");
    } catch (error) {
        console.log(error);
    }
})

route.get("/moviedelete/:movieid", authFile.authenticationChecker, async (req,res) =>
{
    try {
        const id  = req.params.movieid;

        await Booking.findByIdAndDelete(id);
    
        return res.send("Movie Successfully Delete");
    } catch (error) {
        console.log(error);
    }
})

route.get("/getMovies",authFile.authenticationChecker,async (req,res) =>
{
    try {
        const movies  =  await Movie.find({});

        return res.send(movies);
    } catch (error) {
        console.log(error);
    }
})


route.get("/getMovies/:id",authFile.authenticationChecker, async(req,res) =>
{
    try {
        const id = req.params.id;
        const movies = await Movie.findById(id);
        return res.send(movies);
    } catch (error) {
        console.log(error);
    }
})


route.post("/moviebooking/:movieid" , authFile.authenticationChecker,async (req,res) =>
{
    try {
        const userid = req.body.id;
        const movieId = req.params.movieid;
    
        const user = await User.findByIdAndUpdate(userid,{
           $push : {moviebooking : movieId}
        },
        {
            new : true,
            runValidators :true,
        })
    
        return res.send(user);   
    } catch (error) {
        console.log(error);
    }
})

route.post("/MoviedetailUpdate/:movieid" , authFile.authenticationChecker, async (req,res) =>
{
    try {
        const id = req.params.movieid;
        const updation = await Movie.findByIdAndUpdate(id,{
            BackImg : req.body.BackImg,
            likes : req.body.likes,
            time : req.body.time,
            type : req.body.type,
            About : req.body.About,
            Quality : req.body.Quality,
            casterimg : req.body.casterimg,
            casterName : req.body.casterName
        },
        {
            new : true,
            runValidators : true
        })
        console.log(updation);
        return res.send(updation);
    } catch (error) {
        console.log(error);
    }
})

module.exports = route;