const express = require("express"); // npm install express , nodemon , you
//can take package.json and run npm install
// starts the server with npm start
const path = require("path");
const fs = require("fs");

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

app.get("/", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'index.html');
  // res.sendFile(htmlFilePath);

  //instead of html , we will use render that renders a template
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'restaurants.html');
  // res.sendFile(htmlFilePath);
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/recommend", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'recommend.html');
  // res.sendFile(htmlFilePath);

  res.render("recommend");
});
// yes you can define get & post for the same route but no 2 gets or 2 posts
app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath); //1st read the data that is alrady in the file
  const storedRestaurants = JSON.parse(fileData); //parsing this data into a js array
  storedRestaurants.push(restaurant); //2nd add the new element to the array that has been read
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //3rd is rewriting the file but with the new data , hint : stringify turns the js array into a text
  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  // const htmlFilePath = path.join(__dirname,"views",'confirm.html');
  // res.sendFile(htmlFilePath);

  res.render("confirm");
});

app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);

  res.render("about");
});

app.listen(3000);
