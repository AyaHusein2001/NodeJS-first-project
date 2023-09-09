const express = require("express");
const path = require('path');
const fs = require('fs')

const app= express();
// app.use is used for any type of requests get/post
app.use(express.static('public'));// for every incoming request , if this request is to a file that can be found here , if it is the file will be returned
// turn all text in form to js objects
app.use(express.urlencoded({extended: false}));

app.get("/",function(req,res){
    const htmlFilePath = path.join(__dirname,"views",'index.html');

});

app.get("/restaurants",function(req,res){
    const htmlFilePath = path.join(__dirname,"views",'restaurants.html');
    res.sendFile(htmlFilePath);
    
});

app.get("/recommend",function(req,res){
    const htmlFilePath = path.join(__dirname,"views",'recommend.html');
    res.sendFile(htmlFilePath);
    
});
// yes you can define get & post for the same route but no 2 gets or 2 posts
app.post('/recommend',function(req,res){
const restaurant = req.body.name;
   const filePath = path.join(__dirname,"data",'restaurants.json');
   const fileData =fs.readFileSync(filePath);//1st read the data that is alrady in the file
   const storedRestaurants = JSON.parse(fileData);//parsing this data into a js array
    storedRestaurants.push(restaurant);//2nd add the new element to the array that has been read
    fs.writeFileSync(filePath,JSON.stringify(storedRestaurants));//3rd is rewriting the file but with the new data , hint : stringify turns the js array into a text 
    res
});

app.get("/confirm",function(req,res){
    const htmlFilePath = path.join(__dirname,"views",'confirm.html');
    res.sendFile(htmlFilePath);
    
});

app.get("/about",function(req,res){
    const htmlFilePath = path.join(__dirname,"views",'about.html');
    res.sendFile(htmlFilePath);
    
});




app.listen(3000);