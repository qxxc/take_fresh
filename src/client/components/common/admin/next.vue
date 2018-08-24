<template>
    <div>
        <div>
            <p style="font-size:25px;">新时代的传承</p>
        </div>
        <div class="body" v-if="choose">
            <p style="font-size:23px;">老一辈的见证</p>
            <el-form ref="form" :model="form" label-width="80px" style="width:400px">
                <el-form-item label="学号">
                    <el-input v-model="form.a_number"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.a_password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(1)">验证</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="body" v-show="!choose">
            <p style="font-size:23px;">新一代的希望</p>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学号" prop="num">
                    <el-input v-model="ruleForm2.num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="学年" prop="term">
                    <el-input v-model.number="ruleForm2.term" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="tel">
                    <el-input v-model.number="ruleForm2.tel"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(2)">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        var checkTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('电话不能为空'));
            }
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
        };
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('姓名不能为空'));
            }
            callback();
        };
        var checkTerm = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('学年不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            }, 0);
        };
        var checkNumber = (rule, value, callback) => {
            var count=0;
            if (!value) {
                return callback(new Error('学号不能为空'));
            }
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
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            choose:true,
            form:{
                a_number:'',
                a_password:'',
            },
            ruleForm2: {
                num:'',
                name:'',
                term:'',
                pass: '',
                checkPass: '',
                tel: '',
                a_id:sessionStorage.getItem('id')
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                tel: [
                    { validator: checkTel, trigger: 'blur' }
                ],
                num: [
                    { validator: checkNumber, trigger: 'blur' }
                ],
                name: [
                    { validator: checkName, trigger: 'blur' }
                ],
                term: [
                    { validator: checkTerm, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
      submitForm(flag) {
        var obj=this;
        var data;
        if(flag==1){
            data={
                username:this.form.a_number,
                password:this.form.a_password
            }
            this.$axios({
                method:'post',
                url:'http://localhost:3000/api/Admin/select_admin',
                data:data
            }).then((res)=>{
                console.log(res.data);
                if(res.data!='0'&&res.data!='-1'){
                    obj.choose=false;
                }else if(res.data=='0'){
                    this.$message.error('密码错误'); 
                }else if(res.data=='-1'){
                    this.$message.error('您已无权传承');  
                }
            }).catch((res)=>{
                console.log(res);
            })
        }else{
            data=obj.ruleForm2;
            this.$confirm('传承之后，老用户将无权登陆', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                obj.$axios({
                    method:'post',
                    url:'http://localhost:3000/api/Admin/insert_admin',
                    data:data
                }).then((res)=>{
                    if(res.data!='0'||res.data!='您已无权登陆'){
                        obj.$message({
                            message:'传承成功',
                            type:'success'
                        })
                        obj.$router.push({path:'/admin/home'})
                    }
                }).catch((res)=>{
                    console.log(res);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消传承'
                });          
            });
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="stylus" scoped>
.body
    background-color white
    padding 10px
</style>
