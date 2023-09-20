const express = require("express"); // npm install express , nodemon , you
//can take package.json and run npm install
// starts the server with npm start
const path = require("path");
//importing a file
const defaultRoutes=require('./routes/default');
const restaurantRoutes=require('./routes/restaurants');


const app = express();

// tells ejs where the views are stored
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs"); // we are saying that we will use a special
// whisch is ejs here // npm install ejs
// this handels html dynamic content
// app.use is used for any type of requests get/post
app.use(express.static("public")); // for every incoming request , if this request is to a file that can be found here , if it is the file will be returned
// turn all text in form to js objects
app.use(express.urlencoded({ extended: false }));

// this tells express that every route starts with a / should be handeled with this default routes
// this also means that every incoming request will go throght this default routes , and if there is a match in this file it is ok , if there is no , it will
// come back here again
app.use('/',defaultRoutes);
// if you haven't found them in default routes , go search for them in 
// restaurant roues
app.use('/',restaurantRoutes);


// this is put here because I don't want it to be executed except when
//the route entered is not anyone of the previous routes
app.use(function(req,res){
  /* note that : status returns an updated response */
  // I wanna set the status code of the response to indicate a failue before loading the oage
  res.status(404).render('404');
});


/*
the function passed to use here must have these 4 parameters 
to make express understand that this is the function that will be 
used to handle server-side error
*/
app.use(function(error, req , res , next){
  res.status(500).render('500');

});

app.listen(3000);
