<template>
    <div>
        <div>
            <p style="font-size:25px;margin-bottom:10px">面试官申请列表</p>
        </div>
        <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="学号"
              width="120">
            <template slot-scope="scope">{{ scope.row.I_number }}</template>
            </el-table-column>
            <el-table-column
              prop="I_name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="g_name"
              label="组别"
              show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection(1)">同意选中的</el-button>
            <el-button type="danger" @click="toggleSelection(-1)">拒绝选中的</el-button>
        </div>
    </div>
</template>

<script>
  export default {
    created(){
      this.$axios({
        method:'get',
        url:'http://111.230.128.231/api/Admin/get_inter_apply'
      }).then((res)=>{
        this.tableData3=res.data
      }).catch((res)=>{
      })
    },
    data() {
      return {
        tableData3: [],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        var array=[];
        this.multipleSelection.forEach(row => {
          array.push({
            id:row.I_id,
            status:rows
          });
        });
        this.$axios({
          url:'http://111.230.128.231/api/Admin/chang_I_status',
          method:'post',
          data:array
        }).then(res=>{
          if(res.data){
            this.$message({
              message:'操作成功',
              type:'success'
            })
          }
          this.multipleSelection.map((item,index,input)=>{
            var i=this.tableData3.indexOf(item);
            this.tableData3.splice(i,1);
          })
        }).catch(res=>{
          this.$message.error('出现了一个小小的问题')
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style>

</style>
