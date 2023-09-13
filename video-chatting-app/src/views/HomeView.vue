<script setup lang="ts">
import router from "@/router";

const joinHost = () => {
  router.push({ path: "host" });
};

const joinPlayer = () => {
  router.push({ path: "player" });
};
</script>

<template>
  <div>
    <button @click="joinHost">호스트</button>
    <button @click="joinPlayer">참가자</button>
  </div>
</template>

<style scoped lang="scss">
button {
  background-color: aliceblue;
  margin-inline: 20px;
  width: 100px;
  height: 100px;
}
</style>
