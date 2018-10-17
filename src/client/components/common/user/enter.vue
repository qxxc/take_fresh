<template>
    <div class="body">
        <div class="box first horizontal animated zoomIn yourElement" style="animation-delay:200ms;" @click="enter(2,'Java/php')">Java/php</div>
        <div class="box second vertical animated zoomIn yourElement" style="animation-delay:300ms;" @click="enter(4,'机器学习')">机器学习</div>
        <div class="box third vertical animated zoomIn yourElement" style="animation-delay:400ms;" @click="enter(1,'前端')">前端</span></div>
        <div class="fourth animated zoomIn yourElement" style="animation-delay:500ms;">
            <img style="height:100%;border-radius:10px;" src="http://localhost:3000/timg.jpg">
        </div>
        <div class="box fifth horizontal animated zoomIn yourElement" style="animation-delay:600ms;"  @click="enter(3,'C++/python')">C++/python</div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="90%" >
            <span>是否报名<span style="font-weight:bold">{{u_group}}</span>小组</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="user_enter(0)">取 消</el-button>
                <el-button type="primary" @click="user_enter(1)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialogVisible:false,
            u_group:'',
            value:0
        }
    },
    methods:{
        enter(value,u_group){
            this.u_group=u_group;
            this.value=value;
            this.dialogVisible=true;
        },
        user_enter(val){
            this.dialogVisible = false
            if(val){
                this.$axios({
                    url:'http://localhost:3000/api/user/user_enter',
                    method:'post',
                    data:{
                        u_group:this.value,
                        u_number:sessionStorage.getItem('u_number')
                    }
                }).then(res=>{
                    this.$message({
                        type:'success',
                        message:'报名成功'
                    })
                    this.$router.push({path:'/user/information'})
                })
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.yourElement 
  animation-duration 600ms
.body
    color white
    margin 40px auto 
    width 22em
    display grid
    grid-template-columns 7em 7em 7em
    grid-template-rows 7em 7em 7em
    grid-column-gap 0.333em
    grid-row-gap 0.333em
    grid-template-areas "first first second" "third fourth second" "third fifth fifth"
.box
    border 1px solid #5A8796
    border-radius 8px
.first
    grid-area first
    background-color rgba(255,0,0,0.5)
.second
    grid-area second
    background-color rgba(255,205,66,0.5)
.vertical
    font-size 2em 
    padding-left 1.125em
    text-align center
    writing-mode vertical-lr
.horizontal
    font-size 2em 
    text-align center
    line-height 3.5em
.third
    grid-area third
    background-color rgba(119,199,74,0.5)
.fourth
    grid-area fourth
    background-color pink
.fifth
    grid-area fifth
    background-color rgba(161,220,215,0.5)
</style>
