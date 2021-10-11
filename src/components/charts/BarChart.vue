
<script>
export default {
  name: "BarChart",
  props: ["datas", "max", "min"],
  methods: {
    percentClass(value) {
      let t = ((value - this.min) * 100) / (this.max - this.min);
      let result = Math.round(t);
      return `percentage-${result}`;
    },
  },
  computed: {
    allRulers() {
      let temp = this.max - this.min;
      let add = temp / 10;
      let result = [];
      for (let i = 0; i <= 10; i++) {
        result.push(parseInt(this.min) + add * i);
      }
      return result;
    },
  },
};
</script>

<template>
  <div class="chartArea">
    <div
      v-for="(item, index) in allRulers"
      class="tag"
      :style="{ bottom: index * 10 + '%' }"
      :key="index"
    >
      <div class="number" v-if="min < 990">{{ item }}</div>
    </div>
    <div
      v-for="item in datas"
      :key="item.title"
      class="line"
      :class="percentClass(item.value)"
    >
      <div class="percent-value">
        {{ item.value.toFixed(1) }}
      </div>
      <span class="percent-title">{{ item.title }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chartArea {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: flex-end;
  position: relative;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
  .line {
    margin: 0 10px;
    position: relative;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    transition: linear 0.5s all;
    .percent-title {
      width: 100%;
      bottom: -40px;
      left: 50%;
      text-align: center;
      margin-left: -50%;
      position: absolute;
      font-size: 12px;
      font-weight: 500;
    }
    .percent-value {
      font-weight: 500;
    }
  }
  .tag {
    position: absolute;
    width: 100%;
    height: 1px;
    background: #ccc;
    display: flex;
    align-items: center;
    .number {
      margin-left: -50px;
    }
  }
}
@for $i from 0 through 100 {
  .percentage-#{$i} {
    @if $i > 75 {
      background: rgb(243, 9, 9);
    } @else if $i>50 {
      background: rgb(235, 149, 20);
    } @else if $i > 25 {
      background: rgb(118, 236, 21);
    } @else if $i > 10 {
      background: rgb(25, 201, 157);
    } @else {
      background: rgb(9, 105, 214);
    }
    opacity: 0.7;
    height: $i * 1%;
    min-height: 10px;
  }
}
</style>