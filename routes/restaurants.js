const express = require('express');

const router = express.Router();// router is an object like router ta2reeban , el farq el waheed en router dah bensta5demoh marah wahda bas fi el router koloh
const fs = require("fs");

const resData=require('../util/restaurant-data');


//a package generates a unique id automatically
const uuid=require('uuid');


router.get("/restaurants", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'restaurants.html');
  // res.sendFile(htmlFilePath);

  const storedRestaurants = resData.getStoredRestaurants();

  
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

// we will use this url for any id , so we used this : syntax
/*
  something important to note :
  this path is 2 steps deeper and for any files used inside this page it will search in a folder called
  restaurants , but there is no such a folder , so it will give an error if the styles or scripts 
  had a relative path , so we need to make it absolute by using a / before it .
  
  */
router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id; // extracting the id from thr url
  const storedRestaurants = resData.getStoredRestaurants(); //1st  read current restaurants

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'recommend.html');
  // res.sendFile(htmlFilePath);

  res.render("recommend");
});
// yes you can define get & post for the same route but no 2 gets or 2 posts
router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  // v4 is a function that generates a random id and guaranteed to be unique
  restaurant.id = uuid.v4(); // trying to access a property called id , which doesnot exist , so js will create it for us.

  const restaurants = resData.getStoredRestaurants(); //1st  read current restaurants
  restaurants.push(restaurant); //2nd add the new element to the array that has been read
  resData.storeRestaurants(restaurants); // write updated rests
  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'confirm.html');
  // res.sendFile(htmlFilePath);

  res.render("confirm");
});
module.exports=router;
