<template>
    <el-table :data="tableData" empty-text="暂无队列" style="width: 90%;min-width:720px;margin:0 auto">
        <el-table-column prop="u_number" label="学号" align="center"></el-table-column>
        <el-table-column prop="u_class" label="专业" align="center"></el-table-column>
        <el-table-column prop="u_name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="g_name" label="方向" align="center"></el-table-column>
        <el-table-column prop="u_count" label="状态" align="center"></el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    sockets:{//不能改
        connect:function() {},
        message:function(value) {
            value.forEach(function(item,index,array){
                switch (item.u_count) {
                    case 0:
                        item.u_count='等待一面'
                        break;
                    case 1:
                        item.u_count='等待二面'
                        break;
                    case 2:
                        item.u_count='等待三面'
                        break;
                    default:
                        break;
                }  
            })
            this.tableData=value
        }
    }, 
    methods:{ 
        initSocket(){ //初始化weosocket  
            this.$socket.connect()
            this.$socket.emit("message", {}); //向服务端发送信息
        },
    },
    created: function () {
        this.initSocket();
    },
    beforeDestroy(){
        this.$socket.disconnect();
    }
}
</script>

<style>

</style>
