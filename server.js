const express = require("express");
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get("/api/c",(req,res)=>{
    var c=[
        {id:1,name:"tarang"},
        {id:2,name:"singhal"},
        {id:3,name:"kumar"}
    ];
    res.json(c);
})


var PORT = process.env.PORT || 5000;
app.listen(PORT,(req,res)=>{
    console.log(`Server Started at: ${PORT}!`);
})