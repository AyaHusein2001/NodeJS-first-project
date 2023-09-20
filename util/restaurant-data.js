const fs = require("fs");
const path = require("path");
// .. -> go to a higher level
const filePath = path.join(__dirname,'..', "data", "restaurants.json");

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath); //1st read the data that is alrady in the file
  const storedRestaurants = JSON.parse(fileData); //parsing this data into a js array
  // this will sort ascendingly
  storedRestaurants.sort(function(resA,resB){
    // if letter a is greater than b , ret 1 
    // means if t is greater than a , which is the case , ret 1
    // 1 means flip , ya2ne hatly ba2a el a di 2bl el t else -1 means do not flip
    if(resA> resB)
    {
      return 1;
    }
    else{

      return -1;
    }

  });
  
  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); //3rd is rewriting the file but with the new data , hint : stringify turns the js array into a text


}
// here i am choosing what can be imported from this file in other files
// in lhs is the name will be used there
// in rhs is the name used in this file
module.exports={ 
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants:storeRestaurants 
};