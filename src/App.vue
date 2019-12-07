<template>
  <div>
    <div v-if="this.screen == 'start'">
      <startTemplate />
    </div>
    <div v-if="this.screen == 'game'">
      <ScreenCover v-if="this.playerCount < this.minimumPlayers" />
      <TopBar :startTimer="this.gameStart" :currentArtistID="this.currentArtist" :pickedWord="currentWord" :socket="this.socket"/>
      <div class="displayContentCenter">
        <Online :socket="this.socket" :currentArtistID="this.currentArtist" />
        <Canvas :currentArtistID="this.currentArtist" :socket="this.socket" :appConfigData="this.brushConfig" />
        <Chat :socket="this.socket" />
      </div>
      <Tool v-if="this.uniqueIdentifier == this.currentArtist" @brushConfig="updateBurshConfig" />
    </div>
    <div v-if="this.screen == 'end'">
      <endTemplate :socket="this.socket" :playerPosition="this.useless" />
    </div>
  </div>
</template>

<script>
  import Canvas from "./components/canvasTemplate.vue"
  import Online from "./components/onlineTemplate.vue"
  import Chat from "./components/chatTemplate.vue"
  import TopBar from "./components/topTemplate.vue"
  import Tool from "./components/toolTemplate.vue"
  import ScreenCover from "./components/coverTemplate.vue"
  import startTemplate from "./components/startTemplate.vue"
  import endTemplate from "./components/endTemplate.vue"
  import io from "socket.io-client";


export default {
  name: "app",
  components: {
    Canvas,
    Online,
    Chat,
    TopBar,
    Tool,
    ScreenCover,
    startTemplate,
    endTemplate
  },
  data() {
    return {
      socket: io("http://localhost:3000/"),
      screen: 'game',
      gameStart: false,
      uniqueIdentifier: "",
      playerCount: 0,
      minimumPlayers: 2,
      currentArtist: "",
      brushConfig: {
        size: 10,
        color: "#ffffff"
      },
      currentWord: "",
      useless: {}
    }
  },
  mounted() {
    this.socket.emit("user connected");
    let vm = this;

    this.socket.on("user count", function(userCount) {
      vm.playerCount = userCount;
    })
    this.socket.on("set Local", function(data) {
      localStorage.setItem("socketID", data.id);
      localStorage.setItem("uniqueIdentifier", data.uniqueID);
      vm.uniqueIdentifier = data.uniqueID;
    })
    this.socket.on("current artist", function(current) {
      vm.currentArtist = current;
    });

    setInterval(function() {
      if (vm.currentArtist == localStorage.getItem("uniqueIdentifier")) {
        if (vm.playerCount < vm.minimumPlayers) {
          vm.socket.emit("reset timer");
        } else {
          vm.socket.emit("decrease timer");
        }
      }
    }, 1000);

    this.socket.on("end screen", function(data) {
      vm.useless = data;
      vm.screen = 'end';
    });
  },
  methods: {
    updateBurshConfig: function(config) {
      this.brushConfig = config;
    }
  }
}
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
    background-color: #e2e2e5;
    overflow: hidden;
    font-family: "Inter UI", sans-serif;
  }

  .displayVerticallyCenter {
    display: flex;
    justify-content: center;
  }

  .displayHorizontalCenter {
    display: flex;
    align-items: center;
  }

  .displayContentCenter {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .displayCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .largeText {
    font-size: 40px;
    font-weight: 700;
  }

  .mediumText {
    font-size: 30px;
    font-weight: 500;
  }

  .smallText {
    font-size: 25px;
    font-weight: 500;
  }

  .smallerText {
    font-size: 20px;
    font-weight: 500;
  }

  .normalText {
    font-size: 18px;
    font-weight: 400;
  }
</style>
