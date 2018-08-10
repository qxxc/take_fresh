<template>
    <div>
        <div class="left">
            <img src="http://localhost:3000/home.png" class="home_img">
        </div>
        <div class="right"></div>
        <div class="right">
            <p style="margin-top:35px">欢迎各位</p>
            <p style="margin:20px 0px"><input @keyup.13="submit" type="text" v-model="form.username" placeholder="请输入账号"></p>
            <p style="margin:20px 0px"><input @keyup.13="submit" type="password" v-model="form.password" placeholder="请输入密码"></p>
            <input type="button" class="submit" @click="submit" value="提交">
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        submit(){
            var data={
                    username:this.form.username,
                    password:this.form.password
                }
            var go=this;
            this.$axios({
                method:'post',
                url:'http://localhost:3000/api/user/select_admin',
                data:data
            }).then((res)=>{
                if(res.data!='0'&&res.data!='-1'){
                    go.$router.push('/home');
                    sessionStorage.setItem("id",res.data);
                }else if(res.data=='0'){
                    this.$message.error('密码错误'); 
                }else if(res.data=='-1'){
                    this.$message.error('您已无权登陆');  
                }
            }).catch((res)=>{
                console.log(res);
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
div
    position fixed
    height 100%
    width 100%
    background-size cover
    background-color rgb(185,231,255)
    for n in 1 2 3 4
        .right:nth-of-type({n})
            position absolute
            background-color white
            right 280px
            top 120px
            width 300px
            height 300px
            z-index n%2
            border 1px solid #c4c6ca
            transform rotate(((n * 5)+345)deg)
            span
                color #5F6260
                margin 10px
                font-size 14px 
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
.left
    position absolute
    top 300px
    height 300px
    width 500px
    transform translateY(-(@height/2))
    left 180px
    z-index 1


</style>
