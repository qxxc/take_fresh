<template>
    <div>
        <p style="font-size:25px;margin-bottom:10px">个人资料</p>
        <div class="body">
            <div v-if="choose_status">
                <el-row v-for="(value,key) in info">
                    <el-col :span="2"><p>{{key}}：</p></el-col>
                    <el-col :span="22"><p>{{value}}</p></el-col>
                </el-row>
            </div>
            <div style="width:400px" v-else>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" label-position="left" class="demo-ruleForm">
                    <el-form-item label="学号" prop="a_number">
                        <el-input v-model="ruleForm2.a_number" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="a_name">
                        <el-input v-model="ruleForm2.a_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="a_password">
                        <el-input type="password" v-model="ruleForm2.a_password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学年" prop="a_term">
                        <el-input v-model.number="ruleForm2.a_term" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="a_tel">
                        <el-input v-model.number="ruleForm2.a_tel"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-button @click="chang()">{{choose_name}}</el-button>
                <el-button @click="sumbit()" v-if="!choose_status" type="success">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$axios({
            url:'http://111.230.128.231/api/Admin/get_admin_info',
            method:'post',
            data:{
                id:sessionStorage.getItem('id')
            }
        }).then(res=>{
            this.info=res.data;
        }).catch(res=>{
            
        })
    },
    data(){
        var checkTel = (rule, value, callback) => {
            if(value){
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        var a=String(value);
                        if(a.length!=11){
                            callback(new Error('请输入11位手机号码'));
                        }else{
                            callback();
                        }
                    }
                }, 0);
            }
            callback();
        };
        var checkTerm = (rule, value, callback) => {
            if(value){
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        callback();
                    }
                }, 0);
            }
            callback();
        };
        var checkNumber = (rule, value, callback) => {
            var count=0;
            if (value) {
                setTimeout(() => {
                    if (value.length==8) {
                        for (let i = 0; i < value.length; i++) {
                            if(value[i]>='0'&&value[i]<='9'){
                                count++;
                            }
                        }
                        if(count!=8){
                            callback(new Error('请输入8位学号'));
                        }else{
                            callback()
                        }
                    } else if(value.length!=8){
                        callback(new Error('请输入8位学号'));
                    }
                }, 0);
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if(value){
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
            }
            callback();
        };
        var validatePass2 = (rule, value, callback) => {
            if(this.ruleForm2.a_password&&!value){
                callback(new Error('请填写确认密码'))
            }
            if(value){
                if (value !== this.ruleForm2.a_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            callback();
        };
        return{
            choose_status:true,
            choose_name:'修改',
            info:{},
            form:{
                a_number:'',
                a_name:'',
                a_password:'',
                a_term:'',
                a_tel:''
            },
            ruleForm2: {
                a_number:'',
                a_name:'',
                a_password:'',
                a_term: '',
                checkPass: '',
                a_tel: '',
                a_id:sessionStorage.getItem('id')
            },
            rules2: {
                a_password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                a_tel: [
                    { validator: checkTel, trigger: 'blur' }
                ],
                a_number: [
                    { validator: checkNumber, trigger: 'blur' }
                ],
                a_term: [
                    { validator: checkTerm, trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        chang(){
            this.choose_status=!this.choose_status
            if(!this.choose_status){
                this.choose_name='取消'
            }else{
                this.choose_name='修改'
            }
        },
        sumbit(){
            var obj=this;
            var data={}
            if(obj.ruleForm2.a_password||obj.ruleForm2.checkPass){
                if(obj.ruleForm2.a_password!=obj.ruleForm2.checkPass){
                    this.$message.error('两次密码不一致')
                    return
                }
            }
            delete obj.ruleForm2.checkPass;
            for (let i in obj.ruleForm2) {
                if(obj.ruleForm2[i]){
                    data[i]=obj.ruleForm2[i] 
                }
            }
            data.a_password=this.$md5(data.a_password)
            this.$axios({
                url:'http://111.230.128.231/api/Admin/update_admin_info',
                method:'post',
                data:data
            }).then(res=>{
                if(res.data=='1'){
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    })
                }
            }).catch(res=>{
               
            })
        }
    }

}
</script>
<style lang="stylus" scoped>
.body
    padding 20px
    background-color white
</style>
