<script>
import { ref, reactive } from "vue";
import inputDelay from "./utils/inputDelay";
export default {
  setup() {
    const searchText = ref("");

    const searchTimeOut = () => {
      inputDelay(getApi);
    };

    const getApi = (e) => {
      console.log(searchText.value);
    };

    return {
      searchText,
      searchTimeOut,
      getApi,
    };
  },
};
</script>

<template>
  <input type="text" v-model="searchText" @keyup="searchTimeOut" />
  <div>{{ searchText }}</div>
</template>

<style>
</style>
