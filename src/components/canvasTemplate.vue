<template>
  <div class="canvasContainer">
    <Cover v-if="this.currentArtistID == this.uniqueIdentifier" :socket="this.socket"/>
    <canvas id="canvas" width="1024px" height="576px"></canvas>
  </div>
</template>

<script>
  import jQuery from "jquery";
  import Cover from "./canvasCoverTemplate.vue"


  export default {
    name: 'canvasTemplate',
    props: {
      currentArtistID: {
        type: String
      },
      socket: {
        type: Object
      },
      appConfigData: {
        type: Object
      }
    },
    components: {
      Cover
    },
    data() {
      return {
        round: 1,
        uniqueIdentifier: "",
        config: {
          ctx: "",
          positions: {
            x: [],
            y: [],
            drag: []
          },
          prop: {
            width: [],
            color: [],
            isPainting: false
          },
          current: {
            brushSize: this.appConfigData.size,
            brushColor: this.appConfigData.color
          }
        }
      }
    }, 
    mounted() {
      const $ = jQuery;
      window.$ = $;
      this.config.ctx = document.getElementById('canvas').getContext("2d");
      let vm = this;

      this.socket.on("restart round", function() {
        //restart canvas, let the next user draw
      });

      setInterval(function() {
        vm.config.current.brushSize = vm.appConfigData.size;
        vm.config.current.brushColor = vm.appConfigData.color;
        vm.uniqueIdentifier = localStorage.getItem("uniqueIdentifier");
      }, 1000/60)

      setTimeout(function() {
        // console.log(`id: ${vm.uniqueIdentifier} - current: ${vm.currentArtistID}`);
        if(vm.round == 1) {
          vm.mouseChecker();
        }
      }, 1000);

      this.socket.on('update canvas', function(config) {
        vm.drawBoard(config);
      })

      setInterval(function() {
        if (vm.config.positions.x.length != 0) {
          vm.socket.emit('update canvas', vm.config);
        }
      }, 1000/60);

    },
    methods: {
      mouseChecker: function() {
        let vm = this; 
        const $ = jQuery;
        window.$ = $;

        if (this.uniqueIdentifier == this.currentArtistID) {
          $('#canvas').mousedown(function(event) {
            vm.config.prop.isPainting = true;
            vm.appendMouseClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
            vm.drawBoard(vm.config);
          });

          $('#canvas').mousemove(function(event) {
            if (vm.config.prop.isPainting) {
              vm.appendMouseClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
              vm.drawBoard(vm.config);
            }
          });

          $('#canvas').mouseup(function() { //event
            vm.config.prop.isPainting = false;
          });

          $('#canvas').mouseleave(function() { //event
            vm.config.prop.isPainting = false;
          });
        }
      },
      switchSize: function(size) {
        this.config.current.size = size;
      },
      switchColor: function(hex) {
        this.config.current.color = hex;
      },
      appendMouseClick: function(x, y, dragging) {
        this.config.positions.x.push(x);
        this.config.positions.y.push(y);
        this.config.positions.drag.push(dragging);
        this.config.prop.width.push(this.config.current.brushSize);
        this.config.prop.color.push(this.config.current.brushColor);

      },
      drawBoard: function(config) {
        this.config.ctx.clearRect(0, 0, this.config.ctx.canvas.width, this.config.ctx.canvas.height);
        this.config.ctx.lineJoin = "round";

        for (var positionIndex=0; positionIndex < config.positions.x.length; positionIndex++) {
          this.config.ctx.beginPath();
          if(config.positions.drag[positionIndex] && positionIndex){
            this.config.ctx.moveTo(config.positions.x[positionIndex-1], config.positions.y[positionIndex-1]);
          }else{
            this.config.ctx.moveTo(config.positions.x[positionIndex]-1, config.positions.y[positionIndex]);
          }
          this.config.ctx.lineTo(config.positions.x[positionIndex], config.positions.y[positionIndex]);
          this.config.ctx.closePath();
          this.config.ctx.lineWidth = config.prop.width[positionIndex];
          this.config.ctx.strokeStyle = config.prop.color[positionIndex];
          this.config.ctx.stroke();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="scss" scoped>
  .canvasContainer {
    margin-right: 5px;
    width: 1024px;
    height: 576px;
    background-color: white;
  }
</style>
