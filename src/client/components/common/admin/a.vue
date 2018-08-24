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
    
  },
  data () {
    return {
      option:{
            title: { text: '本届纳新结果' },
            tooltip: {},
            xAxis: {
                data: this.g_name
            },
            yAxis: {},
            series: [{
                name: '报名',
                type: 'bar',
                data: this.number
            },
            {
                name: '通过',
                type: 'bar',
                data: this.s
            }]
        }
    }
  },
  mounted(){
    this.$axios({
      url:"http://localhost:3000/api/Admin/get_allUser",
      method:'post',
      data:{trem:this.$route.query.id}
    }).then((res)=>{
      var g_name=[],number=[];
      for (let index = 0; index < res.data.length; index++) {
        console.log(res.data[index]);
        g_name.push(res.data[index].g_name);
        number.push(res.data[index].number);
      }
      this.option.xAxis.data=g_name;
      this.option.series[1].data=number;
      this.option.series[0].data=number;
      console.log(res.data);
      this.drawLine();
    }).catch((res)=>{
      console.log(res.data);
    })
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
