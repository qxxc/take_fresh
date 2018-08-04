<template>
    <el-container>
        <el-header class="header">
            <div class="left">
                <i class="iconfont icon-Crate">ACAT</i>
            </div>
            <div class="right">
                <el-dropdown :show-timeout='150'>
                    <span class="el-dropdown-link" style="color:white">
                        <i class="iconfont icon-gerenxinxi"></i><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container class="body">
            <el-aside style="background-color: #00C5CF" width="260px">
                <el-menu style="border-width:0px" unique-opened router background-color="#00C5CF" text-color="#fff"  class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i style="color:white" class="el-icon-menu"></i>
                            <span>活动</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" :route="{ path:'/home'}">全部活动</el-menu-item>
                            <el-menu-item index="1-2" :route="{ path:'/createAction'}">创建活动</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i style="color:white" class="el-icon-menu"></i>
                            <span>面试</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" :route="{ path:'/interview'}">参与者</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i style="color:white" class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="textbody">
                <router-view />
            </el-main>
        </el-container>
    </el-container>   
</template>

<script>
export default {
    data(){
        return {
            a:2
        }
    },
    created(){
        var data={
            date:new Date()
        }
        console.log(data);
        this.$axios({
            url:'http://localhost:3000/api/user/get_action',
            method:'post',
            data:data
        }).then((res)=>{
            console.log(res.data);
        }).catch((res)=>{
            console.log(res.data);
        })
    }
}
</script>

<style lang="stylus" scoped>
scroll(color)
    ::-webkit-scrollbar
	    width 4px
	    height 4px
    ::-webkit-scrollbar-thumb
	    background color
	    border-radius 2px
    ::-webkit-scrollbar-thumb:hover
	    background: #747474
.body
    position fixed
    height 100%
    width 100%
    padding-top 60px
    scroll(#aaa)
    .textbody
        background-color #E6E6E6
        padding 30px 30px
.header
    background-color #4B4B4B
    opacity 0.9
    width 100%
    position fixed
    .right
        float right
        margin-top 20px
        cursor pointer
        margin-right 10px
        .icon-gerenxinxi
            margin-right 3px
    .left
        margin-top 10px
        float left
        z-index 2
        .icon-Crate
            color white
            font-size 30px

</style>
