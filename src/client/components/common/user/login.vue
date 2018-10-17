<template>
    <div class="body" >
        <div class="box">
            <p>用户登陆</p>
            <p class="in">
                <i class="iconfont icon-icontouxiang" style="margin:0.4em;font-size:1.5em"></i>
                <span style="border:1px solid #5A8796;"></span>
                <input type="text" v-model="form.u_number" placeholder="学号">
            </p>
            <p class="in">
                <i class="iconfont icon-suo" style="margin:0.3em;font-size:1.72em"></i>
                <span style="border:1px solid #5A8796;"></span>
                <input type="password" v-model="form.u_password" placeholder="密码">
            </p>
            <p>
                <button class="submit" @click="resgiter">注册</button>
                <button class="submit" @click="login">登陆</button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                u_number:'',
                u_password:''
            }
        }
    },
    methods:{
        resgiter(){
            this.$router.push({path:"/user/resgiter"})
        },
        login(){
            if(this.form.u_number&&this.form.u_password){
                this.$axios({
                    url:'http://localhost:3000/api/user/user_login',
                    method:"post",
                    data:{
                        u_number:this.form.u_number,
                        u_password:this.$md5(this.form.u_password)
                    }
                }).then(res=>{
                    if(res.data.status=='1'){
                        if(res.data.u_status==0){
                            sessionStorage.setItem('u_number',this.form.u_number);
                            this.$router.push({path:'/user/enter'});
                        }else{
                            sessionStorage.setItem('u_number',this.form.u_number);
                            this.$router.push({path:'/user/information'});
                        }
                    }else if (res.data=='undefined'){
                        this.$message.error('用户不存在');
                    }else{
                        this.$message.error('密码错误');
                    }
                })
            }else{
                this.$message({message:'请输入账号和密码',type: 'warning'});
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
.submit
    margin 25px auto 
    color #fff
    background-color transparent
    width 49%
    border 1px solid #dcdfe6
    border-color #409EFF
    font-size 14px
    height 3.8em
    text-align center
    border-radius 4px        
</style>
