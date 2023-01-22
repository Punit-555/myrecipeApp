//jshint esversion:6
const https = require("https");
const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const user = {
    firstName: 'Punit',
    lastName: 'Sharma',
}

app.get('/', (req, res) => {
    res.render('home', { user });
});


// for posting the Data.

app.get("/contact", function (req, res) {
    res.render('contact');
});

app.get("/about", function (req, res) {
    res.render('about');
});



app.post("/", function (req, res) {
    const apiKey = "6db9e2d2f5b044f48a84dec0be033f5f";
    let input = req.body.foodName;
    const url =  "https://api.spoonacular.com/recipes/complexSearch?apiKey=6db9e2d2f5b044f48a84dec0be033f5f&query=tomato";
  
    const options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        qs: {q: input},
        headers: {
          'X-RapidAPI-Key': '536c30b475msh43b577d55418735p153dd2jsn3f245da7bec7',
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
          useQueryString: true
        }
      };
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
          const myData = JSON.parse(body);
          res.write("<h1 style=text-align:center> <u>"+  "Recipe's for  " + input +" </u></h1>" + "<br>");
        
          for(let i = 0 ; i < myData.hits.length; i++){
            res.write("<h3 style=margin-left:9%><i><u>"+(i+1)+ "."  + myData.hits[i].recipe.label +"</u></i></h3>"); 
            res.write("<h4 style=margin-left:15%> Ingredients : </h4>");
             res.write("<li style=margin-left:20%>" + myData.hits[i].recipe.ingredientLines + "</li>");
             res.write("<li style=margin-left:20%>" + "<img style=border-radius:100%  src=" + myData.hits[i].recipe.image +">"  + "</li>");
        }
            res.end();
      });
});




app.listen(8080, function () {
    console.log("Server is Running..." );
});