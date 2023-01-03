//import node modules mongodb, cors, my data base module handler, body parser for post methods
const express= require('express');
const DBModule= require('./modules/myDataBaseModule');
var cors = require('cors');
const bodyParser = require('body-parser')
const dbModule= new DBModule();
const app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.static('/views'),express.static('./views/'));



//add games dta application
app.get('/addGameData',(req,res)=>{
    res.sendFile( __dirname + "/"+"views/addGameView.html");
})
//home url
app.get('/ATAGameStore',(req,res)=>{
  console.log("home");
  //trying to handle 'http://localhost:3000/ATAGameStore/' request
  if(req.path=="/ATAGameStore/"){
    /********generates error */
    res.redirect('/ATAGameStore');
  }
  res.sendFile( __dirname + "/"+"views/home.html");
})
//submit data entry for every game
app.post('/dbwebapiSubmit',(req,res)=>{
    let gameData=dbModule.getData(req);
    dbModule.addData(gameData);
    res.redirect('/addGameData');
    
})
//get games data to preview in home page
app.get('/ATAGameStore/gamesData',(req,res)=>{
      dbModule.getGamesData().then((data)=>{
      res.status(200).send(JSON.stringify(data));
    })
    .catch(console.error)
})
//search url 
app.get('/ATAGameStore/s?',(req,res)=>{
  res.status(200).sendFile(__dirname + "/"+"views/search.html");
})
//send game data in search page by get url and split the string to get the first game name
app.get('/search=*',(req,res)=>{
  let keyword=req.url.split('=');
  let _keyword=keyword[1].split('+');
  dbModule.getDataByKeyword(_keyword[0].toLowerCase())
  .then((gameData)=>{
    res.status(200).send(JSON.stringify(gameData));
  });
})
//send html file when go to a game url
app.get('/ATAGameStore/product/*',(req,res)=>{

  res.sendFile(__dirname+"/"+"views/product.html");
})
//search the game using id which is in it's url page
app.get('/product/:id',(req,res)=>{
  dbModule.getDataById(req.params.id.slice(1)).
  then((gameData)=>{
    res.status(200).send(JSON.stringify(gameData));
  });
  
})

app.listen(3000,()=>{console.log("listen on port 3000");});
