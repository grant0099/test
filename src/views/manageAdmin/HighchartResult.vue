<template>
  <div>
    <b-card class="ml-5 mr-5" header="查詢結果" header-tag="header">
      <b-container
        ><highcharts ref="lineCharts" :constructorType="'chart'" :options="chartOptions"></highcharts>
      </b-container>
    </b-card>
  </div>
</template>
<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";
stockInit(Highcharts);

exportingInit(Highcharts);

export default {
  components: {
    highcharts: Chart,
  },
  computed: {
    chartOptions() {
      return this.$store.getters.getHighchartData;
    },
  },
  data() {
    return {};
  },
  methods: {
    search() {
      this.filterObj = {
        inUse: this.searchInputObj.inUse,
        deactivated: this.searchInputObj.deactivated,
        filterStr: this.searchInputObj.filterStr,
      };
    },
    edit(id) {
      this.memberObj = {
        id: this.items[id].id,
        account: this.items[id].account,
        enable: this.items[id].enable,
        createTime: this.items[id].createTime,
        updateTime: this.items[id].updateTime,
      };
    },
  },
  beforeCreate() {
    this.$store.dispatch("getHighchartData");
  },
};
</script>
