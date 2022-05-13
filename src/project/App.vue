<template>
  <div id="app">
    <p>App</p>
    <Helloworld></Helloworld>
    <n-button>Login</n-button>
  </div>
</template>

<script lang="ts" setup>
import Helloworld from './components/Helloworld.vue';
import { NButton } from "naive-ui";
</script>

<style scoped>
</style>