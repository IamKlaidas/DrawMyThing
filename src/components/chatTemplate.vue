<template>
  <div class="chatContainer">
    <div class="messageContainer">
      <p class="normalText displayHorizontalCenter" v-bind:key="content.id" v-for="content in messages" v-bind:style="{ 'background-color': content.BGColor, 'color': content.textColor }">
        {{ content.msg }}
      </p>
    </div>
    <div class="textBoxContainer displayCenter">
      <input id="input" v-on:keyup.enter="emitMessage()" type="text" class="normalText" v-model="currentMessage">
    </div>
  </div>
</template>

<script>
  import jQuery from "jquery";

  export default {
    name: "chatTemplate",
    props: {
      socket: {
        type: Object
      }
    },
    data() {
      return {
        secretWord: "",
        currentMessage: "",
        messages: []
      }
    },
    mounted() {
      const $ = jQuery;
      window.$ = $;
      let vm = this;

      this.socket.on("restart round", function() {
        document.getElementById("input").disabled = false;
      });

      this.socket.on("word change", function(word) {
        vm.secretWord = word;
        console.log("new", vm.secretWord);
      })

      this.socket.on("send Message", function(data) {
        if (data.correct) {
          vm.messages.push({
            msg: `Great you've you got it: "${data.message}", +1 point`,
            BGColor: vm.getColor(vm.messages.length),
            textColor: "#56ce27"
          });
          document.getElementById("input").disabled = true;
          vm.emitCorrect(localStorage.getItem("socketID"));
        } else {
          vm.messages.push({
            msg: data.message,
            BGColor: vm.getColor(vm.messages.length),
            textColor: "#000000"
          });
        }
        setTimeout(function() {
          $(".messageContainer").animate({ scrollTop: $(".messageContainer")[0].scrollHeight }, "slow")
        }, 1000/60)
      })
    },
    methods: {
      emitCorrect(id) {
        this.socket.emit("increment score", {score: 1, id: localStorage.getItem("uniqueIdentifier")});
        this.socket.emit("update onlineColor", {hex: "#97d87f", emitTo: id});
      },
      getColor: function(number) {
        if ((number % 2) == 0) {
          return "transparent";
        } else {
          return "#ffffff";
        }
      },
      emitMessage: function() {
        this.socket.emit("send Message", {message: this.currentMessage, id: localStorage.getItem("socketID")});
        this.currentMessage = ""
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="scss" scoped>
  $chatboxContainerWidth: 400px;
  $textPaddingSize: 5px;
  $chatContainerHeight: 576px;
  $textBoxContainerHeight: 40px;
  $messageContainerHeight: $chatContainerHeight - $textBoxContainerHeight;

  .chatContainer {
    position: relative;
    width: $chatboxContainerWidth;
    height: $chatContainerHeight;
    background-color: #eeeeee;

    .messageContainer {
      position: absolute;
      top: 0px;
      width: 100%;
      height: $messageContainerHeight;
      overflow: hidden;
      overflow-y: scroll;

      p {
        width: $chatboxContainerWidth - $textPaddingSize;
        height: 30px;
        margin: 0px;
        padding-left: $textPaddingSize;
      }
    }

    .textBoxContainer {
      position: absolute;
      width: 100%;
      height: $textBoxContainerHeight;
      bottom: 0px;

      input {
        width: 96%;
        height: 79%;
        border: none;
        padding-left: 5px;
      }
    }
  }
</style>
