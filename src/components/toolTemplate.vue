<template>
  <div class="displayVerticallyCenter">
    <div class="toolContainer">
      <div class="colorSwatchContainer">
        <div class="currentColor"></div>
        <div class="colorOptions">
          <div @click="changeCurrentColor(color.hex)" v-bind:key="color.id" v-for="color in colorOption" v-bind:style="{ 'background-color': color.hex }"></div>
        </div>
      </div>
      <div class="toolOptionContainer">
        <div class="brush selected"></div>
        <div class="eraser"></div>
        <div class="paintBucket"></div>
      </div>
      <div class="brushSizeContainer">
        <div class="small"></div>
        <div class="medium"></div>
        <div class="large"></div>
        <div class="xLarge"></div>
      </div>
      <div class="clearScreenContainer"></div>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'topTemplate',
  data() {
    return {
      currentSelectedSize: 10,
      currentSelectedColor: "#000000",
      colorOption: [
        {
          colorName: "white",
          hex: "#ffffff"
        },{
          colorName: "grey",
          hex: "#c1c1c1"
        },{
          colorName: "red",
          hex: "#ef130b"
        },{
          colorName: "orange",
          hex: "#ff7100"
        },{
          colorName: "yellow",
          hex: "#ffe400"
        },{
          colorName: "green",
          hex: "#00cc00"
        },{
          colorName: "light blue",
          hex: "#00b2ff"
        },{
          colorName: "blue",
          hex: "#231fd3"
        },{
          colorName: "purple",
          hex: "#a300ba"
        },{
          colorName: "pink",
          hex: "#d37caa"
        },{
          colorName: "brown",
          hex: "#a0522d"
        },{
          colorName: "black",
          hex: "#000000"
        },{
          colorName: "dark grey",
          hex: "#4c4c4c"
        },{
          colorName: "dark red",
          hex: "#740b07"
        },{
          colorName: "other red",
          hex: "#c23800"
        },{
          colorName: "dark yellow",
          hex: "#e8a200"
        },{
          colorName: "dark green",
          hex: "#005510"
        },{
          colorName: "dark baby blue",
          hex: "#00569e"
        },{
          colorName: "dark blue",
          hex: "#0e0865"
        },{
          colorName: "dark purple",
          hex: "#550069"
        },{
          colorName: "dark pink",
          hex: "#a75574"
        },{
          colorName: "dark brown",
          hex: "#63300d"
        }
      ]
    }
  },
  methods: {
    changeCurrentColor: function(color) {
      document.getElementsByClassName("currentColor")[0].style.backgroundColor = color;
      this.currentSelectedColor = color;
      this.emitData(this.currentSelectedSize, color);
    },
    changeCurrentBrushSize: function(size) {
      this.currentSelectedSize = size;
      this.emitData(size, this.currentSelectedColor);
    },
    emitData: function(size, color) {
      console.log("emit")
      this.$emit("brushConfig", {
        size: size,
        color: color
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only :: Good height is 50-->
<style lang="scss" scoped>
  .toolContainer {
    top: 770px; //139 to be on the canvas
    position: absolute;
    transform: translate(-75px, 0px);
    width: 1024px;
    height: 60px;
    display: flex;
    justify-content: center;

    div {
      height: 100%;
    }

    .colorSwatchContainer {
      width: auto;
      display: flex;

      .currentColor {
        width: 60px;
        background-color: white;
        margin-right: 10px;
      }

      .colorOptions {
        width: 330px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 30px);
        grid-auto-rows: 30px;
        margin-right: 10px;

        div {
          background-color: white;
        }
      }
    }

    .toolOptionContainer {
      margin-right: 5px;
      display: flex;

      div {
        background-color: white;
        width: 60px;
        margin-right: 5px;
      }
    }

    .brushSizeContainer {
      margin-right: 5px;
      display: flex;

      div {
        background-color: white;
        width: 60px;
        margin-right: 5px;
      }
    }

    .clearScreenContainer {
      width: 60px;
      background-color: white;
    }
  }

  .selected {
    background-color: #9664c8;
  }
</style>
