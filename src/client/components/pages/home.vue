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
            <el-aside style="background-color: #00C5CF" width="200px">
                <el-menu style="border-width:0px" router background-color="#00C5CF" text-color="#fff" default-active="2" class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i style="color:white" class="el-icon-menu"></i>
                            <span>面试官资料</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">全部面试官</el-menu-item>
                            <el-menu-item index="1-2">申请</el-menu-item>
                            <el-menu-item index="1-3">已通过</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i style="color:white" class="el-icon-menu"></i>
                        <span slot="title" style="color:white">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i style="color:white" class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="textbody">
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
                <p>132</p>
            </el-main>
        </el-container>
    </el-container>   
</template>

<script>
export default {
     methods: {
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
    margin-top 60px
    scroll(#aaa)
    .textbody
        background-color #E6E6E6
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
