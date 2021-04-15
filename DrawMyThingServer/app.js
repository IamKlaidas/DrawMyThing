const express = require("express")
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = 3000;
const url = "http://localhost:8080/";

let data = [];
let currentWord = "";
let currentArtistIndex = 0;
let userCorrectAnswer = 0;
let currentTime = 60

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", url);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function generateID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function generateThreeWords() {
  return ["Rabbit", "Dog", "Super"]
}

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", function(socket){
  console.log(`user connected: ${socket.id}`);

  socket.on("user connected", function() {
    data.push({
      id: socket.id,
      uniqueID: generateID(),
      name: "jimmy",
      points: 0
    });
    for (let index = 0; index < data.length; index++) {
      if (data[index].id == socket.id) {
        io.to(socket.id).emit("set Local", {id: data[index].id, uniqueID: data[index].uniqueID})
      }
    }
  });

  socket.on("update canvas", function(config) {
    io.emit("update canvas", config);
  });

  socket.on("send Message", function(messageInfo) {
    if (messageInfo.message.toLowerCase() == currentWord.toLowerCase()) {
      userCorrectAnswer += 1;

      io.to(socket.id).emit("send Message", {message: messageInfo.message, correct: true})
      
      if (userCorrectAnswer >= data.length-1 ) {
        if (currentArtistIndex != data.length-1) {
          currentArtistIndex += 1;
          console.log(`current: ${data[currentArtistIndex].uniqueID}`)
        } else {
          currentArtistIndex = 0;
          console.log(`current: ${data[currentArtistIndex].uniqueID}`)
        }
        io.emit("restart round", data[currentArtistIndex].uniqueID);
        currentTime = 60;
      }
    } else {
      io.emit("send Message", {message: messageInfo.message, correct: false});
    }
  });

  socket.on("next round", function() {
    if (currentArtistIndex != data.length-1) {
      currentArtistIndex += 1;
      console.log(`current: ${data[currentArtistIndex].uniqueID}`)
    } else {
      currentArtistIndex = 0;
      console.log(`current: ${data[currentArtistIndex].uniqueID}`)
    }
      currentTime = 60;
      io.emit("restart round", data[currentArtistIndex].uniqueID);
  });

  socket.on("update onlineColor", function(data) {
    io.emit("update color", {hex: data.hex, id: data.emitTo});
  });

  socket.on("decrease timer", function() {
    currentTime -= 1;
  });

  socket.on("reset timer", function() {
    currentTime = 60;
  });

  socket.on("increment score", function(config) {
    for (let index = 0; index < data.length; index++) {
      if (data[index].uniqueID == config.id) {
        data[index].points += 1;
      }
    }
  });

  socket.on("change word", function(word) {
    currentWord = word;
    io.emit("word change", word)
  });

  socket.on("recieve word", function() {
    io.emit("get word", generateThreeWords());
  });

  setInterval(function() {
    io.emit("user online", data);
    io.emit("user count", data.length);
    io.emit("decrease timer", currentTime);
    if (data.length > 0) {
      io.emit("current artist", data[currentArtistIndex].uniqueID);
    }
  },1000/60);

  socket.on("get positions", function() {
    io.emit("send positions");
  })

  socket.on("end game", function(data) {
    io.emit("end screen", data);
  })

  socket.on("disconnect", function() {
    console.log(`user disconnected: ${socket.id}`)
    for (let index = 0; index < data.length; index++) {
      if (data[index].id == socket.id) {
        data.splice(index, 1);
        currentArtistIndex = 0;
      }
    }
  });
});

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});
