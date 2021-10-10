
<script>
import BarChart from "./charts/BarChart.vue";
import { onMounted, ref, computed } from "vue";
import axios from "axios";
export default {
  name: "ShowCharts",
  emits: ["changeStep"],
  props: ["cityWoei"],
  components: {
    BarChart,
  },
  setup(props, context) {
    const consolidatedWeather = ref([]);
    const maxDetails = ref({
      max: -1000,
      min: 1000,
    });
    const minDetails = ref({
      max: -1000,
      min: 1000,
    });

    onMounted(() => {
      let woeid = props.cityWoei.woeid;
      // let woeid = a.woeid;
      axios.get(`/api/location/${woeid}/`).then((res) => {
        consolidatedWeather.value = [...res.data.consolidated_weather];
      });
    });
    const changeStep = (step) => {
      context.emit("changeStep", step);
    };
    // 最高溫度資料
    const maxTemps = computed(() => {
      let result = [];
      consolidatedWeather.value.forEach((e) => {
        const { applicable_date, max_temp } = e;
        maxDetails.value.max = Math.max(
          maxDetails.value.max,
          Math.ceil(max_temp)
        );
        maxDetails.value.min = Math.min(
          maxDetails.value.min,
          parseInt(max_temp)
        );
        result.push({ title: applicable_date, value: max_temp });
      });
      return result;
    });
    // 最低溫度資料
    const minTemps = computed(() => {
      let result = [];
      consolidatedWeather.value.forEach((e) => {
        const { applicable_date, min_temp } = e;
        minDetails.value.max = Math.max(
          minDetails.value.max,
          Math.ceil(min_temp)
        );
        minDetails.value.min = Math.min(
          minDetails.value.min,
          parseInt(min_temp)
        );
        result.push({ title: applicable_date, value: min_temp });
      });
      return result;
    });

    return {
      consolidatedWeather,
      maxTemps,
      minTemps,
      maxDetails,
      minDetails,
      changeStep,
    };
  },
};
</script>
    
<template>
  <div class="back" @click="changeStep(1)">
    <span> &lt; Back </span>
  </div>
  <h1>{{ cityWoei.title }}</h1>

  <h2>Max Temp</h2>
  <BarChart
    class="chart-size"
    :datas="maxTemps"
    :max="maxDetails.max"
    :min="maxDetails.min"
  ></BarChart>
  <h2>Min Temp</h2>
  <BarChart
    class="chart-size"
    :datas="minTemps"
    :max="minDetails.max"
    :min="minDetails.min"
  ></BarChart>
</template>
    
<style lang="scss" scoped>
@import "/public/scss/variables.scss";
.back {
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  h1 {
    margin: 10px;
  }
}
.chart-size {
  width: 60%;
  min-width: 400px;
}
</style>