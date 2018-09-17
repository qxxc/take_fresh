<template>
    <div>
        <div class="back" style="margin-top:20px;background-image: url(http://localhost:3000/inter.jpg);"></div>
        <div class="header">
            <el-menu style="min-width:1000px;padding-left:100px" router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" :route="{ path:'/inter' }">签到队列</el-menu-item>
                <el-menu-item index="2" :route="{ path:'/inter/interview' }">面试队列</el-menu-item>
                <el-menu-item index="3" :route="{ path:'/inter/interview_result' }">面试结果</el-menu-item>
                <p style="margin-right:10px;float:right" @click="chang_login" :route="{ path:handleSelect}">登陆</p>
                <p style="float:right">注册</p>
            </el-menu>
        </div>
        <div class="body">
            <transition name="slide-fade"  mode="out-in">
                <router-view/>
            </transition>
        </div>
        <div class="fade" v-if="login"></div>
        <div class="succ-pop" v-if="login">
            <h3 class="title">
                <i class="el-icon-close" @click="remove_login"></i>
            </h3>
            <div class="login_body">
                <p style="margin:20px 0px"><input @keyup.13="submit" type="text" v-model="form.username" placeholder="请输入账号"></p>
                <p style="margin:20px 0px"><input @keyup.13="submit" type="password" v-model="form.password" placeholder="请输入密码"></p>
                <input type="button" class="submit" @click="submit" value="提交">
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
            form:{
                username:'',
                password:'',
            }
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(keyPath.path)
        },
        chang_login(){
            this.login=!this.login
        },
        submit(){},
        remove_login(){
            this.chang_login();
            this.form={
                username:'',
                password:'',
            }
        }
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
    min-width 1000px
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
    height 300px
    background #fff
    position fixed
    left 50%
    top 50%
    margin-left -200px
    margin-top -150px
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
.login_body
    input
        display block
        height 30px
        width 202px
        padding 0 15px
        border 1px solid #dcdfe6
        border-radius 4px
        color #606266
        margin 0 auto
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
