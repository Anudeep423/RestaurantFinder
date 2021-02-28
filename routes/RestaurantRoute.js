const express = require('express');
const router = express.Router();
const {createRestaurant} = require("../Controllers/restaurantCont");
const {getRestaurant,getAllRestaurants,removeRestaurant,getRestaurantIdById,updateRestaurantDetails} = require("../controllers/restaurantCont")

//get Restaurant by ID
router.param("RestaurantId", getRestaurantIdById);
//Post Request to Create Restaurant
router.post("/create/restaurants",createRestaurant);
//Get Restaurnts by providing latitute longitude if It is in Given Radius
router.get("/getRestaurant/:lat/:long/:radius",getRestaurant);
// Get all Restairants
router.get("/getAllRestaurants",getAllRestaurants);
//Delete Restaurants
router.delete(
    "/removeRestaurant/:id",
  
    removeRestaurant
  );
// Update Restaurant Details
  router.put('/updateRestaurantDetails/:id' ,updateRestaurantDetails )


module.exports = router