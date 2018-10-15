<template>
    <div>
        <div class="back" style="margin-top:20px;background-image: url(http://111.230.128.231/inter.jpg);"></div>
        <div class="header">
            <el-menu style="min-width:1000px;padding-left:100px" router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" :route="{ path:'/inter' }">签到队列</el-menu-item>
                <el-menu-item index="2" :route="{ path:'/inter/interview' }">面试队列</el-menu-item>
                <el-menu-item index="3" :route="{ path:'/inter/interview_result' }">面试结果</el-menu-item>
                <p style="margin-right:10px;float:right" @click="chang_login" v-if="is_Name">登陆</p>
                <p style="float:right" @click="chang_register" v-if="is_Name">注册</p>
                <p style="float:right"  v-if="!is_Name" @click="login_out">你好，{{name}}</p>
            </el-menu>
        </div>
        <div class="body">
            <transition name="slide-fade"  mode="out-in">
                <router-view/>
            </transition>
        </div>
        <div class="fade" v-if="login"></div>
        <div class="succ-pop" style="height:260px;margin-top:-130px" v-if="login">
            <h3 class="title">
                <h4 style="margin-top:10px">ACAT</h4>
                <i class="el-icon-close" @click="remove_login"></i>
            </h3>
            <div class="login_body">
                <p style="margin:20px 0px"><input @keyup.13="login_submit" type="text" v-model="form.username" placeholder="请输入账号"></p>
                <p style="margin:20px 0px"><input @keyup.13="login_submit" type="password" v-model="form.password" placeholder="请输入密码"></p>
                <input type="button" class="submit" @click="login_submit" value="登陆">
            </div>
        </div>
        <div class="fade" v-if="register"></div>
        <div class="succ-pop" v-if="register">
            <h3 class="title">
                <h4 style="margin-top:10px">ACAT</h4>
                <i class="el-icon-close" @click="remove_register"></i>
            </h3>
            <div class="login_body">
                <p style="margin:20px 0px"><input @keyup.13="register_submit" type="text" v-model="formRegister.username" placeholder="请输入账号"></p>
                <p style="margin:20px 0px"><input @keyup.13="register_submit" type="password" v-model="formRegister.password" placeholder="请输入密码"></p>
                <p style="margin:20px 0px"><input @keyup.13="register_submit" type="text" v-model="formRegister.name" placeholder="请填写姓名"></p>
                <div style="margin-left:20px">
                    <el-radio-group v-model="formRegister.group" size="small">
                    <el-radio-button label="1">web前端</el-radio-button>
                    <el-radio-button label="2">php/java</el-radio-button>
                    <el-radio-button label="3">python/c++</el-radio-button>
                    <el-radio-button label="4">人工智能</el-radio-button>
                    </el-radio-group>
                </div>
                <input type="button" class="submit" @click="register_submit" value="注册并申请">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            login:false,
            register:false,
            is_Name:true,
            name:'',
            form:{
                username:'',
                password:'',
            },
            formRegister:{
                username:'',
                password:'',
                name:'',
                term:'',
                group:'',
            }
        };
    },
    created(){
        if(sessionStorage.getItem('_id')){
            this.is_Name=false;
            this.name=sessionStorage.getItem('_name');
        }
    },
    methods: {
        handleSelect(key, keyPath) {},
        login_out(){
            sessionStorage.clear();
            this.is_Name=true;
            this.name=''
        },
        chang_login(){
            this.login=!this.login
        },
        login_submit(){
            var data={
                username:this.form.username,
                password:this.$md5(this.form.password)
            }
            this.$axios({
                url:'http://111.230.128.231/api/Inter/login_inter',
                method:'post',
                data:data
            }).then(res=>{
                if(res.data!='0'&&res.data!='-1'){
                    this.remove_login()
                    this.is_Name=false
                    this.name=res.data.name;
                    sessionStorage.setItem('_id',res.data.I_id)
                    sessionStorage.setItem('_name',res.data.name)
                    sessionStorage.setItem('I_group',res.data.I_group)
                }
                else if(res.data=='-1'){
                    this.$message({message:'无权登陆',type:'warning'});
                }
                else{
                    this.$message.error('密码错误'); 
                }
                
            }).catch(res=>{
            })
        },
        remove_login(){
            this.chang_login();
            this.form={
                username:'',
                password:'',
            }
        },
        chang_register(){
            this.register=!this.register
        },
        register_submit(){
            var date=new Date();
            var data={
                username:this.formRegister.username,
                password:this.formRegister.password,
                name:this.formRegister.name,
                term:this.formRegister.term,
                group:this.formRegister.group,
            }
            data.password=this.$md5(this.formRegister.password)
            if(date.getMonth()+1>8){
                data.term=date.getFullYear()
            }else{
                data.term=date.getFullYear()-1
            }
            this.$axios({
                url:'http://111.230.128.231/api/Inter/register_submit',
                method:'post',
                data:data
            }).then(res=>{
                if(res.data){
                    this.$message({
                        message: '申请成功,等待审核中',
                        type: 'success'
                    });
                    this.remove_register()
                }
            }).catch(res=>{
            })
        },
        remove_register(){
            this.chang_register();
            this.formRegister={
                username:'',
                password:'',
                name:'',
                term:'',
                group:'',
            }
        },
    }
}
</script>
<style lang="stylus" scoped>
.back
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    min-width 1000px
    z-index -10
    zoom 1
    background-color #fff
    background-repeat no-repeat
    background-size cover
    -webkit-background-size cover
    -o-background-size cover
    background-position center 0
.body
    height 800px
    background-color rgba(255,255,255,0.7)
    margin 20px auto
    padding-top 20px
    width 90%
    min-width 1200px
.header 
    p
        font-size 14px
        color #909399
        height 60px
        line-height 60px
        padding 0px 20px
        cursor pointer
    p:hover
        color #5F6266
.slide-fade-enter-active 
    transition all .3s ease
    -webkit-transition all .3s ease
    -moz-transition all .3s ease
    -ms-transition all .3s ease
    -o-transition all .3s ease
.slide-fade-leave-active 
    transition all .3s ease
    -webkit-transition all .3s ease
    -moz-transition all .3s ease
    -ms-transition all .3s ease
    -o-transition all .3s ease
.slide-fade-enter
    transform translateX(20px)
    -webkit-transform translateX(20px)
    -moz-transform translateX(20px)
    -ms-transform translateX(20px)
    -o-transform translateX(20px)
    opacity 0
.slide-fade-leave-active 
    opacity 0
.fade
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.5)
    position fixed
    left 0
    top 0
    z-index 99
.succ-pop
    width 400px
    height 360px
    background #fff
    position fixed
    left 50%
    top 50%
    margin-left -200px
    margin-top -180px
    z-index 999
    border-radius 5px
.succ-pop 
    h3.title
        text-align right
        padding-right 10px
        font-size 28px
        color #CCCCCD
        :hover
            cursor pointer
            color black
    h4
        float left
        color black
        padding-left 20px
        :hover
            cursor default      
.login_body
    input
        display block
        height 40px
        width 360px
        padding 0 15px
        border 1px solid #dcdfe6
        border-radius 4px
        color #606266
        margin 0 20px   
        line-height 40px
        box-sizing:border-box
    p
        text-indent 50px
    input[class*='submit']
        margin 25px auto 
        color #fff
        background-color #409EFF
        border 1px solid #dcdfe6
        border-color #409EFF
        font-size 14px
        height 40px
        text-align center
        border-radius 4px
    input[class*='submit']:hover
        background-color #35B3FF
        cursor pointer
</style>
