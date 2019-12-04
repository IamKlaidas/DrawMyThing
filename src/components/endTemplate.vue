<template>
  <div class="displayCenter cover">
    <div class="positionContainer">
      <div class="topThree displayVerticallyCenter">
        <div class="firstPosition displayHorizontalCenter">
          <p class="largeText"><span class="gold">1st.</span> {{ playerPosition[0].name }}</p>
        </div>
        <div class="secondPosition displayHorizontalCenter">
          <p class="largeText"><span class="silver">2nd</span> {{ playerPosition[1].name }}</p>
        </div>
        <div class="thirdPosition displayHorizontalCenter">
          <p class="largeText"><span class="bronze">3rd</span> {{ playerPosition[1].name }}</p>
        </div>
      </div>
      <div class="bottomHalf displayVerticallyCenter">
        <div class="smallText" v-bind:key="players.key" v-for="players in playerPosition">
          <p>{{ players.position }}th. {{ players.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'topTemplate',
  props: {
    socket: {
      type: Object
    }
  },
  data() {
    return {
      playerPosition: []
    }
  },
  mounted() {
    let vm = this
    this.socket.on("end screen", function(data) {
      vm.playerPosition = data;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only :: Good height is 50-->
<style lang="scss" scoped>
  .cover {
    height: 100vh;
  }
  .positionContainer {
    width: 1000px;
    height: 500px;
    background-color: white;

    .topThree {
      display: flex;
      height: 50%;

      div {
        width: auto;
        height: 76%;
        margin-right: 10px;

        p {
          padding: 0px 20px;
        }
      }
    }
    .bottomHalf {
      display: flex;
      height: 50%;
      div {
        width: auto;
        height: auto;

        p {
          padding: 20px 20px;
        }
      }
    }
  }
  .gold {
    color: #f4c300;
  }

  .silver {
    color: #b3b5bb;
  }

  .bronze {
    color: #a6806c;
  }
</style>
