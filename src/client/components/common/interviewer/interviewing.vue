<template>
    <div class="box">
        <div class="left">
            <div class="top">
                <h4>面试者资料</h4>
                <div>
                    <img src="http://111.230.128.231/head.jpg" alt="">
                    <span>{{params_data.u_name}}</span>
                </div>
            </div>
            <div class="center">
                <h4>基本信息</h4>
                <dl>
                    <dt>学号</dt>
                    <dd>{{params_data.u_number}}</dd>
                </dl>
                <dl>
                    <dt>专业</dt>
                    <dd>{{params_data.u_class}}</dd>
                </dl>
                <dl>
                    <dt>性别</dt>
                    <dd>{{params_data.u_sex}}</dd>
                </dl>
                <dl>
                    <dt>年级</dt>
                    <dd>{{params_data.u_term}}</dd>
                </dl>
                <dl>
                    <dt>联系方式</dt>
                    <dd>{{params_data.u_tel}}</dd>
                </dl>
            </div>
            <div class="bottom">
                <h4>个人描述</h4>
                <p style="text-indent:2em;margin-top:10px">{{params_data.u_info}}</p>
            </div>
        </div>
        <div class="right">
            <div v-if="result_count>=0">
                <dl>
                    <dt>第一次面试</dt>
                    <div style="padding:0" v-if="result_count==0">
                        <dd><span>基本打分：<input v-model='user_result.r_first_base' type="number"></span><span style="margin-left:12px">拓展打分：<input v-model='user_result.r_first_expent' type="number"></span></dd>
                        <dd style="display: flex;align-items:top;justify-content:center;margin-top:10px">面试官评价：<textarea v-model='user_result.r_first_info' cols="50" rows="5" style="font-size:14px"></textarea></dd>
                        <dd><input type="button" value="提交" @click="submit_result(1)" class="submit"></dd>
                    </div>
                    <dd v-if="result_count>0"><span>基本打分：{{user_result.r_first_base}}</span><span style="margin-left:12px">拓展打分：{{user_result.r_first_expent}}</span></dd>
                    <dd v-if="result_count>0">面试官评价：{{user_result.r_first_info}}</dd>
                </dl>
            </div>
            <div v-if="result_count>=1&&params_data.u_status<4">
                <dl>
                    <dt>第二次面试</dt>
                    <div style="padding:0" v-if="result_count==1">
                        <dd><span>基本打分：<input v-model='user_result.r_second_base' type="number"></span><span style="margin-left:12px">拓展打分：<input v-model='user_result.r_second_expent' type="number"></span></dd>
                        <dd style="display: flex;align-items:top;justify-content:center;margin-top:10px">面试官评价：<textarea v-model='user_result.r_second_info' cols="50" rows="5" style="font-size:14px"></textarea></dd>
                        <dd><input type="button" value="提交" @click="submit_result(2)" class="submit"></dd>
                    </div>
                    <dd v-if="result_count>1"><span>基本打分：{{user_result.r_second_base}}</span><span style="margin-left:12px">拓展打分：{{user_result.r_second_expent}}</span></dd>
                    <dd v-if="result_count>1">面试官评价：{{user_result.r_second_info}}</dd>
                </dl>
            </div>
            <div v-if="result_count>=2&&params_data.u_status<4">
                <dl>
                    <dt>第三次面试</dt>
                    <div style="padding:0" v-if="result_count==2">
                        <dd><span>基本打分：<input v-model='user_result.r_third_base' type="number"></span><span style="margin-left:12px">拓展打分：<input v-model='user_result.r_third_expent' type="number"></span></dd>
                        <dd style="display: flex;align-items:top;justify-content:center;margin-top:10px">面试官评价：<textarea v-model='user_result.r_third_info' cols="50" rows="5" style="font-size:14px"></textarea></dd>
                        <dd><input type="button" value="提交" @click="submit_result(3)" class="submit"></dd>
                    </div>
                    <dd v-if="result_count>2&&params_data.u_status<4"><span>基本打分：{{user_result.r_third_base}}</span><span style="margin-left:12px">拓展打分：{{user_result.r_third_expent}}</span></dd>
                    <dd v-if="result_count>2&&params_data.u_status<4">面试官评价：{{user_result.r_third_info}}</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            params_data:this.$route.params,
            user_result:{},
            flag:0,
            result_count:0,
            pather:'',
        }
    },
    created(){
        var that=this;
        this.$axios({
            url:'http://111.230.128.231/api/Inter/get_user_result',
            method:'get',
            params:{
                u_number:that.$route.params.u_number
            }
        }).then((res)=>{
            if(res.data.r_first_base&&res.data.r_second_base&&res.data.r_third_base){
                this.result_count=3
            }else if(res.data.r_first_base&&res.data.r_second_base){
                this.result_count=2
            }else if(res.data.r_first_base){
                this.result_count=1
            }else{
                this.result_count=0
            }
            that.user_result=res.data
            
        }).catch((res)=>{
            
        })
    },
    methods:{
        submit_result(val){
            var data=[]
            this.flag=1
            switch (val) {
                case 1:
                    data=['r_first_base',parseInt(this.user_result.r_first_base),'r_first_expent',parseInt(this.user_result.r_first_expent),'r_first_info',this.user_result.r_first_info]
                    break;
                case 2:
                    data=['r_second_base',parseInt(this.user_result.r_second_base),'r_second_expent',parseInt(this.user_result.r_second_expent),'r_second_info',this.user_result.r_second_info]
                    break;
                case 3:
                    data=['r_third_base',parseInt(this.user_result.r_third_base),'r_third_expent',parseInt(this.user_result.r_third_expent),'r_third_info',this.user_result.r_third_info]
                    break;
            }
            this.$axios({
                url:'http://111.230.128.231/api/Inter/update_user_result',
                method:'post',
                data:{
                    u_number:this.params_data.u_number,
                    val:data
                }
            }).then(res=>{
                if(res.data==1){
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.$router.push({path:'/inter/interview'})
                }
            }).catch(res=>{
                
            })
        }
    },
    beforeDestroy(){
        console.log(this.flag,'---',this.params_data.u_status)
        if(this.flag==0&&this.params_data.u_status<4){
            this.$axios({
                url:'http://111.230.128.231/api/Inter/goBack_user_status',
                method:'post',
                data:{u_number:this.params_data.u_number,u_status:2}
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.box
    margin -10px auto 
    overflow hidden
    .left
        float left
        min-width 550px
        width 46%
        padding 12px
        h4
            height 18px
            padding 10px 
            border-left 3px solid #409EFF
            font-weight 700
        div
            background-color white
            margin-top 2px
            padding 12px
            line-height 18px
        .top        
            img 
                border-radius 50%
                margin 0px 20px 0px 10px
                box-shadow 0px 2px 1px 2px #DCDCDC
                width 50px
            div
                display flex
                align-items center
    .center
        float none
        dl
            display inline-block
            width 19%
            text-align center
            padding 10px 0px
            margin 5px 0px
            dt
                line-height 20px
            dd 
                font-weight 600
                line-height 30px
    .right
        float left
        width 46%
        margin 14px
        div
            background-color white
            padding 12px
            line-height 30px
            margin-top 2px
        dl
            text-align center
        dd 
            input 
                height 30px
                width 140px
                border 1px solid #dcdfe6
                border-radius 4px
                color #606266
                margin 0 auto
                line-height 40px
                box-sizing border-box
        .submit
            margin 10px auto 
            cursor pointer
            color #fff
            background-color #409EFF
            border 1px solid #dcdfe6
            border-color #409EFF
            font-size 14px
            height 40px
            text-align center
            border-radius 4px
input[type=number] {  
    -moz-appearance:textfield;  
}  
input[type=number]::-webkit-inner-spin-button,  
input[type=number]::-webkit-outer-spin-button {  
    -webkit-appearance: none;  
    margin: 0;  
}  
</style>
