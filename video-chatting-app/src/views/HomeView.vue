<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";

const name = ref<string>("");
const room = ref<number>(0);
const joinHost = () => {
  router.push({ path: "host", query: { name: name.value, room: room.value } });
};

const joinPlayer = () => {
  router.push({
    path: "player",
    params: { name: name.value, room: room.value },
  });
};
</script>

<template>
  <div>
    <el-input v-model="name">
      <template #prepend> 이름 </template>
    </el-input>
    <el-input v-model="room" type="number">
      <template #prepend> 방번호 </template>
    </el-input>
    <el-button :disabled="name === ''" @click="joinHost">호스트</el-button>
    <el-button :disabled="name === ''" @click="joinPlayer">참가자</el-button>
  </div>
</template>

<style scoped lang="scss">
el-button {
  margin-inline: 20px;
}
</style>
