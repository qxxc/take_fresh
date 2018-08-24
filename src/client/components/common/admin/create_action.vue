<template>
    <div>
        <p style="font-size:25px;">创建一个新的活动</p>
        <div class="body">
            <div>
                <p style="font-size:20px;margin-left:35px">负责人资料</p>
                <el-form ref="form" style="width:300px" :model="form" label-width="80px">
                    <el-form-item label="学号">
                        <el-input v-model="form.A_number"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.A_adminstrator"></el-input>
                    </el-form-item>
                    <el-form-item label="学年">
                        <el-input v-model="form.A_term"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                A_number:'',
                A_adminstrator:'',
                A_term:''
            }
        }
    },
    methods: {
        onSubmit() {
            var obj=this;
            var date=new Date();
            console.log(date.getMonth());
            if( ( date.getMonth()+1 >=8 && obj.form.A_term==date.getFullYear() ) || (date.getMonth()+1<=5 && obj.form.A_term==(date.getFullYear()-1))){
                this.$confirm('是否直接开启此次活动?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    obj.form.date1=new Date();
                    obj.form.A_status=1;
                    this.$axios({
                        url:'http://localhost:3000/api/Admin/insert_action',
                        method:'post',
                        data:obj.form
                    }).then((res)=>{
                        if(res.data=='1'){
                            obj.$message({
                                message:'添加成功',
                                type:'success'
                            })
                        }else{
                            obj.$message.error('添加失败(活动已存在)')
                        }
                        for (var i in obj.form) {
                            obj.form[i]=''
                        }
                    }).catch((res)=>{
                        console.log(res)
                    })
                }).catch(() => {
                    obj.form.A_status=0;
                    this.$axios({
                        url:'http://localhost:3000/api/Admin/insert_action',
                        method:'post',
                        data:obj.form
                    }).then((res)=>{
                        if(res.data=='1'){
                            obj.$message({
                                message:'添加成功',
                                type:'success'
                            })
                        }else{
                            obj.$message.error('添加失败(活动已存在)')
                        }
                        for (var i in obj.form) {
                            obj.form[i]=''
                        }
                    }).catch((res)=>{
                        console.log(res)
                    })        
                });
            }else{
                this.$message.error("未在本届纳新活动期间");
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.body
    background-color white
    padding 30px 50px 
    
</style>

