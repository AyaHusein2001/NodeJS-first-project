const express = require('express');

const router = express.Router();// router is an object like app ta2reeban , el farq el waheed en app dah bensta5demoh marah wahda bas fi el app koloh


router.get("/", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'index.html');
  // res.sendFile(htmlFilePath);

  //instead of html , we will use render that renders a template
  res.render("index");
});

router.get("/about", function (req, res) {
//   const htmlFilePath = path.join(__dirname, "views", "about.html");
//   res.sendFile(htmlFilePath);

  res.render("about");
});

// this will allow us to merge our routes in the main file
module.exports=router;