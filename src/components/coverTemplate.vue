<template>
  <div class="screenCoverTemplate displayContentCenter">
    <p class="largeText">Game will start when atleast 2 users are connected!</p>
  </div>
</template>

<script>
// 10 max players in a game.
export default {
  name: 'onlineTempalte',
  props: {
    socket: {
      type: Object
    }
  },
  data() {
    return {
      temp: "test"
    }
  },
  mounted() {
    // let vm = this;

  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only :: Good height is 50-->
<style lang="scss" scoped>
  .screenCoverTemplate {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    z-index: 1;

    p {
      color: white;
    }
  }
</style>
