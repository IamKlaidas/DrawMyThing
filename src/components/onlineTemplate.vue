<template>
  <div class="onlineContainer">
    <div v-bind:id="user.id" v-bind:key="user.id" v-for="user in userOnlineList"  class="userContainer" v-bind:style="{ 'background-color': user.cardColor }">
      <div class="currentPositionContainer displayCenter">
        <p class="smallText">{{ user.position }}</p>
      </div>
      <div class="nameContainer">
        <div class="name displayCenter normalText">
          <p>{{ user.name }}</p>
        </div>
        <div class="points displayCenter normalText">
          <p>{{ user.points }}</p>
        </div>
      </div>
      <div class="avatarContainer"></div>
    </div>
    <div v-if="this.uniqueID != this.currentArtistID" class="voteKickContainer displayCenter">
      <p class="smallerText">Vote Kick</p>
    </div>
  </div>
</template>

<script>
// 10 max players in a game.
export default {
  name: 'onlineTempalte',
  props: {
    socket: {
      type: Object
    },
    currentArtistID: {
      type: String
    }
  },
  data() {
    return {
      userOnlineList: [],
      uniqueID: localStorage.getItem("uniqueIdentifier")
    }
  },
  mounted() {
    let vm = this;

    this.socket.on("restart round", function() {
      for (let index = 0; index < vm.userOnlineList.length; index++) {
        document.getElementsByClassName("userContainer")[index].style.backgroundColor = vm.userOnlineList[index].cardColor;
      }
      document.getElementById("input").disabled = false;
    });

    this.socket.on("update color", function(data) {
      for (let index = 0; index < vm.userOnlineList.length; index++) {
        if (vm.userOnlineList[index].id == data.id) {
          document.getElementById(data.id).style.backgroundColor = "#97d87f";
        }
      }
    })
    //set max players to be 10
    this.socket.on('user online', function(data) {
      vm.userOnlineList = [];
      for (let index = 0; index < data.length; index++) {
        vm.userOnlineList.push({
          position: "",
          id: data[index].id,
          name: data[index].name,
          points: data[index].points,
          cardColor: vm.getColor(vm.userOnlineList.length)
        });
      }
    });
    // setTimeout(function() {
    //   setInterval(function() {
    //     if (vm.userOnlineList.length >= 2 && vm.currentArtistID == localStorage.getItem("uniqueIdentifier")) {
    //       if (vm.counter >= vm.userOnlineList.length-1) {
    //         vm.socket.emit("next artist");
    //       }
    //     }
    //   },1000);
    // },1000);
  },
  methods: {
    getColor: function(number) {
      if ((number % 2) == 0) {
        return "#eeeeee";
      } else {
        return "#ffffff";
      }
    },
    updateOrder: function() {
      //do something
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only :: Good height is 50-->
<style lang="scss" scoped>
  .onlineContainer {
    position: relative;
    margin-right: 5px;
    width: 250px;
    height: 576px;

    .userContainer {
      width: 100%;
      height: 50px;
      display: flex;

      div {
        height: 100%;
      }

      .currentPositionContainer {
        width: 20%;
      }
      .nameContainer {
        width: 60%;
        position: relative;
        top: 10%;

        div {
          width: 100%;
          height: 40%;

          p {
            margin: 0px;
          }
        }
      }
      .avatarContainer {
        width: 20%;
      }
    }

    .voteKickContainer {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0px;
      color: white;
      background-color: #ff9908;
    }
  }
</style>
