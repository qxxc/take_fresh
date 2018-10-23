<template>
    <div>
        <el-table ref="multipleTable" :data="tableData" style="width: 90%;margin:0 auto" :row-class-name="tableRowClassName"  tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
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
                <div>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                </div>
            </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px;margin-left:5%">
            <el-button type="success" @click="toggleSelection(1)">通过已选中的</el-button>
            <el-button type="danger" @click="toggleSelection(0)">淘汰已选中的</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            _id:'',
            multipleSelection: []
        }
    },
    created(){
        this.get_interview_result()
    },
    methods:{
        get_interview_result(){
            this.$axios({
                url:'http://111.230.128.231/api/Inter/get_interview_result',
                method:'get',
                params:{
                    I_group:sessionStorage.getItem('I_group')
                }
            }).then(res=>{
                if(sessionStorage.getItem('I_group')){
                    res.data=res.data.filter((item,index,array)=>{
                        return item.g_name==sessionStorage.getItem('I_group');
                    })
                }
                this.tableData=res.data
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        toggleSelection(val) {
            if(sessionStorage.getItem('_id')){
                var data=[];
                this.multipleSelection.forEach((item,index,array)=>{
                    if(val){
                        data.push({
                            u_number:item.u_number,
                            u_status:5
                        });
                    }else{
                        data.push({
                            u_number:item.u_number,
                            u_status:6
                        });
                    }
                })
                this.$axios({
                    url:'http://111.230.128.231/api/Inter/allow_user',
                    method:'post',
                    data:{
                        data:data
                    }
                }).then(res=>{
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                })
            }else{
                this.$message({
                    message: '请登录',
                    type: 'warning'
                });   
            }
        },
        handleEdit(index, row) {
            if(sessionStorage.getItem('_id')){
                this.$router.push({name:'interviewing',params:row});
            }else{
            this.$message({
                    message: '请登录',
                    type: 'warning'
            });
        }
        },
        handleEdit1(index,row){
            if(sessionStorage.getItem('_id')){
                
            }else{
            this.$message({
                message: '请登录',
                type: 'warning'
            });
        }
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
