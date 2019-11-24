<template>
  <div class="chatContainer">
    <div class="messageContainer">
      <p  class="normalText displayHorizontalCenter" v-bind:key="content.id" v-for="content in messages" v-bind:style="{ 'background-color': content.BGColor }">
        {{ content.msg }}
      </p>
    </div>
    <div class="textBoxContainer displayCenter">
      <input v-on:keyup.enter="emitMessage()" type="text" class="normalText" v-model="currentMessage">
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
        currentMessage: "",
        messages: []
      }
    },
    mounted() {
      const $ = jQuery;
      window.$ = $;
      let vm = this;

      this.socket.on("send Message", function(message) {
        if (message == "rabbit") {
          console.log("word got")
        } else {
          vm.messages.push({
            msg: message,
            BGColor: vm.getColor(vm.messages.length)
          });
        }
        setTimeout(function() {
          $(".messageContainer").animate({ scrollTop: $(".messageContainer")[0].scrollHeight }, "slow")
        }, 1000/60)
      })
    },
    methods: {
      getColor: function(number) {
        if ((number % 2) == 0) {
          return "transparent";
        } else {
          return "#ffffff";
        }
      },
      emitMessage: function() {
        this.socket.emit("send Message", this.currentMessage);
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
