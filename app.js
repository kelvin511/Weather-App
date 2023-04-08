const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
     
    res.sendFile(__dirname+"/index.html")



    
   
});

app.post("/",function(req,res){
    
    const query = req.body.cityName;
    const apiKey = "b173749a39a93a5855314ef8130f096a";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp;
            
            const weatherDescription = weatherData.weather[0].description;

            const icon= weatherData.weather[0].icon;
            
            const imageUrl ="https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write( "<h1>The temperature in " +query+" is "+temp+ " degrees</h1>");
            
            res.write("<h2> The condition is " + weatherDescription + "</h2>");
            res.write("<img src= "+imageUrl+"></img>");
            res.end();
        });
    });

});


app.listen(3000,function(){
    console.log("Server Started and running on port 3000"); 
});