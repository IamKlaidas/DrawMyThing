<template>
  <div v-if="!this.wordSelected" class="coverCanvas displayContentCenter">
    <div @click="emitWord(option.word)" class="displayContentCenter" v-bind:key="option.id" v-for="option in wordOption">
      <p class="mediumText">{{ option.word }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'topTemplate',
  props: {
    startTimer: {
      type: Boolean
    },
    currentArtistID: {
      type: String
    },
    socket: {
      type: Object
    }
  },
  data() {
    return {
      wordSelected: false,
      wordOption: [
        {
          word: ""
        },{
          word: ""
        },{
          word: ""
        }
      ],
    }
  },
  mounted() {
    this.socket.emit("recieve word")
    let vm = this
    this.socket.on("get word", function(data) {
      for(let index = 0; index < data.length; index++) {
        vm.wordOption[index].word = data[index];
      }
    })
  },
  methods: {
    emitWord: function(word) {
      this.socket.emit("change word", word);
      this.wordSelected = true;
    },
    getRandomWords: function() {
      this.socket.emit("recieve word");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only :: Good height is 50-->
<style lang="scss" scoped>
  .coverCanvas {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);

    div {
      background-color: white;
      width: 25%;
      height: 25%;
      margin: 0px 10px;
    }

    p {
      position: absolute;
    }
  }
</style>
