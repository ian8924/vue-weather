
<script>
import { ref } from "vue";
import axios from "axios";
import inputDelay from "../utils/inputDelay";
export default {
  name: "ChooseCitySection",
  emits: ["chooseCity", "changeStep"],
  setup(props, context) {
    const searchText = ref("");
    const searchResults = ref([]);

    // input delay 800ms
    const searchTimeOut = () => {
      inputDelay(getCityApi);
    };

    // get city(woeid & title) api
    const getCityApi = () => {
      if (!searchText.value) {
        searchResults.value = [];
        return;
      }
      axios
        .get("/api/location/search/", {
          params: {
            query: searchText.value,
          },
        })
        .then((res) => {
          searchResults.value = [...res.data];
        });
    };

    const chooseCity = (item) => {
      context.emit("chooseCity", item);
      context.emit("changeStep", 2);
    };

    return {
      searchText,
      searchResults,
      searchTimeOut,
      chooseCity,
    };
  },
};
</script>

<template>
  <input
    type="text"
    v-model="searchText"
    @keyup="searchTimeOut"
    placeholder="Input a city"
  />
  <div class="search-results">
    <div class="title">
      Results : <br />
      <span> (Click to show details)</span>
    </div>
    <div
      class="result-item"
      v-for="item in searchResults"
      :key="item.title"
      @click="chooseCity(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/public/scss/variables.scss";
input {
  width: 400px;
  height: 30px;
  margin: 20px auto;
  padding: 0 10px;
  outline: none;
}
.search-results {
  margin: 0 20px;
  .title {
    font-weight: 500;
    span {
      color: gray;
      font-size: 12px;
    }
  }
  .result-item {
    font-size: 14px;
    margin: 5px 0 0 10px;
    cursor: pointer;
    &:hover {
      color: $blue;
    }
  }
}
</style>