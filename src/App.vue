<script>
import { ref } from "vue";
import axios from "axios";
import inputDelay from "./utils/inputDelay";
export default {
  setup() {
    const searchText = ref("");
    const searchResults = ref([]);

    const searchTimeOut = () => {
      inputDelay(getCityApi);
    };

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

    return {
      searchText,
      searchResults,
      searchTimeOut,
    };
  },
};
</script>

<template>
  <div class="container">
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
      <div class="result-item" v-for="item in searchResults" :key="item.title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "/public/scss/variables.scss";
.container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
}
</style>
