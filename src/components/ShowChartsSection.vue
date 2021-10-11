
<script>
import BarChart from "./charts/BarChart.vue";
import PieChart from "./charts/PieChart.vue";
import { onMounted, ref, computed } from "vue";
import axios from "axios";
export default {
  name: "ShowCharts",
  emits: ["changeStep"],
  props: ["cityWoei"],
  components: {
    BarChart,
    PieChart,
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
    // 濕度資料
    const humidities = computed(() => {
      let result = [];
      consolidatedWeather.value.forEach((e) => {
        const { applicable_date, humidity } = e;
        result.push({ title: applicable_date, value: humidity });
      });
      return result;
    });
    return {
      consolidatedWeather,
      maxTemps,
      minTemps,
      maxDetails,
      minDetails,
      humidities,
      changeStep,
    };
  },
};
</script>
    
<template>
  <div class="back" @click="changeStep(1)">
    <span> &lt; Back </span>
  </div>
  <h2>{{ cityWoei.title }}</h2>
  <div class="chart-list">
    <div class="chart-size">
      <h3>Max Temp</h3>
      <bar-chart
        :datas="maxTemps"
        :max="maxDetails.max"
        :min="maxDetails.min"
      />
    </div>
    <div class="chart-size">
      <h3>Min Temp</h3>
      <bar-chart
        :datas="minTemps"
        :max="minDetails.max"
        :min="minDetails.min"
      />
    </div>
    <div class="chart-size-auto">
      <h3>Humidity</h3>
      <pie-chart :datas="humidities" />
    </div>
  </div>
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
.chart-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .chart-size {
    width: 40%;
  }
  .chart-size-auto {
    width: auto;
  }
}
</style>