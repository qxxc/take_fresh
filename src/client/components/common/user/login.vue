<template>
    <div class="body" v-if="flag">
        <div class="back" style="background-image: url(http://111.230.128.231/26875.jpg);"></div>
        <h1 style="text-align:center;margin-top:1.2em;color:#5A8796" >计算机应用技术协会</h1>
        <div class="box">
            <p>你好{{form.u_name}},请完善信息</p>
            <p class="in">
                <i class="iconfont icon-banji" style="margin:0.4em;font-size:1.25em"></i>
                <span style="border:1px solid #5A8796;"></span>
                <input type="text" v-model="form.u_class" placeholder="班级">
            </p>
            <p class="in">
                <i class="iconfont icon-lianxifangshi" style="margin:0.4em;font-size:1.5em"></i>
                <span style="border:1px solid #5A8796;"></span>
                <input type="text" v-model="form.u_tel" placeholder="联系方式">
            </p>
            <p class="in">
                <textarea cols="24" rows="10" v-model="form.u_info" placeholder="个人简述，让我们更好的了解你"></textarea>
            </p>
            <p>
                <button class="submit" @click="user_resgiter">提交</button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            flag:false,
            form:{
                u_number:'',
                u_name:'',
                u_class:'',
                u_sex:'',
                u_term:2018,
                u_tel:'',
                u_info:'',
            }
        }
    },
    created(){
        var that=this;
        function callback(res){ 
            that.flag=true;
            that.form.u_number=res.data.username;
            that.form.u_name=res.data.name;
            if(res.data.sex==2){
                that.form.u_sex=0;
            }else{
                that.form.u_sex=1;
            }
        };
        if(!sessionStorage.getItem('_flag')){
            this.$axios({
                url:'http://111.230.128.231',
                method:'post'
            }).then(res=>{
                window.location.href = res.data;
                sessionStorage.setItem('_flag',1);
            })
        }    
        if(sessionStorage.getItem('_flag')){
            this.$axios({
                url:window.location.href,
                method:'post'
            }).then(res=>{
                sessionStorage.setItem('u_number',res.data.username);
                this.user_login(res.data.username,callback,res);
            })
        }
    },
    methods:{
        user_resgiter(){
        if(!this.form.u_class||this.form.u_class.search(/^[\u4e00-\u9fa5]{2,3}1(7|8)(0|1)([0-9])$/)==-1){
            this.$message.error('填写正确的班级');
        }
        else if (!this.form.u_tel||this.form.u_tel.search(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)==-1){
            this.$message.error('填写正确的联系方式');
        }
        else{this.$axios({
                url:'http://111.230.128.231/api/user/user_resgiter',
                method:'post',
                data:this.form
            }).then(res=>{
                this.$router.push({path:'/user/enter'})
            })}
        },
        user_login(val,callback,ress){
            var that=this;
            this.$axios({
                url:'http://111.230.128.231/api/User/user_login',
                method:'post',
                data:{
                    u_number:val
                }
            }).then(res=>{
                if(res.data.u_status=='0'){
                    this.$router.push({path:'/user/enter'})
                }else if(res.data.u_status=='1'){
                    this.$router.push({path:'/user/information'})
                }else{
                    callback(ress);
                }
            })
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
.back
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index -10
    zoom 1
    background-color #fff
    background-repeat no-repeat
    background-size cover
    -webkit-background-size cover
    -o-background-size cover
    background-position center 0      
</style>
