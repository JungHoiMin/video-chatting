<script setup lang="ts">
import { onMounted, ref } from "vue";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client/build/esm/socket";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";

const URL = "http://localhost:3000";

const cameras = ref<MediaDeviceInfo[]>([]);

const selectedCameraID = ref("");
const myVideo = ref<HTMLVideoElement | null>(null);

const myStream = ref<MediaStream | null>(null);
const isCameraOff = ref<boolean>(false);
const isAudioOff = ref<boolean>(false);

const hostSocket = ref<Socket | null>(null);

const getMedia = async (deviceId: string) => {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    myStream.value = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    if (myVideo.value) myVideo.value.srcObject = myStream.value;

    if (isCameraOff.value) {
      isCameraOff.value = false;
    }
    if (isAudioOff.value) {
      isAudioOff.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};

const handleCameraClick = () => {
  if (myStream.value) {
    myStream.value
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    isCameraOff.value = !isCameraOff.value;
  }
};

const handleAudioClick = () => {
  if (myStream.value) {
    myStream.value
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    isAudioOff.value = !isAudioOff.value;
  }
};

onMounted(async () => {
  const route = useRoute();

  const devices = await navigator.mediaDevices.enumerateDevices();
  cameras.value = devices.filter((device) => device.kind === "videoinput");

  if (cameras.value.length > 0) {
    selectedCameraID.value = cameras.value[0].deviceId;
    await getMedia(selectedCameraID.value);
    handleCameraClick();
    handleAudioClick();
  }

  hostSocket.value = io(URL);
  console.log(route.query);
  hostSocket.value.emit("setting", {
    name: route.query.name,
    room: route.query.room,
  });

  hostSocket.value.on("welcome", (evt) => {
    console.log(evt);
  });
});
</script>
<template>
  <div>
    <el-select v-model="selectedCameraID" @change="getMedia(selectedCameraID)">
      <el-option
        v-for="camera in cameras"
        :key="camera.deviceId"
        :value="camera.deviceId"
        :label="camera.label"
      />
    </el-select>
    <div>
      <video ref="myVideo" autoplay playsinline width="400" height="400" />
    </div>
    <div>
      <el-button @click="handleCameraClick">
        {{ isCameraOff ? "카메라 켜기" : "카메라 끄기" }}
      </el-button>
      <el-button @click="handleAudioClick">
        {{ isAudioOff ? "마이크 켜기" : "마이크 끄기" }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-select {
  width: 250px;
}
</style>
