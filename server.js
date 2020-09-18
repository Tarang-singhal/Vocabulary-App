const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const graphQlSchema = require("./graphQl/schema/graphQlSchema");
const RootValue = require("./graphQl/rootValue/rootValue");
const { graphqlHTTP } = require("express-graphql");


app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    rootValue: {
        words: RootValue.words,
        addWord: RootValue.addWord
    },
    graphiql: true
}));

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