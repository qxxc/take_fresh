<template>
    <div class="body">
        <div>
            <div class="box">
                <p>用户注册{{form}}</p>
                <p class="in">
                    <i class="iconfont icon-icontouxiang" style="margin:0.4em;font-size:1.5em"></i>
                    <span style="border:1px solid #5A8796;"></span>
                    <input type="text" v-model="form.u_number" placeholder="学号">
                </p>
                <p class="in">
                    <i class="iconfont icon-suo" style="margin:0.4em;font-size:1.5em"></i>
                    <span style="border:1px solid #5A8796;"></span>
                    <input type="password" v-model="form.u_password" placeholder="密码">
                </p>
                <p class="in">
                    <i class="iconfont icon-suo" style="margin:0.4em;font-size:1.5em"></i>
                    <span style="border:1px solid #5A8796;"></span>
                    <input type="password" v-model="u_password" placeholder="确认密码">
                </p>
                <p class="in">
                    <i class="iconfont icon-xingming" style="margin:0.4em;font-size:1.5em"></i>
                    <span style="border:1px solid #5A8796;"></span>
                    <input type="text" v-model="form.u_name" placeholder="姓名">
                </p>
                <p class="in">
                    <i class="iconfont icon-xingbie" style="margin:0.4em;font-size:1.5em"></i>
                    <span style="border:1px solid #5A8796;"></span>
                    <span style="display:inline-block;width:1em"></span>
                    <el-radio-group fill='#5A8796' v-model="form.u_sex">
                        <el-radio-button label="1">男</el-radio-button>
                        <el-radio-button label="0">女</el-radio-button>
                    </el-radio-group>
                </p>
                <p class="in">
                    <i class="iconfont icon-banji" style="margin:0.4em;font-size:1.25em"></i>
                    <span style="border:1px solid #5A8796;"></span>
                    <input type="text" v-model="form.u_class" placeholder="班级">
                </p>
                <p class="in">
                    <i class="iconfont icon-lianxifangshi" style="margin:0.4em;font-size:1.5em"></i>
                    <span style="border:1px solid #5A8796;"></span>
                    <input type="number" v-model="form.u_tel" placeholder="联系方式">
                </p>
                <p class="in">
                    <textarea cols="24" rows="10" v-model="form.u_info" placeholder="个人简述，让我们更好的了解你"></textarea>
                </p>
                <p>
                    <button class="submit" @click="user_resgiter">提交</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            u_password:'',
            form:{
                u_number:'',
                u_password:'',
                u_name:'',
                u_class:'',
                u_sex:'',
                u_tel:'',
                u_info:'',
            }
        }
    },
    methods:{
        user_resgiter(){
            if(this.form.u_number&&this.form.u_password&&this.form.u_name&&this.form.u_class&&this.form.u_sex&&this.form.u_tel){
                if (this.u_password==this.form.u_password) {
                    this.form.u_password=this.$md5(this.form.u_password);
                    this.$axios({
                        url:'http://localhost:3000/api/user/user_resgiter',
                        method:'post',
                        data:this.form
                    }).then(res=>{
                        if(res.data){
                            this.$message({
                                message:'注册成功',
                                type:'success'
                            });
                            this.$router.push('/user');
                        }
                    })
                }else{
                    this.$message.error('输入两次密码错误');
                }
            }else{
                this.$message.error('请填写基本信息');
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.body
    color white
    margin 40px auto 
    width 22em
    border 1px solid #5A8796
    .box
        padding 1em
        text-align center
        .in
            text-align left
            border 1px solid #5A8796
            margin-top 1em
            padding 0.6em 0.4em 
            border-radius 8px
            input
                display inline-block
                height 2em
                font-size 1.1em
                color white
                border none
                background-color transparent
                outline none
                margin-left 1em
            textarea
                display inline-block
                height 5em
                font-size 1.4em
                color white
                border none
                background-color transparent
                outline none
                margin-left 1em
.submit
    margin 1em auto 
    color #fff
    background-color transparent
    width 100%
    border 1px solid #dcdfe6
    border-color #409EFF
    font-size 1.5em
    height 2.6em
    text-align center
    border-radius 4px 
</style>
