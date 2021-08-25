import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    highchartData: {},
  },
  mutations: {
    setMember(state, items) {
      for (let i = 0; i < items.length; i++) {
        items[i].id = i;
      }
      state.items = items;
    },
    setHighchartData(state, highchartData) {
      state.highchartData = highchartData;
    },
    updateMember(state, memberItem) {
      const copyItems = JSON.parse(JSON.stringify(state.items));
      for (let i = 0; i < copyItems.length; i++) {
        if (copyItems[i].id === memberItem.id) {
          copyItems.splice(i, 1, memberItem);
          break;
        }
      }
      state.items = JSON.parse(JSON.stringify(copyItems));
    },
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getHighchartData(state) {
      return state.highchartData;
    },
  },
  actions: {
    getMember(context) {
      const jwtToken = Vue.$cookies.get("data1");
      Vue.axios({
        method: "post",
        baseURL: "https://release-test2.opview.com.tw",
        url: "/eduApi/member",
        data: {
          action: "query",
        },
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + jwtToken },
      })
        .then((result) => {
          context.commit("setMember", result.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getHighchartData(context) {
      const jwtToken = Vue.$cookies.get("data1");
      Vue.axios({
        method: "post",
        baseURL: "https://release-test2.opview.com.tw",
        url: "/eduApi/chart",
        data: {
          action: "query",
        },
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + jwtToken },
      })
        .then((result) => {
          result.data.data.series[1].dashStyle = "ShortDash";
          result.data.data.series[1].showInLegend = false;

          const array = result.data.data.series[0].data;
          const array2 = result.data.data.series[1].data;
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
            result.data.data.series[0].name +
            "」 總聲量 " +
            count +
            "則" +
            "<br>" +
            "「" +
            result.data.data.series[1].name +
            "」 總聲量 " +
            count2 +
            "則";
          result.data.data.title = {
            text: title,
            align: "left",
            style: {
              "font-size": "25px",
            },
          };

          result.data.data.tooltip.formatter = function() {
            return this.series.name + "<br>" + this.x + "日共" + this.y + "則";
          };
          result.data.data.plotOptions = {
            series: {
              cursor: "pointer",
              point: {
                events: {
                  click: function() {
                    Vue.swal(this.series.name, this.category + "共" + this.y + "則");
                  },
                },
              },
            },
            line: {
              events: {
                legendItemClick: function() {
                  var series = this.chart.series;
                  if (this.chart.restIsHidden) {
                    series[0].setVisible(true, false);
                    series[1].setVisible(true, false);
                    this.chart.restIsHidden = false;
                  } else {
                    series[0].setVisible(false, false);
                    series[1].setVisible(false, false);
                    this.chart.restIsHidden = true;
                  }
                  return false;
                },
              },
            },
          };
          context.commit("setHighchartData", result.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateMember(context, memberItem) {
      context.commit("updateMember", memberItem);
    },
  },
  modules: {},
});
