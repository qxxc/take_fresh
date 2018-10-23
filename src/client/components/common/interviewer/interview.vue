<template>
    <div>
      <el-table :data="tableData" style="width: 90%;margin:0 auto">
        <el-table-column label="学号" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.u_number }}</span>
            </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.u_name }}</el-tag>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="专业班级"  align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.u_class }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.u_counts}}</span>
            </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.u_sex }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">面试</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
 export default {
    data() {
      return {
        tableData: [],
        _id:''
      }
    },
    created(){
        var that=this;
        this.get_user_wating();
        this._id=setInterval(this.get_user_wating,2000)
    },
    beforeDestroy(){
        clearInterval(this._id)
    },
    methods: {
      handleEdit(index, row) {
        if(sessionStorage.getItem('_id')){
            var rows=row
            this.$router.push({name:'interviewing',params:row});
            this.$axios({
                url:'http://111.230.128.231/api/Inter/change_user_status',
                method:'post',
                data:{u_status:3,u_number:row.u_number}
            }).then(res=>{
            })
        }else{
            this.$message({
                message: '请登录',
                type: 'warning'
            });
        }
      },
      get_user_wating(){
        this.$axios({
            url:'http://111.230.128.231/api/Inter/get_user_waiting',
            method:'get'
            }).then(res=>{
            if(sessionStorage.getItem('I_group')){
                res.data=res.data.filter((item,index,array)=>{
                    return item.g_name==sessionStorage.getItem('I_group');
                })
            }
            res.data.forEach((item,index,array)=>{
                switch (item.u_count) {
                    case 0:
                        item.u_counts='等待一面'
                        break;
                    case 1:
                        item.u_counts='等待二面'
                        break;
                    case 2:
                        item.u_counts='等待三面'
                        break;
                }
                if (item.u_sex) {
                    item.u_sex='男'
                }else{
                    item.u_sex='女'
                }
            })
            if(this.tableData.toString()!=res.data.toString()){
                this.tableData=res.data;
            }
        }).catch(res=>{
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
