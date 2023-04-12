<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      xData: ["南阳", "新乡", "西峡", "驻马店", "周口", "信阳", "漯河"], //横坐标
      yData: [1700, 2500, 1600, 3000, 2600, 3000, 1900], //数据
      myChartStyle: { float: "left", width: "50%", height: "400px" }, //图表样式
      barWidth: 50,
      color: "#6495ED",
      shadowColor: "  rgb(0, 10, 255);",
      shadowYData: [2000, 3000, 4000, 5000, 6000, 7000, 8000],
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基本柱状图
      const option = {
        backgroundColor: "#00000",
        grid: {
          top: "25%",
          left: "5%",

          bottom: "5%",
          right: "5%",
          containLabel: true,
        },
        xAxis: {
          data: this.xData,
        },
        yAxis: {},
        series: [
          {
            // type: "bar", //形状为柱状图
            // data: this.yData,
            name: "数据上椭圆",
            type: "pictorialBar",
            symbolSize: [this.barWidth, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            z: 12,
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 14,
                color: this.color,
                formatter: function (params, index) {
                  return params.value + "%";
                },
              },
            },
            color: "#2DB1EF",
            data: this.yData,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [this.barWidth, 10],
            symbolOffset: [0, 7],
            z: 12,
            color: this.color,
            data: this.yData,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [this.barWidth + 5, 15],
            symbolOffset: [0, 12],
            z: 10,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: this.color,
                borderType: "solid",
                borderWidth: 1,
              },
            },
            data: this.yData,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [this.barWidth + 10, 20],
            symbolOffset: [0, 18],
            z: 10,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: this.color,
                borderType: "solid",
                borderWidth: 2,
              },
            },
            data: this.yData,
          },
          {
            type: "bar",
            barWidth: this.barWidth,
            barGap: "10%", // Make series be overlap
            barCateGoryGap: "10%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                  {
                    offset: 0,
                    color: "rgba(25,223,221,.7)",
                  },
                  {
                    offset: 1,
                    color: "rgba(25,223,221,.3)",
                  },
                ]),
              },
            },
            data: this.yData,
          },
          {
            name: "阴影椭圆",
            type: "pictorialBar",
            symbolSize: [this.barWidth, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            z: 12,
            label: {
              show: false,
            },
            color: this.shadowColor,
            data: this.shadowYData,
          },
          {
            name: "阴影柱体",
            type: "bar",
            barWidth: this.barWidth,
            barCateGoryGap: "10%",
            zlevel: -1,
            barGap: "-100%",
            itemStyle: {
              color: this.shadowColor,
            },
            data: this.shadowYData,
          },

          //   },
        ],
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>
  