<template>
    <div>
        <div class="left">
            <img src="http://localhost:3000/home.png" class="home_img">
        </div>
        <div class="right form-insert">
            <p style="margin-top:35px">欢迎各位</p>
            <p style="margin:20px 0px"><input type="text" v-model="form.username" placeholder="请输入账号"></p>
            <p style="margin:20px 0px"><input type="password" v-model="form.password" placeholder="请输入密码"></p>
            <input type="button" class="submit" @click="submit" value="提交">
        </div>
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
    mounted(){
        
    },
    methods:{
        submit(){
            var data={
                    username:this.form.username,
                    password:this.form.password
                }
                console.log(data);
            this.$axios({
                method:'post',
                url:'http://localhost:3000/api/user/select_admin',
                data:data
            }).then((res)=>{
                console.log(res.data);
                if(res.data=='1'){
                    alert('success');
                }else{
                    alert('Error')
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
.left
    position absolute
    top 300px
    height 300px
    width 500px
    transform translateY(-(@height/2))
    left 180px
    z-index 1
.right
    position absolute
    background-color white
    right 280px
    top 120px
    width 240px
    height 300px
    z-index 1

.form-insert span
      color #5F6260
      margin 10px
      font-size 14px    
.form-insert input
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
.form-insert p
    margin 10px 20px
.form-insert input[class*='submit']
    margin 25px auto 
    color #fff
    background-color #409EFF
    border 1px solid #dcdfe6
    border-color #409EFF
    font-size 14px
    height 40px
    text-align center
    border-radius 4px
.form-insert input[class*='submit']:hover
    background-color #35B3FF
    cursor pointer
</style>
