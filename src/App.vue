<script>
import { ref } from "vue";
import ChooseCitySection from "./components/ChooseCitySection.vue";
import ShowChartsSection from "./components/ShowChartsSection.vue";

export default {
  components: {
    ChooseCitySection,
    ShowChartsSection,
  },
  setup() {
    const step = ref(1);
    const cityWoei = ref({});

    const changeStep = (e) => {
      step.value = e;
    };
    const chooseCity = (i) => {
      cityWoei.value = { ...i };
    };
    return {
      step,
      cityWoei,
      changeStep,
      chooseCity,
    };
  },
};
</script>

<template>
  <div class="container">
    <ChooseCitySection
      v-if="step == 1"
      @changeStep="changeStep"
      @chooseCity="chooseCity"
    />
    <ShowChartsSection
      v-else
      :cityWoei="cityWoei"
      @changeStep="changeStep"
    ></ShowChartsSection>
  </div>
</template>
<style lang="scss" scoped>
@import "/public/scss/variables.scss";
.container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
