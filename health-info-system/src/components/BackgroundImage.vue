<template>
  <div class="background-image"></div>
</template>

<script>
export default {
  name: "BackgroundImage"
};
</script>

<style scoped>
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/workspaces/health-info-system/health-info-system/src/assets/logo.png') center center / cover no-repeat;
  filter: blur(8px);
  z-index: -1;
}
</style>
