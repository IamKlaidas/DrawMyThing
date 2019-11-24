<template>
  <div class="onlineContainer">
    <div v-bind:key="user.id" v-for="user in userOnlineList" class="userContainer">
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
    <div class="voteKickContainer displayCenter">
      <p class="smallerText">Vote Kick</p>
    </div>
  </div>
</template>

<script>
// 10 max players in a game.
export default {
  name: 'onlineTempalte',
  data() {
    return {
      userOnlineList: [
        {
          position: "#1",
          name: "Jimmy",
          points: 0,
          cardColor: "#ffffff"
        }
      ]
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
      background-color: white;
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
