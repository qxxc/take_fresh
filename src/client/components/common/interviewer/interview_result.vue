<template>
    <div>
        <el-table :data="tableData" style="width: 90%;margin:0 auto" :row-class-name="tableRowClassName">
            <el-table-column type="index" width="50" align="center"></el-table-column>
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
            <el-table-column label="总分" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sum_result}}</span>
                </template>
            </el-table-column>
            <el-table-column label="性别" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.u_sex }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <div v-if="scope.row.u_status!=5">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button size="mini" @click="handleEdit1(scope.$index, scope.row)">通过</el-button>
                </div>
                <div v-if="scope.row.u_status==5">
                    <span style="margin-left: 10px">已通过</span>
                </div>
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
        this.$axios({
            url:'http://localhost:3000/api/Inter/get_interview_result',
            method:'get'
        }).then(res=>{
            this.tableData=res.data
        }).catch(res=>{
            console.log(res)
        })
    },
    methods:{
        handleEdit(index, row) {
            this.$router.push({name:'interviewing',params:row});
        },
        handleEdit1(index,row){
            console.log(index)
            this.$axios({
                url:'http://localhost:3000/api/Inter/allow_user',
                method:'post',
                data:{
                    u_number:row.u_number
                }
            }).then(res=>{
                this.$message({
                    message: '通过成功',
                    type: 'success'
                });
                this.tableData[index].u_status=5
            })
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 0) {
                return 'danger-row';
            } else if (rowIndex === 1) {
                return 'warning-row';
            }else if(rowIndex === 2){
                return 'success-row'
            }
            return '';
        }
    }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .danger-row {
    background:#FFD2E4;
  }
</style>
