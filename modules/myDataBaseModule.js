const  { MongoClient } = require('mongodb');
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'gamingStoreProject';

/*******************store game data to data base ****************************/

class myDataBaseModule{
  getData(req){
    let gameData={
        _id:req.body.id,
        gameName: req.body.gameName,
        searchKeyword: req.body.searchKeyword,
        gamePrice: req.body.gamePrice,
        gameRating: req.body.gameRating,
        gameQTY: req.body.gameQTY,
        gameImg: req.body.gameImg,
        gamePromo: req.body.gamePromo,
        gameDescription: req.body.gameDescription,
        gameRequirement: req.body.gameRequirement
    };
    return gameData;
}
async  #addGame(gameData) {
  // Use connect method to connect to the server
  try {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  var collection = db.collection('gameData');
  const result=await collection.insertMany([gameData]);
} catch (error) {
  return res.json({ message: "Could not store data." });
}
  return 'data added';
}
  addData(gameData){
    this.#addGame(gameData)
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
  }
  async  getGamesData() {
    let gamesData;
    // Use connect method to connect to the server
    try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    var collection = db.collection('gameData');
    gamesData=await collection.find({}).toArray();
  } catch (error) {
    return res.json({ message: "Could not get data." });
  }
    console.log("data got");
    client.close();
    return gamesData;
  }
  async getDataByKeyword(keyword){
    let gamesData;
    // Use connect method to connect to the server
    try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    var collection = db.collection('gameData');
    gamesData=await collection.find({searchKeyword: {$regex:keyword}}).toArray();
  } catch (error) {
    return res.json({ message: "Could not get data." });
  }
    console.log("data got");
    client.close();
    return gamesData;
  }
  async getDataById(id){
    let gamesData;
    // Use connect method to connect to the server
    try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    var collection = db.collection('gameData');
    gamesData=await collection.find({_id: id}).toArray();
  } catch (error) {
    return res.json({ message: "Could not get data." });
  }
    console.log("data got");
    client.close();
    return gamesData;
  }
}


module.exports=myDataBaseModule;