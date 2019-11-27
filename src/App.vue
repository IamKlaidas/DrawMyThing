<template>
  <div>
    <TopBar />
    <div class="displayContentCenter">
      <Online :socket="this.socket" />
      <Canvas :socket="this.socket" :appConfigData="this.brushConfig" />
      <Chat :socket="this.socket" />
    </div>
    <Tool @brushConfig="updateBurshConfig" />
  </div>
</template>

<script>
  import Canvas from './components/canvasTemplate.vue'
  import Online from './components/onlineTemplate.vue'
  import Chat from './components/chatTemplate.vue'
  import TopBar from './components/topTemplate.vue'
  import Tool from './components/toolTemplate.vue'
  import io from 'socket.io-client';


export default {
  name: 'app',
  components: {
    Canvas,
    Online,
    Chat,
    TopBar,
    Tool
  },
  data() {
    return {
      socket: io('http://localhost:3000/'),
      brushConfig: {
        size: 10,
        color: "#ffffff"
      }
    }
  },
  mounted() {
    this.socket.emit('user connected');
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
    font-family: 'Inter UI', sans-serif;
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
