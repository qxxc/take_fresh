<template>
    <div>
        <div class="back" style="margin-top:20px;background-image: url(http://localhost:3000/inter.jpg);"></div>
        <div class="header">
            <el-menu style="min-width:1000px;padding-left:100px" router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" :route="{ path:'/inter' }">签到队列</el-menu-item>
                <el-menu-item index="2" :route="{ path:'/inter/interview' }">面试队列</el-menu-item>
                <el-menu-item index="3" :route="{ path:'/inter' }">面试结果</el-menu-item>
                <el-menu-item index="4" style="float:right" :route="{ path:'/' }">登陆</el-menu-item>
                <el-menu-item index="5" style="float:right" :route="{ path:'/' }">注册</el-menu-item>
            </el-menu>
        </div>
        <div class="body">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    created(){
        
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
</style>
