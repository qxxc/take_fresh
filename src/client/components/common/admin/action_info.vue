<template>
    <div>
        <div>
            <p style="font-size:25px;margin-bottom:10px">活动详情</p>
        </div>
        <div>
            <el-table :data="tableData"  style="width: 100%">
                <el-table-column label="负责人" width="150">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.A_adminstrator }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="时间" width="250">
                    <template slot-scope="scope">
                        <span>{{ scope.row.A_start_date}}至{{scope.row.A_end_date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="学年" width="170">
                    <template slot-scope="scope">
                        <span>{{ scope.row.A_term }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="170">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag >{{ scope.row.A_status_name }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div v-if="scope.row.A_status_action" >
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">开启</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">结束</el-button>
                        </div>
                        <div v-else>
                            <el-button size="mini" @click="see()">不可操作</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    methods:{
        see(index,row){
            this.$alert('活动都结束了，你还想干啥？', '提示', {
                confirmButtonText: '确定',
            });
        },
        handleEdit(index, row) {
            var obj=this;
            if(row.A_status_name=='进行中'){
                this.$message.error("活动正在进行中")
            }else{
                var data={
                    A_id:row.A_id,
                    date1:new Date(),
                    A_status:1
                }
                this.$axios({
                    url:'http://111.230.128.231/api/Admin/begin_action',
                    method:'post',
                    data:data
                }).then((res)=>{
                    if(res.data=='1'){
                        obj.$message({
                            message:'开启成功',
                            type:'success'
                        })
                        row.A_status_name='进行中';
                        row.A_start_date=data.date1.getFullYear()+'-'+(data.date1.getMonth()+1)+'-'+data.date1.getDate()
                    }else{
                        obj.$message.error('开启活动失败')
                    }
                }).catch((res)=>{
                })
            }
        },
        handleDelete(index, row) {
            var obj=this;
            if(row.A_status_name=='未开始'){
                this.$message.error("活动尚未开始")
            }else{
                var data={
                    A_id:row.A_id,
                    date1:new Date(),
                    A_status:2
                }
                this.$axios({
                    url:'http://111.230.128.231/api/Admin/end_action',
                    method:'post',
                    data:data
                }).then((res)=>{
                    if(res.data=='1'){
                        obj.$message({
                            message:'结束成功',
                            type:'success'
                        })
                        row.A_status_name='已结束';
                        row.A_status_action=false;
                        row.A_end_date=data.date1.getFullYear()+'-'+(data.date1.getMonth()+1)+'-'+data.date1.getDate()
                    }else{
                        obj.$message.error('结束活动失败')
                    }
                }).catch((res)=>{
                })
            }
        }
    },
    created(){
        var obj=this;
        this.$axios({
            url:'http://111.230.128.231/api/Admin/select_action',
            method:'get',
        }).then((res)=>{
            res.data.map((item,index,input)=>{
                var obj=item;
                var date1=new Date(item.A_start_date)
                var date2=new Date(item.A_end_date)
                switch (obj.A_status) {
                    case 0:
                        obj.A_status_name="未开始";
                        obj.A_status_action=true;
                        obj.A_start_date='';
                        obj.A_end_date='';
                        break;
                    case 1:
                        obj.A_status_name="进行中";
                        obj.A_status_action=true;
                        obj.A_start_date=date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate();
                        obj.A_end_date='';
                        break;
                    case 2:
                        obj.A_status_name="已结束"
                        obj.A_status_action=false;
                        obj.A_start_date=date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate();
                        obj.A_end_date=date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+date2.getDate();
                        break;
                }
            });
            obj.tableData=res.data;
        }).catch((res)=>{
        })
    },
}
</script>

<style lang="stylus" scoped>

</style>