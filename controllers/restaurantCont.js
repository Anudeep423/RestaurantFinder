const Restaurant = require("../Models/Restaurants")

//Get Restaurant Detilas by providing Id
exports.getRestaurantIdById = (req, res, next, id) => {
  Restaurant.findById(id).exec((err, restaurant) => {
    if (err) {
      return res.status(400).json({
        error: "Restaurant not found in DB"
      });
    }
    req.restaurant = restaurant;
    next();
  });
};


exports.createRestaurant = async (req,res) => {
  try{
    const {Rating} =  req.body
     
           var avg = 0;

         Rating.map( (item ,i) => {
           avg = avg + item
         })

         console.log(avg)


       // res.send(req.body);
       var newData = new Restaurant({...req.body,AverageRating : avg/4 , TotalRatings : Rating.length })
   
       const savedpatDets = await newData.save();
      return res.send(savedpatDets)
       // await Restaurant.create(req.body).
       // then(data => data.json({message: 'patient Graph Details saved successfully', result: data}))

       

} catch (err) {
 res.status(400).json({
   status: 'fail',
   message: err
 });
}
}

exports.getAllRestaurants = async (req,res) => {

  const rest = await Restaurant.find({})

  res.json(rest);

}

exports.removeRestaurant = (req, res) => {
  const restaurant = req.restaurant;

  restaurant.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this Restaurant"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};

exports.updateRestaurantDetails = (req,res) => {

  console.log(req.params.id)

  Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
  .then(result => {
      if(!result) {
          return res.status(404).send({
              message: "Restaurant details not found"
          });
      }
      else
      res.send({message: "Restaurant details was updated successfully.", data: result });
  })
}

// Get Restaunts/Restaurant if they are in Given Radius
exports.getRestaurant = async (req,res) => {

  const lat1 = req.params.lat

  const long1 = req.params.long

  const radius = req.params.radius

  console.log(radius)

  // console.log(lat1,long1,radius);

  const rest = await Restaurant.find({})
        
  const final = [...rest]

  let resFound = []

const resu =   final.filter( (item,index) => {
 const res =  getDistanceFromLatLonInKm(lat1,long1,item.location.lat,item.location.long) * 1000
 if(res <= radius){
   console.log(res);
   resFound.push(item)
 }
} )

    res.json({resFound })
}
// Algorithm to find Distance Between two Locations using latitite and longitude of both places
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
