const express = require("express");

const mongoose = require("mongoose");

// Name of restaurant: ***
// ii. Description of restaurant: ***
// iii. Location of restaurant(Co-ordinates)(used for retrieval): ***
// iv. Ratings[ ]: ***

const Restaurant = new mongoose.Schema({
    Name : {
        type : String,
        required : true
        
    },
    Description : {
        type : String,
        required : true
    },
    location : {
        type : Object,
        required : true
        
    },
    Rating : {
        required : true,
        type : Array
    },
    AverageRating : {
       type : String
    },
    TotalRatings : {
        type : Number
    }
  
  
    

})


const restaurant = mongoose.model('Restaurants', Restaurant);

module.exports = restaurant;
