const express = require("express");
var app = express();
var path = require("path");

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
// app.use(express.static("/client/public"));
app.get("/api/c",(req,res)=>{
    var c=[
        {id:1,name:"tarang"},
        {id:2,name:"singhal"},
        {id:3,name:"kumar"}
    ];
    res.json(c);
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


var PORT = process.env.PORT || 5000;
app.listen(PORT,(req,res)=>{
    console.log(`Server Started at: ${PORT}!`);
})