<template>
  <div>
    <div class="body">
      <div id='myChart' style='width：600px;height:600px'></div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.$axios({
      url:"http://localhost:3000/api/user/get_allUser",
      method:'post',
      data:{}
    }).then((res)=>{
      console.log(res.data);
    }).catch((res)=>{
      console.log(res.data);
    })
    console.log(this.$route.query.id)
  },
  data () {
    return {
      option:{
            title: { text: '本届纳新结果' },
            tooltip: {},
            xAxis: {
                data: ["web","php","python","java"]
            },
            yAxis: {},
            series: [{
                name: '报名',
                type: 'bar',
                data: [70,75,72,70]
            },
            {
                name: '通过',
                type: 'bar',
                data: [5, 4, 5, 3]
            }]
        }
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.option);
    }
  }
}
</script>

<style lang="stylus" scoped>
.body
  background-color white

</style>
