require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const graphQlSchema = require("./graphQl/schema/graphQlSchema");
const RootValue = require("./graphQl/rootValue/rootValue");
const { graphqlHTTP } = require("express-graphql");

//using cors() for cross origin request between server and client
app.use(cors());


//API GraphQL
app.use("/graphql", graphqlHTTP({

    //API Schema
    schema: graphQlSchema,

    //API functionalities
    rootValue: {

        //will return all word present in database
        words: RootValue.words,

        //will Request for a word from oxford API and save every single word in database
        addWord: RootValue.addWord
    },
    graphiql: true
}));


//production environment rules
if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.use(express.static("client/build"));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})

//Listening on PORT
var PORT = process.env.PORT || 5000;
app.listen(PORT,(req,res)=>{
    console.log(`Server Started at: ${PORT}!`);
})