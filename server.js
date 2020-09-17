const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const rp = require("request-promise");
const Word = require("./models/Word");

app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`
        type wordType{
            _id: ID!
            word: String!
            definition: String
            lexicalCategory:String
        }

        type RootQuery{
            words: [wordType]
        }
        type RootMutation{
            addWord(word: String):wordType
        }
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {

        words: async()=>{
            var allWords = await Word.find({}).sort({_id: -1});
            return allWords;
        },

        addWord: async(args)=>{
            const option={
                method: "GET",
                url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${args.word}?fields=%2Cdefinitions%2Cexamples&strictMatch=${true}`,
                headers:{
                    app_id: process.env.app_id || "cfc735b6",
                    app_key: process.env.app_key || "1a44b6a0b4b3c69cf8ade1282911cca7"
                },
                json: true
            }
            
            var data = await rp(option,(err)=>{
                if(err){
                    console.error('error:', err); // Print the error if one occurred
                }
            })
            // console.log(data);
            var word = new Word({
                word: data.id,
                definition: data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],
                // example: data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text, 
                lexicalCategory: data.results[0].lexicalEntries[0].lexicalCategory.text,
            });
            // console.log(word);
            await Word.create(word,(err)=>{
                if(err){
                    return err;
                }
            });
            return word;
        }
    },
    graphiql: true
}));





var DATABASEURL = process.env.DATABASEURL || "mongodb://localhost/vocab";
mongoose.connect(DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connected!");
}).catch(() => {
    console.log("DataBase not Connected!");
})



app.get("/api/c/:word",(req,res)=>{
    const word=req.params.word;
    const option={
        method: "GET",
        url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?fields=%2Cdefinitions%2Cexamples&strictMatch=${true}`,
        headers:{
            app_id: "cfc735b6",
            app_key: "1a44b6a0b4b3c69cf8ade1282911cca7"
        },
        json: true
    }
    rp(option,(err,response,body)=>{
        if(err){
            console.error('error:', err);
        }
        res.json(body);
    })
})

// app.get("/",(req,res)=>{
//     res.send("API HOME PAGE!");
// })


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