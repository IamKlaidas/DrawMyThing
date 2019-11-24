<template>
  <div class="displayCenter">
    <div class="topContainer">
      <div class="timerContainer largeText">
        <p>{{ timer }} <span class="mediumText">Round {{ round.current }}/{{ round.total }}</span></p>
      </div>
      <div class="hiddenWordContainer mediumText">
        <p>{{ word.hidden }}</p>
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'topTemplate',
  data() {
    return {
      timer: 60,
      round: {
        current: 1,
        total: 5
      },
      word: {
        hidden: "",
        unhidden: "Rabbit"
      }
    }
  },
  mounted() {
    for (let hiddenIteration = 0; hiddenIteration < this.word.unhidden.length; hiddenIteration++) {
      this.word.hidden += "_ ";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only :: Good height is 50-->
<style lang="scss" scoped>
  .displayCenter {
    display: flex;
    justify-content: center;
  }

  $boxHeight: 60px;
  $timerWidth: 215px;
  $boxWidth: 1684px;
  $hiddenWidth: $boxWidth - $timerWidth;

  .topContainer {
    top: 124px; //139 to be on the canvas
    position: absolute;
    display: flex;
    // left: 116px;
    width:  $boxWidth;
    height: $boxHeight;
    background-color: white;

    .timerContainer {
      height: 100%;
      width: $timerWidth;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .hiddenWordContainer {
      height: 100%;
      width: $hiddenWidth;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  
</style>
