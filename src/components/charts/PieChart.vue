
<script>
export default {
  name: "PieChart",
  props: ["datas"],
  computed: {
    dataSum() {
      let total = 0;
      this.datas.forEach((e) => {
        total += e.value;
      });
      return total;
    },
    transformChartData() {
      let result = [];
      this.datas.forEach((e) => {
        let temp = {
          ...e,
          percentage: (e.value / this.dataSum) * 100,
          color: this.getRandomColor(),
        };
        result.push(temp);
      });
      return result;
    },
    chartBGstyle() {
      let result = "";
      let totalpercent = 0;
      this.transformChartData.forEach((i, index) => {
        if (index === this.transformChartData.length - 1) {
          result += `${i.color} ${totalpercent}%`;
        } else {
          result += `${i.color} ${totalpercent}% ${
            totalpercent + i.percentage
          }%,`;
        }
        totalpercent += i.percentage;
      });
      return `conic-gradient(${result})`;
    },
  },
  methods: {
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>
    
<template>
  <div class="pie-chart-container">
    <div class="pie-chart" :style="{ background: chartBGstyle }"></div>
    <div class="legenda">
      <div class="entry" v-for="item in transformChartData" :key="item.color">
        <div class="entry-color" :style="{ background: item.color }"></div>
        <div class="entry-text">
          {{ item.title }} : <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
    
<style lang="scss" scoped>
.pie-chart-container {
  align-items: center;
  display: flex;
  margin-bottom: 50px;
}

.pie-chart {
  border-radius: 50%;
  width: 400px;
  min-width: 400px;
  height: 400px;
  opacity: 0.7;
}

.legenda {
  margin-left: 20px;
  background-color: white;
  padding: 5px;
}

.entry {
  display: flex;
  align-items: center;
}

.entry-color {
  height: 15px;
  width: 15px;
}

.entry-text {
  margin-left: 10px;
  font-weight: 500;
  span {
    color: crimson;
  }
}
</style>