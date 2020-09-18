const rp = require("request-promise");
var MongoClient = require('mongodb').MongoClient;
var DATABASEURL = process.env.DATABASEURL || "mongodb://localhost/vocab";

module.exports = {
    
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

    addWord: async(args)=>{
                const option={
                    method: "GET",
                    url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${args.word}?fields=%2Cdefinitions%2Cexamples&strictMatch=${true}`,
                    headers:{
                        app_id: process.env.app_id,
                        app_key: process.env.app_key,
                    },
                    json: true
                }
                
                var data = await rp(option,(err)=>{
                    if(err){
                        console.error('error:', err); // Print the error if one occurred
                        reject(err);
                    }
                });
                return new Promise((resolve,reject)=>{
                    
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
                }).then((x)=>{return x;})
                .catch((err)=>err);
            }
}