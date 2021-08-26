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
      return this.setChartOptions(this.$store.getters.getHighchartData);
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
    setChartOptions(chart) {
      // setDashStyle
      chart.series[1].dashStyle = "shortdot";
      chart.series[1].showInLegend = false;

      // setTitle
      const array = chart.series[0].data;
      const array2 = chart.series[1].data;
      let count = 0;
      let count2 = 0;
      array.forEach((element) => {
        count += element.y;
      });
      array2.forEach((element) => {
        count2 += element.y;
      });

      const title =
        "「" +
        chart.series[0].name +
        "」 總聲量 " +
        count +
        "則" +
        "<br>" +
        "「" +
        chart.series[1].name +
        "」 總聲量 " +
        count2 +
        "則";
      chart.title = {
        text: title,
        align: "left",
        style: {
          "font-size": "25px",
        },
      };

      // setTooltip
      chart.tooltip.formatter = function() {
        return this.series.name + "<br>" + this.x + "日共" + this.y + "則";
      };

      // setPlotOptions
      chart.plotOptions = {
        series: {
          cursor: "pointer",
          point: {
            events: {
              click: function() {
                this.$swal(this.series.name, this.category + "共" + this.y + "則");
              },
            },
          },
          marker: {
            enabled: false,
          },
        },
        line: {
          events: {
            legendItemClick: function() {
              var series = this.chart.series;
              if (this.chart.restIsHidden) {
                series[1].setVisible(true, false);
                this.chart.restIsHidden = false;
              } else {
                series[1].setVisible(false, false);
                this.chart.restIsHidden = true;
              }
            },
          },
        },
      };
      return chart;
    },
  },
  beforeCreate() {
    this.$store.dispatch("getHighchartData");
  },
};
</script>
