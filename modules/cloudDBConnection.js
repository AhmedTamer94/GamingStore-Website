/***in future trying to connect to atlas data base */
const  mongoose = require('mongoose');
const url = 'url: string';
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

    // Database Name

const dbName = 'gamingStoreProject';

/*******************store game data to data base ****************************/

class cloudDataBase{
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
 #connect() {
    // Use connect method to connect to the server
      console.log("submit data");
      mongoose.connect(url,connectionParams)
      .then( () => {
          console.log('Connected to the database ')
      })
      .catch( (err) => {
          console.error(`Error connecting to the database. n${err}`);
      })

  }
  addData(gameData){
    this.#connect();
    //const db = mongoose.Connection(dbName);
    //var collection = db.('gameData');
    //const result=await collection.insertMany([gameData]);
    mongoose.disconnect();
  }
  getGamesData() {
    let gamesData;
    // Use connect method to connect to the server
    this.#connect();
    /*console.log('Connected successfully to server');
    const db = client.db(dbName);
    var collection = db.collection('gameData');
    gamesData=await collection.find({}).toArray();
    console.log("data got");
    client.close();
    return gamesData;*/
    mongoose.disconnect();
  }
  getDataByKeyword(keyword){
    let gamesData;
    // Use connect method to connect to the server
    this.#connect();
    /*console.log('Connected successfully to server');
    const db = client.db(dbName);
    var collection = db.collection('gameData');
    gamesData=await collection.find({searchKeyword: {$regex:keyword}}).toArray();
    console.log("data got");
    client.close();
    return gamesData;*/
    mongoose.disconnect();
  }
  getDataById(id){
    let gamesData;
    // Use connect method to connect to the server
    this.#connect();
    /*console.log('Connected successfully to server');
    const db = client.db(dbName);
    var collection = db.collection('gameData');
    gamesData=await collection.find({_id: id}).toArray();
    console.log("data got");
    client.close();
    return gamesData;*/
    mongoose.disconnect();
  }
}


module.exports=cloudDataBase;