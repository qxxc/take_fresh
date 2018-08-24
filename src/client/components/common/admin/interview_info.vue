<template>
    <div>
        <div>
            <p style="font-size:25px;">面试官资料</p>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="学号" width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.I_number }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" width="180">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.I_name }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="组别" width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.g_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="学年" width="180">
                    <template slot-scope="scope">
                        <span >{{ scope.row.I_term }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        var obj=this
        this.$axios({
            url:'http://localhost:3000/api/Admin/get_inter',
            method:'get',
        }).then((res)=>{
            obj.tableData=res.data
        }).catch((res)=>{
            console.log(res.data);
        })
    },
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log( row);
        },
        handleDelete(index, row) {
            var obj=this;
            this.$axios({
                url:'http://localhost:3000/api/Admin/delete_inter',
                method:'post',
                data:obj.tableData[index]
            }).then((res)=>{
                if(res.data=='1'){
                    obj.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    obj.tableData.splice(index,1);
                }else{
                    obj.$message.error('删除失败');
                }
            }).catch((res)=>{
                console.log(res.data);
            })
        }
    }
}
</script>

<style>

</style>
