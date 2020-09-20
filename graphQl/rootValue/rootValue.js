const rp = require("request-promise");
var MongoClient = require('mongodb').MongoClient;
var DATABASEURL = process.env.DATABASEURL || "mongodb://localhost/vocab";

module.exports = {

    // this function returns all words stored in database
    words: async()=>{
                return new Promise((resolve,reject)=>{
                    MongoClient.connect(DATABASEURL,{useUnifiedTopology: true},(err,db)=>{
                        if (err) reject(err);
                        var dbo = db.db("vocab");
                        dbo.collection("words").find({}).sort({_id:-1}).toArray((err,result)=>{
                            if(err) reject(err);
                            resolve(result);
                        });
                    })
                })
                .then((result)=>{
                    return result;
                }).catch((err)=>err);
            },

    //when a user adds a new word this function is called 
    //this function will make an API call to Oxford-Dictionary to get the data of that word if it is present
    //and the, save that data into database and return the saved word data to client side
    addWord: async(args)=>{
        
                //options while making oxford API call
                const option={
                    method: "GET",
                    url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${args.word}?fields=%2Cdefinitions%2Cexamples&strictMatch=${true}`,
                    headers:{
                        app_id: process.env.app_id,
                        app_key: process.env.app_key,
                    },
                    json: true
                }
                
                //API call and recieving data
                var data = await rp(option,(err)=>{
                    if(err){
                        console.error('error:', err); // Print the error if one occurred
                        reject(err);
                    }
                });


                return new Promise((resolve,reject)=>{

                    //saving recieved data to mongoDB
                    MongoClient.connect(DATABASEURL,{useUnifiedTopology: true},(err,db)=>{
                        if (err) reject(err);
                        var dbo = db.db("vocab");
                        dbo.collection("words").insertOne(data, function(err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            db.close();
                            resolve(res.ops[0]);
                        });
                    })
                })
                //returning new word
                .then((x)=>{return x;})
                .catch((err)=>err);
            }
}